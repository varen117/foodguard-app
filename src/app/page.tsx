/**
 * FoodGuard 主页面
 */
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { FaShieldAlt, FaHome, FaPlus, FaEye, FaUsers, FaGavel, FaChartLine, FaVoteYea } from "react-icons/fa";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, CaseInfo, CaseStatus, RiskLevel } from "@/constants";

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [recentCases, setRecentCases] = useState<CaseInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;

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

  // 获取案件总数
  const { data: totalCases = 0n } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalCases',
    query: {
      enabled: !!contractAddress,
    },
  });

  // 获取最近的案件
  useEffect(() => {
    const fetchRecentCases = async () => {
      setLoading(true);
      
      // 这里使用模拟数据，实际应用中应该调用合约方法
      const mockCases: CaseInfo[] = [];
      for (let i = 1; i <= 6; i++) {
        mockCases.push({
          caseId: BigInt(i),
          complainant: `0x${'1'.repeat(40)}`,
          enterprise: `0x${'2'.repeat(40)}`,
          complaintTitle: `食品安全投诉案件 #${i}`,
          complaintDescription: `详细的投诉描述内容，涉及食品安全相关问题...`,
          location: "北京市朝阳区",
          incidentTime: BigInt(Date.now() - 86400000 * i), // i天前
          complaintTime: BigInt(Date.now() - 86400000 * i + 3600000), // i天前 + 1小时
          status: [CaseStatus.PENDING, CaseStatus.VOTING, CaseStatus.CHALLENGING, CaseStatus.COMPLETED][i % 4],
          riskLevel: [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH][i % 3],
          complaintUpheld: i % 2 === 0,
          complainantDeposit: BigInt("1000000000000000000"), // 1 ETH
          enterpriseDeposit: BigInt("2000000000000000000"), // 2 ETH
          isCompleted: i % 3 === 0,
          completionTime: i % 3 === 0 ? BigInt(Date.now()) : 0n,
        });
      }
      
      setRecentCases(mockCases);
      setLoading(false);
    };

    fetchRecentCases();
  }, []);

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

  return (
    <div className="main-container">
      {/* 英雄区域 */}
      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="icon-container">
                <FaShieldAlt className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              FoodGuard
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto font-medium">
              基于区块链的去中心化食品安全投诉与治理系统
            </p>
            <p className="text-lg mb-12 text-muted max-w-4xl mx-auto leading-relaxed">
              通过透明、公正的区块链技术，建立可信的食品安全监督体系，保护消费者权益，促进食品行业健康发展
            </p>
            
            {!isUserRegistered ? (
              <div className="space-y-6">
                <p className="text-white mb-8 text-lg font-medium">
                  您尚未注册，请选择注册类型：
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <Link href="/register?type=user" className="btn btn-primary">
                    <FaUsers className="w-4 h-4 mr-2" />
                    注册为用户
                  </Link>
                  <Link href="/register?type=dao" className="btn btn-secondary">
                    <FaVoteYea className="w-4 h-4 mr-2" />
                    DAO组织成员
                  </Link>
                  <Link href="/register?type=enterprise" className="btn btn-secondary">
                    <FaShieldAlt className="w-4 h-4 mr-2" />
                    注册为企业
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/complaint" className="btn btn-primary">
                  <FaPlus className="w-4 h-4 mr-2" />
                  创建投诉
                </Link>
                <Link href="/cases" className="btn btn-secondary">
                  <FaEye className="w-4 h-4 mr-2" />
                  查看案件
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="stat-card p-6 hover-lift">
            <div className="flex items-center">
              <div className="icon-container mr-4">
                <FaGavel className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted mb-1">
                  总案件数
                </p>
                <p className="text-3xl font-bold text-white">
                  {Number(totalCases)}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card p-6 hover-lift">
            <div className="flex items-center">
              <div className="icon-container mr-4">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted mb-1">
                  活跃用户
                </p>
                <p className="text-3xl font-bold text-white">
                  1,234
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card p-6 hover-lift">
            <div className="flex items-center">
              <div className="icon-container mr-4">
                <FaChartLine className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted mb-1">
                  解决率
                </p>
                <p className="text-3xl font-bold text-white">
                  95%
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card p-6 hover-lift">
            <div className="flex items-center">
              <div className="icon-container mr-4">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted mb-1">
                  信誉评分
                </p>
                <p className="text-3xl font-bold text-white">
                  98.5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 最近案件 */}
        {recentCases.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">最近案件</h2>
              <Link href="/cases" className="btn btn-secondary">
                查看全部
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentCases.slice(0, 4).map((caseInfo) => (
                <div key={Number(caseInfo.caseId)} className="card p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-card mb-2">
                      {caseInfo.complaintTitle}
                    </h3>
                    <span className={`status-badge ${caseInfo.status === CaseStatus.VOTING ? 'active' : 
                      caseInfo.status === CaseStatus.CHALLENGING ? 'pending' : 
                      caseInfo.status === CaseStatus.COMPLETED ? 'resolved' : 'pending'}`}>
                      {getStatusText(caseInfo.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {caseInfo.complaintDescription}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>案件 #{Number(caseInfo.caseId)}</span>
                    <span className={`font-medium ${
                      caseInfo.riskLevel === RiskLevel.HIGH ? 'text-red-500' :
                      caseInfo.riskLevel === RiskLevel.MEDIUM ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {getRiskLevelText(caseInfo.riskLevel)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 系统特性 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center hover-lift">
            <div className="icon-container mx-auto mb-6">
              <FaShieldAlt className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-card mb-4">透明可信</h3>
            <p className="text-gray-600 leading-relaxed">
              基于区块链技术，所有投诉和处理过程完全透明，不可篡改，确保公正性
            </p>
          </div>
          
          <div className="card p-8 text-center hover-lift">
            <div className="icon-container mx-auto mb-6">
              <FaUsers className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-card mb-4">去中心化治理</h3>
            <p className="text-gray-600 leading-relaxed">
              通过DAO投票机制，让社区参与决策，避免单一机构的权力集中
            </p>
          </div>
          
          <div className="card p-8 text-center hover-lift">
            <div className="icon-container mx-auto mb-6">
              <FaGavel className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-card mb-4">智能合约</h3>
            <p className="text-gray-600 leading-relaxed">
              自动化的奖惩机制，确保违规者受到应有的处罚，保护消费者权益
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}