/**
 * 案件列表页面
 */
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { FaSearch, FaFilter, FaEye, FaGavel, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, CaseInfo, CaseStatus, RiskLevel } from "@/constants";

interface CaseWithDetails extends CaseInfo {
  // TODO: 从数据库获取的额外信息
  complainantName?: string;          // 投诉者姓名 - 从数据库获取
  enterpriseName?: string;           // 企业名称 - 从数据库获取
  evidenceCount?: number;            // 证据数量 - 从数据库获取
  viewCount?: number;                // 浏览次数 - 从数据库获取
  lastUpdateTime?: bigint;           // 最后更新时间 - 从数据库获取
  tags?: string[];                   // 标签 - 从数据库获取
}

interface FilterOptions {
  status: string;
  riskLevel: string;
  dateRange: string;
  searchKeyword: string;
}

export default function CasesPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [cases, setCases] = useState<CaseWithDetails[]>([]);
  const [filteredCases, setFilteredCases] = useState<CaseWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const casesPerPage = 10;

  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    riskLevel: 'all',
    dateRange: 'all',
    searchKeyword: ''
  });

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;

  // TODO: 合约接口 - 获取案件总数
  const { data: totalCases = 0n } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalCases',
    query: {
      enabled: !!contractAddress,
    },
  });

  // TODO: 合约接口 - 获取活跃案件列表
  const { data: activeCases = [] } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'getActiveCases',
    query: {
      enabled: !!contractAddress,
    },
  });

  useEffect(() => {
    loadCases();
  }, [totalCases, contractAddress]);

  const loadCases = async () => {
    if (!contractAddress || totalCases === 0n) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // TODO: 混合数据查询 - 需要合约数据 + 数据库数据
      // 1. 从合约获取案件基本信息
      // 2. 从数据库获取案件详细信息和用户信息
      
      const allCases: CaseWithDetails[] = [];
      const totalCaseCount = Number(totalCases);
      
      // 批量获取案件基本信息（从合约）
      // TODO: 合约接口调用 - getCaseInfo(caseId)
      for (let i = 1; i <= Math.min(totalCaseCount, 50); i++) {
        try {
          // 这里应该调用合约的 getCaseInfo 方法
          // TODO: 合约接口 - getCaseInfo(i) 获取第i个案件信息
          
          // 临时使用模拟数据，实际应该从合约获取
          const mockCaseInfo: CaseWithDetails = {
            caseId: BigInt(i),
            complainant: `0x${'1'.repeat(40)}`,
            enterprise: `0x${'2'.repeat(40)}`,
            complaintTitle: `食品安全投诉案件 #${i}`,
            complaintDescription: `详细的投诉描述内容，涉及食品安全相关问题... (案件 ${i})`,
            location: "北京市朝阳区",
            incidentTime: BigInt(Date.now() - 86400000 * i),
            complaintTime: BigInt(Date.now() - 86400000 * i + 3600000),
            status: [CaseStatus.PENDING, CaseStatus.VOTING, CaseStatus.CHALLENGING, CaseStatus.COMPLETED][i % 4],
            riskLevel: [RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH][i % 3],
            complaintUpheld: i % 2 === 0,
            complainantDeposit: BigInt("1000000000000000000"),
            enterpriseDeposit: BigInt("2000000000000000000"),
            isCompleted: i % 3 === 0,
            completionTime: i % 3 === 0 ? BigInt(Date.now()) : 0n,
            
            // TODO: 数据库查询 - 根据案件ID获取以下补充信息
            complainantName: `投诉者${i}`,      // SELECT complainant_name FROM users WHERE address = ?
            enterpriseName: `企业${i}`,         // SELECT enterprise_name FROM enterprises WHERE address = ?
            evidenceCount: Math.floor(Math.random() * 5) + 1,  // SELECT COUNT(*) FROM evidences WHERE case_id = ?
            viewCount: Math.floor(Math.random() * 100),         // SELECT view_count FROM case_stats WHERE case_id = ?
            lastUpdateTime: BigInt(Date.now() - Math.random() * 86400000), // SELECT last_update_time FROM case_updates WHERE case_id = ?
            tags: ['食品安全', '投诉处理'][Math.floor(Math.random() * 2)] ? ['食品安全'] : ['投诉处理'] // SELECT tags FROM case_tags WHERE case_id = ?
          };

          allCases.push(mockCaseInfo);
        } catch (error) {
          console.error(`获取案件 ${i} 信息失败:`, error);
        }
      }

      // TODO: 数据库操作 - 批量获取案件的补充信息
      // const caseIds = allCases.map(c => Number(c.caseId));
      // const caseDetails = await fetchCaseDetails(caseIds);
      // const userNames = await fetchUserNames(allCases.map(c => [c.complainant, c.enterprise]).flat());
      
      setCases(allCases);
      setFilteredCases(allCases);
      
      // TODO: 数据库操作 - 记录用户访问案件列表页面的行为
      // INSERT INTO user_activities (user_address, activity_type, page, timestamp) VALUES (?, 'view_cases_list', 'cases', ?)
      if (address) {
        console.log('TODO: 记录用户访问案件列表页面:', { userAddress: address, timestamp: Date.now() });
      }
      
    } catch (error) {
      console.error('加载案件列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 应用筛选
  useEffect(() => {
    let filtered = [...cases];

    // 状态筛选
    if (filters.status !== 'all') {
      filtered = filtered.filter(c => {
        switch (filters.status) {
          case 'active':
            return [CaseStatus.PENDING, CaseStatus.VOTING, CaseStatus.CHALLENGING].includes(c.status);
          case 'completed':
            return c.status === CaseStatus.COMPLETED;
          case 'voting':
            return c.status === CaseStatus.VOTING;
          case 'challenging':
            return c.status === CaseStatus.CHALLENGING;
          default:
            return true;
        }
      });
    }

    // 风险等级筛选
    if (filters.riskLevel !== 'all') {
      const riskLevelNum = parseInt(filters.riskLevel);
      filtered = filtered.filter(c => c.riskLevel === riskLevelNum);
    }

    // 日期范围筛选
    if (filters.dateRange !== 'all') {
      const now = Date.now();
      const ranges = {
        '1d': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
      };
      const range = ranges[filters.dateRange as keyof typeof ranges];
      if (range) {
        filtered = filtered.filter(c => 
          now - Number(c.complaintTime) * 1000 <= range
        );
      }
    }

    // 关键词搜索
    if (filters.searchKeyword.trim()) {
      const keyword = filters.searchKeyword.toLowerCase();
      filtered = filtered.filter(c => 
        c.complaintTitle.toLowerCase().includes(keyword) ||
        c.complaintDescription.toLowerCase().includes(keyword) ||
        c.location.toLowerCase().includes(keyword) ||
        c.complainantName?.toLowerCase().includes(keyword) ||
        c.enterpriseName?.toLowerCase().includes(keyword)
      );
    }

    setFilteredCases(filtered);
    setTotalPages(Math.ceil(filtered.length / casesPerPage));
    setCurrentPage(1);
  }, [cases, filters]);

  const getCurrentPageCases = () => {
    const startIndex = (currentPage - 1) * casesPerPage;
    const endIndex = startIndex + casesPerPage;
    return filteredCases.slice(startIndex, endIndex);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
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

  const getStatusIcon = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.VOTING:
        return <FaGavel className="w-4 h-4" />;
      case CaseStatus.CHALLENGING:
        return <FaExclamationTriangle className="w-4 h-4" />;
      case CaseStatus.COMPLETED:
        return <FaCheckCircle className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  if (!isConnected) {
    return (
      <div className="main-container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-8">
            <FaGavel className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-card mb-4">
              请连接钱包
            </h2>
            <p className="text-muted mb-6">
              您需要连接钱包才能查看案件信息
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="icon-container">
              <FaGavel className="w-8 h-8 text-white" />
            </div>
            <span className="gradient-text">案件列表</span>
          </h1>
          <p className="text-muted">
            查看所有食品安全投诉案件的处理情况
          </p>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">总案件数</p>
                <p className="text-2xl font-bold text-white">{Number(totalCases)}</p>
              </div>
              <div className="icon-container">
                <FaGavel className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">处理中</p>
                <p className="text-2xl font-bold text-white">
                  {cases.filter(c => [CaseStatus.PENDING, CaseStatus.VOTING, CaseStatus.CHALLENGING].includes(c.status)).length}
                </p>
              </div>
              <div className="icon-container">
                <FaClock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">已完成</p>
                <p className="text-2xl font-bold text-white">
                  {cases.filter(c => c.status === CaseStatus.COMPLETED).length}
                </p>
              </div>
              <div className="icon-container">
                <FaCheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">高风险案件</p>
                <p className="text-2xl font-bold text-white">
                  {cases.filter(c => c.riskLevel === RiskLevel.HIGH).length}
                </p>
              </div>
              <div className="icon-container">
                <FaExclamationTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 筛选和搜索 */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <FaFilter className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-card">筛选条件</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                案件状态
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">全部状态</option>
                <option value="active">处理中</option>
                <option value="voting">投票中</option>
                <option value="challenging">质疑中</option>
                <option value="completed">已完成</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                风险等级
              </label>
              <select
                value={filters.riskLevel}
                onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">全部等级</option>
                <option value="0">低风险</option>
                <option value="1">中风险</option>
                <option value="2">高风险</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                时间范围
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">全部时间</option>
                <option value="1d">最近1天</option>
                <option value="7d">最近7天</option>
                <option value="30d">最近30天</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                搜索关键词
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.searchKeyword}
                  onChange={(e) => handleFilterChange('searchKeyword', e.target.value)}
                  placeholder="搜索案件标题、描述..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 案件列表 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted mt-4">加载案件列表中...</p>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="card p-12 text-center">
            <FaGavel className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-600 mb-4">暂无案件</h3>
            <p className="text-muted mb-6">
              {filters.searchKeyword || filters.status !== 'all' || filters.riskLevel !== 'all' || filters.dateRange !== 'all'
                ? '没有找到符合筛选条件的案件'
                : '还没有案件被创建'}
            </p>
            {!filters.searchKeyword && filters.status === 'all' && filters.riskLevel === 'all' && filters.dateRange === 'all' && (
              <Link href="/complaint" className="btn btn-primary">
                创建第一个投诉
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {getCurrentPageCases().map((caseInfo) => (
                <div key={Number(caseInfo.caseId)} className="card p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-card">
                          {caseInfo.complaintTitle}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          caseInfo.status === CaseStatus.VOTING ? 'bg-blue-100 text-blue-800' :
                          caseInfo.status === CaseStatus.CHALLENGING ? 'bg-yellow-100 text-yellow-800' :
                          caseInfo.status === CaseStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatusIcon(caseInfo.status)}
                          {getStatusText(caseInfo.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {caseInfo.complaintDescription}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted">
                        <div>
                          <span className="font-medium">案件编号:</span> #{Number(caseInfo.caseId)}
                        </div>
                        <div>
                          <span className="font-medium">投诉者:</span> {caseInfo.complainantName || '匿名用户'}
                        </div>
                        <div>
                          <span className="font-medium">被投诉企业:</span> {caseInfo.enterpriseName || '未知企业'}
                        </div>
                        <div>
                          <span className="font-medium">事发地点:</span> {caseInfo.location}
                        </div>
                        <div>
                          <span className="font-medium">风险等级:</span> 
                          <span className={`ml-1 font-medium ${
                            caseInfo.riskLevel === RiskLevel.HIGH ? 'text-red-500' :
                            caseInfo.riskLevel === RiskLevel.MEDIUM ? 'text-yellow-500' :
                            'text-green-500'
                          }`}>
                            {getRiskLevelText(caseInfo.riskLevel)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">证据数量:</span> {caseInfo.evidenceCount || 0}
                        </div>
                        <div>
                          <span className="font-medium">浏览次数:</span> {caseInfo.viewCount || 0}
                        </div>
                        <div>
                          <span className="font-medium">创建时间:</span> {new Date(Number(caseInfo.complaintTime) * 1000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-6">
                      <Link
                        href={`/case/${Number(caseInfo.caseId)}`}
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          // TODO: 数据库操作 - 记录用户点击查看案件详情的行为
                          // INSERT INTO user_activities (user_address, activity_type, case_id, timestamp) VALUES (?, 'view_case_detail', ?, ?)
                          console.log('TODO: 记录用户查看案件详情:', {
                            userAddress: address,
                            caseId: Number(caseInfo.caseId),
                            timestamp: Date.now()
                          });
                        }}
                      >
                        <FaEye className="w-4 h-4 mr-1" />
                        查看详情
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-secondary btn-sm disabled:opacity-50"
                >
                  上一页
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary btn-sm disabled:opacity-50"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 