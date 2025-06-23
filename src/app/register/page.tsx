/**
 * 用户注册页面
 */
"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useChainId, useWriteContract, useReadContract } from "wagmi";
import { parseEther } from "viem";
import { FaUser, FaBuilding, FaShieldAlt, FaInfoCircle } from "react-icons/fa";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, fundManagerAbi } from "@/constants";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [userType, setUserType] = useState<'user' | 'enterprise'>('user');
  const [depositAmount, setDepositAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;
  const fundManagerAddress = chainsToFoodGuard[chainId]?.fundManager;

  const { writeContractAsync } = useWriteContract();

  // 获取系统配置
  const { data: systemConfig } = useReadContract({
    abi: fundManagerAbi,
    address: fundManagerAddress as `0x${string}`,
    functionName: 'getSystemConfig',
    query: {
      enabled: !!fundManagerAddress,
    },
  });

  // 获取用户注册状态
  const { data: isUserRegistered = false } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'isUserRegistered',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contractAddress && !!address,
    },
  });

  useEffect(() => {
    // 从URL参数获取注册类型
    const type = searchParams.get('type');
    if (type === 'enterprise' || type === 'user') {
      setUserType(type);
    }

    // 如果已经注册，重定向到主页
    if (isUserRegistered) {
      router.push('/');
    }
  }, [searchParams, isUserRegistered, router]);

  useEffect(() => {
    // 设置默认保证金金额
    if (systemConfig) {
      const minDeposit = userType === 'enterprise' 
        ? systemConfig.minEnterpriseDeposit 
        : systemConfig.minComplaintDeposit;
      setDepositAmount(parseEther(minDeposit.toString()).toString());
    }
  }, [systemConfig, userType]);

  const handleRegister = async () => {
    if (!isConnected || !contractAddress) {
      alert("请先连接钱包");
      return;
    }

    if (!depositAmount) {
      alert("请输入保证金金额");
      return;
    }

    try {
      setIsSubmitting(true);

      const functionName = userType === 'enterprise' ? 'registerEnterprise' : 'registerUser';
      
      await writeContractAsync({
        abi: foodSafetyGovernanceAbi,
        address: contractAddress as `0x${string}`,
        functionName,
        value: BigInt(depositAmount),
      });

      alert(`${userType === 'enterprise' ? '企业' : '用户'}注册成功！`);
      router.push('/');
    } catch (error) {
      console.error('注册失败:', error);
      alert('注册失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <FaShieldAlt className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            请连接钱包
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            您需要连接钱包才能注册使用FoodGuard系统
          </p>
        </div>
      </div>
    );
  }

  const minDeposit = systemConfig 
    ? (userType === 'enterprise' ? systemConfig.minEnterpriseDeposit : systemConfig.minComplaintDeposit)
    : 0n;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaShieldAlt className="w-8 h-8" />
              注册FoodGuard账户
            </h1>
            <p className="text-emerald-100 mt-2">
              选择您的账户类型并完成注册
            </p>
          </div>

          <div className="p-8">
            {/* 账户类型选择 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                选择账户类型
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType('user')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    userType === 'user'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300'
                  }`}
                >
                  <FaUser className={`w-8 h-8 mx-auto mb-3 ${
                    userType === 'user' ? 'text-emerald-600' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    普通用户
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    可以创建投诉、参与投票和质疑
                  </p>
                </button>

                <button
                  onClick={() => setUserType('enterprise')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    userType === 'enterprise'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300'
                  }`}
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
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      保证金说明
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {userType === 'enterprise' 
                        ? '企业保证金用于承担违规风险，最小金额较高以确保企业责任。'
                        : '用户保证金用于防止恶意投诉，金额相对较低。'
                      }
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                      最小保证金: {minDeposit ? Number(minDeposit) / 1e18 : 0} ETH
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  保证金金额 (Wei)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder={`最小金额: ${minDeposit ? minDeposit.toString() : '0'} Wei`}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  当前输入: {depositAmount ? Number(depositAmount) / 1e18 : 0} ETH
                </p>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleRegister}
              disabled={isSubmitting || !depositAmount}
              className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  注册中...
                </div>
              ) : (
                `注册为${userType === 'enterprise' ? '企业' : '用户'}`
              )}
            </button>

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
      </div>
    </div>
  );
} 