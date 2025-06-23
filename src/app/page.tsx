/**
 * FoodGuard 主页
 */
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { FaShieldAlt, FaPlus, FaEye, FaUsers, FaGavel, FaChartLine } from "react-icons/fa";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, CaseInfo, CaseStatus, RiskLevel } from "@/constants";

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [recentCases, setRecentCases] = useState<CaseInfo[]>([]);

  // 获取合约地址
  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;

  // 获取案件总数
  const { data: totalCases = 0n } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalCases',
    query: {
      enabled: !!contractAddress,
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

  // 获取最近的案件
  useEffect(() => {
    if (totalCases > 0n && contractAddress) {
      const fetchRecentCases = async () => {
        const cases: CaseInfo[] = [];
        const start = Number(totalCases) > 5 ? Number(totalCases) - 4 : 1;
        
        for (let i = start; i <= Number(totalCases); i++) {
          try {
            // 这里需要实际调用合约获取案件信息
            // 由于演示目的，我们创建模拟数据
            const mockCase: CaseInfo = {
              caseId: BigInt(i),
              complainant: "0x1234...5678",
              enterprise: "0x8765...4321",
              complaintTitle: `案件 #${i} - 食品安全投诉`,
              complaintDescription: "相关食品安全问题的详细描述...",
              location: "北京市朝阳区",
              incidentTime: BigInt(Date.now() - 86400000),
              complaintTime: BigInt(Date.now() - 43200000),
              status: i % 3 === 0 ? CaseStatus.VOTING : i % 3 === 1 ? CaseStatus.CHALLENGING : CaseStatus.COMPLETED,
              riskLevel: i % 3 === 0 ? RiskLevel.HIGH : i % 3 === 1 ? RiskLevel.MEDIUM : RiskLevel.LOW,
              complaintUpheld: Math.random() > 0.5,
              complainantDeposit: BigInt("1000000000000000000"), // 1 ETH
              enterpriseDeposit: BigInt("2000000000000000000"), // 2 ETH
              isCompleted: i % 3 === 2,
              completionTime: i % 3 === 2 ? BigInt(Date.now()) : 0n,
            };
            cases.push(mockCase);
          } catch (error) {
            console.error(`Failed to fetch case ${i}:`, error);
          }
        }
        setRecentCases(cases.reverse());
      };

      fetchRecentCases();
    }
  }, [totalCases, contractAddress]);

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case CaseStatus.VOTING:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case CaseStatus.CHALLENGING:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case CaseStatus.COMPLETED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusText = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.PENDING: return "等待处理";
      case CaseStatus.DEPOSIT_LOCKED: return "保证金锁定";
      case CaseStatus.VOTING: return "投票中";
      case CaseStatus.CHALLENGING: return "质疑中";
      case CaseStatus.REWARD_PUNISHMENT: return "奖惩处理";
      case CaseStatus.COMPLETED: return "已完成";
      case CaseStatus.CANCELLED: return "已取消";
      default: return "未知状态";
    }
  };

  const getRiskLevelText = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW: return "低风险";
      case RiskLevel.MEDIUM: return "中风险";
      case RiskLevel.HIGH: return "高风险";
      default: return "未知";
    }
  };

  const getRiskLevelColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW: return "text-green-600 dark:text-green-400";
      case RiskLevel.MEDIUM: return "text-yellow-600 dark:text-yellow-400";
      case RiskLevel.HIGH: return "text-red-600 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 英雄区域 */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FaShieldAlt className="w-16 h-16 text-emerald-200" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              FoodGuard
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              基于区块链的去中心化食品安全投诉与治理系统
            </p>
            <p className="text-lg mb-12 text-emerald-200 max-w-4xl mx-auto">
              通过透明、公正的区块链技术，建立可信的食品安全监督体系，保护消费者权益，促进食品行业健康发展
            </p>
            
            {!isConnected ? (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto">
                <p className="text-emerald-100 mb-4">
                  请先连接钱包以使用系统功能
                </p>
              </div>
            ) : !isUserRegistered ? (
              <div className="space-y-4">
                <p className="text-emerald-100 mb-6">
                  您尚未注册，请选择注册类型：
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register?type=user" className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                    注册为用户
                  </Link>
                  <Link href="/register?type=enterprise" className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-400 transition-colors">
                    注册为企业
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/complaint" className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2">
                  <FaPlus className="w-4 h-4" />
                  创建投诉
                </Link>
                <Link href="/cases" className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-400 transition-colors inline-flex items-center gap-2">
                  <FaEye className="w-4 h-4" />
                  查看案件
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaGavel className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  总案件数
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {Number(totalCases)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUsers className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  活跃投票中
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {recentCases.filter(c => c.status === CaseStatus.VOTING).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaChartLine className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  质疑阶段
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {recentCases.filter(c => c.status === CaseStatus.CHALLENGING).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaShieldAlt className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  已完成
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {recentCases.filter(c => c.status === CaseStatus.COMPLETED).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 最新案件 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              最新案件
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentCases.length > 0 ? (
              recentCases.map((caseInfo) => (
                <div key={Number(caseInfo.caseId)} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {caseInfo.complaintTitle}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(caseInfo.status)}`}>
                          {getStatusText(caseInfo.status)}
                        </span>
                        <span className={`text-sm font-medium ${getRiskLevelColor(caseInfo.riskLevel)}`}>
                          {getRiskLevelText(caseInfo.riskLevel)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        地点: {caseInfo.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        案件ID: #{Number(caseInfo.caseId)} | 
                        投诉时间: {new Date(Number(caseInfo.complaintTime) * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/case/${Number(caseInfo.caseId)}`}
                      className="ml-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                    >
                      <FaEye className="w-4 h-4" />
                      查看详情
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                <FaGavel className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>暂无案件数据</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
