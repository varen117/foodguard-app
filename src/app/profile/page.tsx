/**
 * 个人中心页面
 */
"use client"

import { useState } from "react";
import { useAccount, useChainId, useReadContract, useDisconnect } from "wagmi";
import { 
  FaUser, 
  FaBuilding, 
  FaWallet, 
  FaShieldAlt, 
  FaGavel,
  FaChartLine,
  FaSignOutAlt,
  FaExchangeAlt
} from "react-icons/fa";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, fundManagerAbi } from "@/constants";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'activity'>('overview');

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;
  const fundManagerAddress = chainsToFoodGuard[chainId]?.fundManager;

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

  // 获取用户是否为企业
  const { data: isEnterprise = false } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'checkIsEnterprise',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contractAddress && !!address,
    },
  });

  // 获取可用保证金 (模拟数据)
  const mockAvailableDeposit = BigInt("2000000000000000000"); // 2 ETH

  // 模拟用户活动数据
  const mockUserStats = {
    casesCreated: 3,
    votesParticipated: 12,
    challengesSubmitted: 2,
    reputationScore: 85,
  };

  const mockRecentActivity = [
    {
      id: 1,
      type: "vote",
      description: "参与案件 #123 投票",
      timestamp: Date.now() - 86400000,
      status: "completed"
    },
    {
      id: 2,
      type: "complaint",
      description: "创建投诉案件 #124",
      timestamp: Date.now() - 172800000,
      status: "pending"
    },
    {
      id: 3,
      type: "challenge",
      description: "对案件 #122 提出质疑",
      timestamp: Date.now() - 259200000,
      status: "rejected"
    }
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vote':
        return <FaGavel className="w-4 h-4 text-blue-600" />;
      case 'complaint':
        return <FaShieldAlt className="w-4 h-4 text-red-600" />;
      case 'challenge':
        return <FaChartLine className="w-4 h-4 text-purple-600" />;
      default:
        return <FaUser className="w-4 h-4 text-gray-600" />;
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
            您需要连接钱包才能查看个人中心
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 用户信息头部 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isEnterprise ? 'bg-orange-500' : 'bg-blue-500'}`}>
                  {isEnterprise ? (
                    <FaBuilding className="w-8 h-8 text-white" />
                  ) : (
                    <FaUser className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {isEnterprise ? '企业账户' : '用户账户'}
                  </h1>
                  <p className="text-emerald-100 font-mono">
                    {formatAddress(address || '')}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isUserRegistered 
                        ? 'bg-green-500/20 text-green-100' 
                        : 'bg-red-500/20 text-red-100'
                    }`}>
                      {isUserRegistered ? '已注册' : '未注册'}
                    </span>
                    {isUserRegistered && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-100">
                        信誉分数: {mockUserStats.reputationScore}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => disconnect()}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt className="w-4 h-4" />
                断开连接
              </button>
            </div>
          </div>

          {/* 快速统计 */}
          {isUserRegistered && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {mockUserStats.casesCreated}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    创建案件
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockUserStats.votesParticipated}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    参与投票
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {mockUserStats.challengesSubmitted}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    提出质疑
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Number(mockAvailableDeposit) / 1e18}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    可用保证金 (ETH)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 选项卡导航 */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaUser className="inline w-4 h-4 mr-2" />
                概览
              </button>
              <button
                onClick={() => setActiveTab('deposit')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'deposit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaWallet className="inline w-4 h-4 mr-2" />
                保证金
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'activity'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaExchangeAlt className="inline w-4 h-4 mr-2" />
                活动记录
              </button>
            </nav>
          </div>

          {/* 选项卡内容 */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  账户概览
                </h3>
                
                {!isUserRegistered ? (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <div className="text-center">
                      <FaShieldAlt className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                        尚未注册
                      </h4>
                      <p className="text-yellow-800 dark:text-yellow-200 mb-4">
                        您还没有注册FoodGuard账户，请先注册以使用系统功能
                      </p>
                      <a
                        href="/register"
                        className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        立即注册
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                        账户信息
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">账户类型</span>
                          <span className="font-medium">
                            {isEnterprise ? '企业用户' : '普通用户'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">注册状态</span>
                          <span className="font-medium text-green-600">已注册</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">信誉分数</span>
                          <span className="font-medium">{mockUserStats.reputationScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                        参与统计
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">创建案件</span>
                          <span className="font-medium">{mockUserStats.casesCreated} 个</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">参与投票</span>
                          <span className="font-medium">{mockUserStats.votesParticipated} 次</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">提出质疑</span>
                          <span className="font-medium">{mockUserStats.challengesSubmitted} 次</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'deposit' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  保证金管理
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h4 className="text-md font-medium text-blue-900 dark:text-blue-100 mb-2">
                      总保证金
                    </h4>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                      {Number(mockAvailableDeposit) / 1e18} ETH
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                    <h4 className="text-md font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                      冻结金额
                    </h4>
                    <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                      0.5 ETH
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <h4 className="text-md font-medium text-green-900 dark:text-green-100 mb-2">
                      可用余额
                    </h4>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                      {(Number(mockAvailableDeposit) / 1e18) - 0.5} ETH
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    保证金操作
                  </h4>
                  <div className="flex gap-4">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      充值保证金
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      申请提取
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  最近活动
                </h3>
                
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {activity.status === 'completed' ? '已完成' :
                           activity.status === 'pending' ? '进行中' : '已拒绝'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 