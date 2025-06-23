/**
 * 案件列表页面
 */
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { 
  FaEye, 
  FaFilter, 
  FaSearch, 
  FaGavel, 
  FaUsers, 
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, CaseInfo, CaseStatus, RiskLevel } from "@/constants";

export default function CasesPage() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [cases, setCases] = useState<CaseInfo[]>([]);
  const [filteredCases, setFilteredCases] = useState<CaseInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');

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

  // 获取案件数据
  useEffect(() => {
    const fetchCases = async () => {
      if (Number(totalCases) === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const casesData: CaseInfo[] = [];

      // 这里应该调用实际的合约方法，为了演示使用模拟数据
      for (let i = 1; i <= Number(totalCases); i++) {
        try {
          // 实际应用中这里调用: await readContract(config, { ... getCaseInfo(i) })
          const mockCase: CaseInfo = {
            caseId: BigInt(i),
            complainant: `0x${'1'.repeat(40)}`,
            enterprise: `0x${'2'.repeat(40)}`,
            complaintTitle: `案件 #${i} - ${getRandomComplaintTitle()}`,
            complaintDescription: getRandomDescription(),
            location: getRandomLocation(),
            incidentTime: BigInt(Date.now() - Math.random() * 86400000 * 30), // 30天内随机
            complaintTime: BigInt(Date.now() - Math.random() * 86400000 * 15), // 15天内随机
            status: getRandomStatus(),
            riskLevel: getRandomRiskLevel(),
            complaintUpheld: Math.random() > 0.5,
            complainantDeposit: BigInt("1000000000000000000"), // 1 ETH
            enterpriseDeposit: BigInt("2000000000000000000"), // 2 ETH
            isCompleted: Math.random() > 0.7,
            completionTime: Math.random() > 0.5 ? BigInt(Date.now()) : 0n,
          };
          casesData.push(mockCase);
        } catch (error) {
          console.error(`Failed to fetch case ${i}:`, error);
        }
      }

      setCases(casesData.reverse()); // 最新的在前面
      setLoading(false);
    };

    fetchCases();
  }, [totalCases]);

  // 应用筛选和搜索
  useEffect(() => {
    let filtered = [...cases];

    // 搜索筛选
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.complaintTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseId.toString().includes(searchQuery)
      );
    }

    // 状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // 风险等级筛选
    if (riskFilter !== 'all') {
      filtered = filtered.filter(c => c.riskLevel === riskFilter);
    }

    setFilteredCases(filtered);
  }, [cases, searchQuery, statusFilter, riskFilter]);

  // 辅助函数
  const getRandomComplaintTitle = () => {
    const titles = [
      "食品变质投诉",
      "餐厅卫生问题",
      "食品添加剂超标",
      "外卖食品安全问题",
      "食品包装问题",
      "餐具不洁净",
      "食品保质期问题",
      "食品成分标注不实"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomDescription = () => {
    return "详细的投诉描述内容，包含了事件的具体情况和相关问题...";
  };

  const getRandomLocation = () => {
    const locations = [
      "北京市朝阳区",
      "上海市浦东新区", 
      "深圳市南山区",
      "广州市天河区",
      "杭州市西湖区",
      "成都市锦江区"
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getRandomStatus = (): CaseStatus => {
    const statuses = [
      CaseStatus.PENDING,
      CaseStatus.VOTING,
      CaseStatus.CHALLENGING,
      CaseStatus.COMPLETED
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomRiskLevel = (): RiskLevel => {
    const levels = [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH];
    return levels[Math.floor(Math.random() * levels.length)];
  };

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

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.VOTING:
        return <FaUsers className="w-4 h-4" />;
      case CaseStatus.CHALLENGING:
        return <FaChartLine className="w-4 h-4" />;
      case CaseStatus.COMPLETED:
        return <FaShieldAlt className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
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
            您需要连接钱包才能查看案件列表
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <FaGavel className="w-8 h-8 text-emerald-600" />
                  案件列表
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  查看所有食品安全投诉案件的处理状态
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-600">
                  {Number(totalCases)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  总案件数
                </p>
              </div>
            </div>

            {/* 搜索和筛选 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 搜索框 */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索案件..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* 状态筛选 */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as CaseStatus | 'all')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="all">所有状态</option>
                  <option value={CaseStatus.PENDING}>等待处理</option>
                  <option value={CaseStatus.VOTING}>投票中</option>
                  <option value={CaseStatus.CHALLENGING}>质疑中</option>
                  <option value={CaseStatus.COMPLETED}>已完成</option>
                </select>
              </div>

              {/* 风险等级筛选 */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value as RiskLevel | 'all')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="all">所有风险等级</option>
                  <option value={RiskLevel.LOW}>低风险</option>
                  <option value={RiskLevel.MEDIUM}>中风险</option>
                  <option value={RiskLevel.HIGH}>高风险</option>
                </select>
              </div>

              {/* 结果统计 */}
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {filteredCases.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  筛选结果
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 案件列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">加载案件数据中...</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <FaGavel className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无匹配的案件</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCases.map((caseInfo) => (
                <div key={Number(caseInfo.caseId)} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {caseInfo.complaintTitle}
                        </h3>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${getStatusColor(caseInfo.status)}`}>
                          {getStatusIcon(caseInfo.status)}
                          {getStatusText(caseInfo.status)}
                        </span>
                        <span className={`text-sm font-medium ${getRiskLevelColor(caseInfo.riskLevel)}`}>
                          {getRiskLevelText(caseInfo.riskLevel)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          <span className="text-sm">{caseInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FaClock className="w-4 h-4" />
                          <span className="text-sm">
                            投诉时间: {new Date(Number(caseInfo.complaintTime) * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          案件ID: #{Number(caseInfo.caseId)}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {caseInfo.complaintDescription}
                      </p>

                      {/* 保证金信息 */}
                      <div className="mt-3 flex items-center gap-6 text-sm">
                        <div className="text-gray-500 dark:text-gray-400">
                          投诉者保证金: {Number(caseInfo.complainantDeposit) / 1e18} ETH
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          企业保证金: {Number(caseInfo.enterpriseDeposit) / 1e18} ETH
                        </div>
                        {caseInfo.isCompleted && (
                          <div className="text-green-600 dark:text-green-400">
                            ✓ 已完成处理
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col gap-2">
                      <Link
                        href={`/case/${Number(caseInfo.caseId)}`}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 text-sm font-medium"
                      >
                        <FaEye className="w-4 h-4" />
                        查看详情
                      </Link>
                      
                      {(caseInfo.status === CaseStatus.VOTING || caseInfo.status === CaseStatus.CHALLENGING) && (
                        <Link
                          href={`/case/${Number(caseInfo.caseId)}?action=participate`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-sm font-medium"
                        >
                          <FaUsers className="w-4 h-4" />
                          参与{caseInfo.status === CaseStatus.VOTING ? '投票' : '质疑'}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 