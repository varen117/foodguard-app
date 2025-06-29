/**
 * 用户注册页面
 */
"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { formatEther } from "viem";
import { FaUser, FaBuilding, FaShieldAlt, FaInfoCircle, FaUsers, FaRocket, FaWallet, FaVoteYea, FaLock } from "react-icons/fa";
import { useUserRegistration, useUserRegister, useSystemConfig } from "@/hooks/useContractInteraction";
import { Toaster, toast } from "react-hot-toast";
import TransactionStatus from "@/components/TransactionStatus";
import { useQueryClient } from "@tanstack/react-query";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const [userType, setUserType] = useState<'complainant' | 'dao' | 'enterprise'>('complainant');
  const [depositAmount, setDepositAmount] = useState("");
  const [registrationStep, setRegistrationStep] = useState<'form' | 'submitting' | 'waiting' | 'success'>('form');
  const [transactionHashes, setTransactionHashes] = useState<{
    registerHash?: `0x${string}`;
    depositHash?: `0x${string}`;
  }>({});

  // 合约接口 - 获取用户注册状态和信息
  const { isRegistered: isUserRegistered, userInfo } = useUserRegistration();
  
  // 合约接口 - 获取系统配置信息
  const systemConfig = useSystemConfig();
  
  // 合约接口 - 用户注册功能
  const { mutate: registerUser, isPending: isSubmitting } = useUserRegister();

  // 等待注册交易确认
  const { data: registerReceipt, isSuccess: isRegisterSuccess, isError: isRegisterError } = useWaitForTransactionReceipt({
    hash: transactionHashes.registerHash,
    query: {
      enabled: !!transactionHashes.registerHash,
      // 禁用自动代币检测以避免调用symbol()和decimals()
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      structuralSharing: false,
    }
  });

  // 等待保证金交易确认
  const { data: depositReceipt, isSuccess: isDepositSuccess, isError: isDepositError } = useWaitForTransactionReceipt({
    hash: transactionHashes.depositHash,
    query: {
      enabled: !!transactionHashes.depositHash,
      // 禁用自动代币检测以避免调用symbol()和decimals()
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      structuralSharing: false,
    }
  });

  useEffect(() => {
    // 从URL参数获取注册类型
    const type = searchParams.get('type');
    if (type === 'enterprise' || type === 'user' || type === 'dao') {
      setUserType(type === 'user' ? 'complainant' : type as 'enterprise' | 'dao');
    }
  }, [searchParams]);

  useEffect(() => {
    // 如果用户已注册，跳转到主页
    // 但是如果正在进行注册过程，不要跳转，等待注册完成
    if (isConnected && isUserRegistered && registrationStep === 'form') {
      console.log('用户已注册，跳转到主页');
      router.push('/');
    }
  }, [isConnected, isUserRegistered, registrationStep, router]);

  useEffect(() => {
    // 设置默认保证金金额
    if (systemConfig) {
      let minDeposit: string;
      
      if (userType === 'enterprise') {
        minDeposit = systemConfig.minEnterpriseDeposit;
      } else if (userType === 'dao') {
        minDeposit = systemConfig.minDaoDeposit;
      } else {
        // 普通用户
        minDeposit = systemConfig.minComplaintDeposit;
      }
      
      setDepositAmount(minDeposit);
      console.log('设置默认保证金:', { userType, minDeposit });
    }
  }, [systemConfig, userType]);

  // 处理交易确认结果 - 只有在两个交易都完全确认且有有效的receipt时才跳转
  useEffect(() => {
    // 严格检查条件：
    // 1. 两个交易都成功
    // 2. 两个receipt都存在且有效
    // 3. 当前状态为等待中
    // 4. 两个receipt都有区块号（确认已上链）
    if (isRegisterSuccess && 
        isDepositSuccess && 
        registrationStep === 'waiting' &&
        registerReceipt && 
        depositReceipt &&
        registerReceipt.blockNumber &&
        depositReceipt.blockNumber) {
      
      console.log('所有交易都已确认，准备完成注册流程...');
      console.log('注册交易receipt:', registerReceipt);
      console.log('保证金交易receipt:', depositReceipt);
      
      setRegistrationStep('success');
      toast.success("🎉 注册成功！欢迎加入FoodGuard社区！", {
        duration: 5000,
      });
      
      // 强制刷新用户注册状态数据
      const refreshData = async () => {
        console.log('开始强制刷新注册状态数据...');
        
        // 使用精确的查询键刷新用户注册相关数据
        await queryClient.invalidateQueries({ queryKey: ['userRegistration'] });
        await queryClient.invalidateQueries({ queryKey: ['userDeposit'] });
        
        // 等待数据刷新
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('注册状态数据刷新完成，准备跳转到首页...');
        toast.success("🏠 注册完成！正在跳转到首页...", {
          duration: 2000,
        });
        
        // 跳转到首页
        setTimeout(() => {
          router.push('/');
        }, 1000);
      };
      
      refreshData();
    }
  }, [isRegisterSuccess, isDepositSuccess, registerReceipt, depositReceipt, registrationStep, queryClient, router]);

  // 处理交易失败
  useEffect(() => {
    if ((isRegisterError || isDepositError) && registrationStep === 'waiting') {
      setRegistrationStep('form');
      toast.error("交易确认失败，请重试");
      setTransactionHashes({});
    }
  }, [isRegisterError, isDepositError, registrationStep]);

  // 防止用户在注册过程中离开页面
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (registrationStep === 'submitting' || registrationStep === 'waiting') {
        e.preventDefault();
        e.returnValue = '注册正在进行中，离开可能导致注册失败。确定要离开吗？';
        return '注册正在进行中，离开可能导致注册失败。确定要离开吗？';
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (registrationStep === 'submitting' || registrationStep === 'waiting') {
        e.preventDefault();
        const confirmLeave = window.confirm('注册正在进行中，返回可能导致注册失败。确定要返回吗？');
        if (!confirmLeave) {
          // 推回当前页面到历史记录
          window.history.pushState(null, '', window.location.href);
        }
      }
    };

    if (registrationStep === 'submitting' || registrationStep === 'waiting') {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      
      // 推入一个状态以防止后退
      window.history.pushState(null, '', window.location.href);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [registrationStep]);

  const handleRegister = async () => {
    if (!isConnected) {
      toast.error("请先连接钱包");
      return;
    }

    if (!depositAmount) {
      toast.error("请输入保证金金额");
      return;
    }

    setRegistrationStep('submitting');

    // 提交注册交易
    registerUser({ userType, depositAmount }, {
      onSuccess: ({ registerHash, depositHash }) => {
        console.log('注册交易已提交:', { registerHash, depositHash });
        
        setTransactionHashes({ registerHash, depositHash });
        setRegistrationStep('waiting');
        
        toast.success("🎉 所有交易已提交！正在等待区块链确认...", {
          duration: 5000,
        });
      },
      onError: (error) => {
        console.error('注册交易提交失败:', error);
        setRegistrationStep('form');
        
        // 显示具体错误信息
        if (error.message.includes('取消了交易')) {
          toast.error("⚠️ 交易被取消，请重新尝试注册");
        } else if (error.message.includes('余额不足')) {
          toast.error("💰 余额不足，请确保账户有足够的ETH");
        } else if (error.message.includes('已经注册')) {
          toast.error("ℹ️ 您已经注册过了，请刷新页面");
        } else if (error.message.includes('保证金存入失败')) {
          toast.error("🔄 保证金存入失败，建议: 1) 检查ETH余额 2) 等待几秒后重试 3) 或先完成用户注册，稍后在个人资料页面存入保证金", { duration: 8000 });
        } else if (error.message.includes('区块链网络错误')) {
          toast.error("🌐 网络错误，请稍后重试", { duration: 5000 });
        } else {
          toast.error(`❌ 注册失败: ${error.message}`);
        }
      }
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* 左侧：品牌介绍 */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="icon-container mr-4">
                  <FaShieldAlt className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold gradient-text">
                    FoodGuard
                  </h1>
                  <p className="text-emerald-400 text-lg font-medium">
                    Food Safety Governance
                  </p>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                基于区块链技术的去中心化食品安全投诉与治理系统，
                构建透明、可信、高效的食品安全监管新生态
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="icon-container flex-shrink-0 w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <FaShieldAlt className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">区块链透明可信</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">所有投诉和处理过程上链存储，确保数据不可篡改</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="icon-container flex-shrink-0 w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <FaUsers className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">去中心化治理</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">社区驱动的治理机制，让每个参与者都有发言权</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="icon-container flex-shrink-0 w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <FaRocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">智能合约执行</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">自动化执行治理规则，提高处理效率和公正性</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧：连接钱包 */}
            <div className="flex justify-center lg:justify-end animate-fade-in-up-delay">
              <div className="card max-w-md w-full">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
                      <FaWallet className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      开始您的安全之旅
                    </h2>
                    <p className="text-gray-700">
                      连接钱包，注册成为FoodGuard社区的一员
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="glass-card p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        钱包连接
                      </h3>
                      <div className="mb-6">
                        <div className="wallet-connect-animation">
                          <div className="wallet-icon-container">
                            <FaWallet className="wallet-icon" />
                          </div>
                          <div className="connection-dots">
                            <span className="dot dot-1"></span>
                            <span className="dot dot-2"></span>
                            <span className="dot dot-3"></span>
                          </div>
                          <div className="shield-icon-container">
                            <FaShieldAlt className="shield-icon" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                          正在等待连接...
                        </p>
                      </div>
                      <div className="connect-wallet-container">
                        {/* ConnectButton 会自动显示在这里 */}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-4">
                        支持的钱包类型
                      </p>
                      <div className="flex justify-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-105">
                          <span className="text-orange-500 font-bold text-sm">MM</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                          <span className="text-blue-500 font-bold text-sm">WC</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:scale-105">
                          <span className="text-indigo-500 font-bold text-sm">CB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const minDeposit = systemConfig 
    ? (userType === 'enterprise' 
        ? systemConfig.minEnterpriseDeposit
        : userType === 'dao' 
          ? systemConfig.minDaoDeposit
          : systemConfig.minComplaintDeposit)
    : "0";

  return (
    <div className="main-container py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          {/* 头部 */}
          <div className="hero-section px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="icon-container">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <span className="gradient-text">注册FoodGuard账户</span>
            </h1>
            <p className="text-muted mt-2">
              选择您的账户类型并完成注册
            </p>
          </div>

          <div className="p-8">
            {/* 注册步骤指示器 */}
            {registrationStep !== 'form' && (
              <div className="mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    注册进度
                  </h3>
                  <div className="flex items-center space-x-4">
                    {/* 步骤1: 提交交易 */}
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        registrationStep === 'submitting' 
                          ? 'bg-blue-500 text-white animate-pulse' 
                          : registrationStep === 'waiting' || registrationStep === 'success'
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                      }`}>
                        {registrationStep === 'submitting' ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (registrationStep === 'waiting' || registrationStep === 'success') ? (
                          '✓'
                        ) : (
                          '1'
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        提交交易
                      </span>
                    </div>

                    {/* 连接线 */}
                    <div className={`flex-1 h-0.5 ${
                      registrationStep === 'waiting' || registrationStep === 'success'
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                    }`}></div>

                    {/* 步骤2: 等待确认 */}
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        registrationStep === 'waiting' 
                          ? 'bg-blue-500 text-white animate-pulse' 
                          : registrationStep === 'success'
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                      }`}>
                        {registrationStep === 'waiting' ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : registrationStep === 'success' ? (
                          '✓'
                        ) : (
                          '2'
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        等待确认
                      </span>
                    </div>

                    {/* 连接线 */}
                    <div className={`flex-1 h-0.5 ${
                      registrationStep === 'success'
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                    }`}></div>

                    {/* 步骤3: 完成 */}
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        registrationStep === 'success'
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {registrationStep === 'success' ? '✓' : '3'}
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        完成注册
                      </span>
                    </div>
                  </div>

                  {/* 当前步骤说明 */}
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaLock className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        注册进行中 - 请勿离开此页面
                      </p>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {registrationStep === 'submitting' && '请在钱包中批准注册交易和保证金存入交易...'}
                      {registrationStep === 'waiting' && (
                        <>
                          正在等待交易确认中...
                          <br />
                          <span className="text-xs">
                            • 注册交易: {isRegisterSuccess ? '✅ 已确认' : '⏳ 等待确认...'}
                            <br />
                            • 保证金交易: {isDepositSuccess ? '✅ 已确认' : '⏳ 等待确认...'}
                          </span>
                        </>
                      )}
                      {registrationStep === 'success' && '✅ 所有交易都已确认！正在为您跳转到主页...'}
                    </p>
                  </div>
                </div>

                {/* 交易状态显示 */}
                {registrationStep === 'waiting' && (
                  <div className="space-y-4">
                    {transactionHashes.registerHash && (
                      <TransactionStatus
                        txHash={transactionHashes.registerHash}
                        description="用户注册"
                        chainId={chainId}
                        onSuccess={(receipt) => {
                          console.log('注册交易确认成功:', receipt);
                        }}
                        onError={(error) => {
                          console.error('注册交易确认失败:', error);
                        }}
                      />
                    )}
                    {transactionHashes.depositHash && (
                      <TransactionStatus
                        txHash={transactionHashes.depositHash}
                        description="保证金存入"
                        chainId={chainId}
                        onSuccess={(receipt) => {
                          console.log('保证金交易确认成功:', receipt);
                        }}
                        onError={(error) => {
                          console.error('保证金交易确认失败:', error);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 账户类型选择 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                选择账户类型
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setUserType('complainant')}
                  disabled={registrationStep !== 'form'}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    userType === 'complainant'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300'
                  } ${registrationStep !== 'form' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaUser className={`w-8 h-8 mx-auto mb-3 ${
                    userType === 'complainant' ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    投诉者
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    可以创建投诉、参与治理
                  </p>
                </button>

                <button
                  onClick={() => setUserType('dao')}
                  disabled={registrationStep !== 'form'}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    userType === 'dao'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  } ${registrationStep !== 'form' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaVoteYea className={`w-8 h-8 mx-auto mb-3 ${
                    userType === 'dao' ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    DAO组织成员
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    参与治理决策、高级投票权限
                  </p>
                </button>

                <button
                  onClick={() => setUserType('enterprise')}
                  disabled={registrationStep !== 'form'}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    userType === 'enterprise'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300'
                  } ${registrationStep !== 'form' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaBuilding className={`w-8 h-8 mx-auto mb-3 ${
                    userType === 'enterprise' ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    企业用户
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    接受监督，可以回应投诉
                  </p>
                </button>
              </div>
            </div>

            {/* 保证金设置 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                设置保证金
              </h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  保证金金额 (ETH)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder={`最小金额: ${minDeposit ? minDeposit : '0'} ETH`}
                  disabled={registrationStep !== 'form'}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                    registrationStep !== 'form' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  当前输入: {depositAmount ? parseFloat(depositAmount) : 0} ETH
                </p>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleRegister}
              disabled={registrationStep !== 'form' || !depositAmount || isSubmitting}
              className={`btn w-full py-4 ${
                registrationStep !== 'form' || !depositAmount || isSubmitting
                  ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                  : 'btn-primary'
              }`}
            >
              {registrationStep === 'submitting' ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  正在提交交易...
                </div>
              ) : registrationStep === 'waiting' ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  等待交易确认中...
                </div>
              ) : registrationStep === 'success' ? (
                <div className="flex items-center justify-center gap-2">
                  <FaShieldAlt className="w-5 h-5" />
                  注册成功！正在跳转...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaShieldAlt className="w-5 h-5" />
                  {`注册为${userType === 'enterprise' ? '企业' : userType === 'dao' ? 'DAO组织成员' : '投诉者'}`}
                </div>
              )}
            </button>

                         {/* 注册进行中的警告 */}
             {(registrationStep === 'submitting' || registrationStep === 'waiting') && (
               <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                 <div className="flex items-center gap-3">
                   <FaLock className="w-5 h-5 text-yellow-600" />
                   <div>
                     <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                       重要提醒
                     </h4>
                     <p className="text-sm text-yellow-800 dark:text-yellow-200">
                       注册过程正在进行中，请不要关闭浏览器或离开此页面。
                       所有交易完成后将自动跳转到首页。
                     </p>
                   </div>
                 </div>
               </div>
             )}

            {/* 保证金说明 */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    保证金说明
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {userType === 'enterprise' 
                      ? '企业保证金用于承担违规风险，最小金额较高以确保企业责任。'
                      : userType === 'dao' 
                        ? 'DAO组织成员保证金用于防止恶意投诉，金额相对较高。'
                        : '用户保证金用于防止恶意投诉，金额相对较低。'
                    }
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    最小保证金: {minDeposit ? parseFloat(minDeposit) : 0} ETH
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-2 font-medium">
                    💡 提示：请确保账户有足够余额支付保证金和gas费用（建议额外准备0.01 ETH作为gas费）
                  </p>
                </div>
              </div>
            </div>

            {/* 注意事项 */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                注册须知
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 注册需要支付保证金，用于维护系统公平性</li>
                <li>• 保证金在正常使用期间不会被扣除</li>
                <li>• 恶意行为可能导致保证金被惩罚性扣除</li>
                <li>• 企业用户需要承担更高的保证金责任</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Toast 通知组件 */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </div>
  );
} 