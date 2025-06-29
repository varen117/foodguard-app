/**
 * 案件列表页面
 */
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useChainId } from "wagmi";
import { FaSearch, FaFilter, FaEye, FaGavel, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { CaseStatus, RiskLevel, getStatusText, getRiskLevelText, getStatusColor, getRiskLevelColor } from "@/constants";
import { useActiveCases, useTotalCases } from "@/hooks/useContractInteraction";

// 删除接口定义，现在直接使用合约返回的数据

interface FilterOptions {
  status: string;
  riskLevel: string;
  dateRange: string;
  searchKeyword: string;
}

export default function CasesPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [filteredCases, setFilteredCases] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const casesPerPage = 10;

  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    riskLevel: 'all',
    dateRange: 'all',
    searchKeyword: ''
  });
  
  // TODO: 合约接口 - 获取活跃案件列表
  const { cases, isLoading: loading } = useActiveCases();

  // TODO: 合约接口 - 获取案件总数
  const totalCases = useTotalCases();

  // TODO: 数据库操作 - 记录用户访问案件列表页面的行为
  useEffect(() => {
    if (address) {
      // INSERT INTO user_activities (user_address, activity_type, page, timestamp) VALUES (?, 'view_cases_list', 'cases', ?)
      console.log('TODO: 记录用户访问案件列表页面:', { userAddress: address, timestamp: Date.now() });
    }
  }, [address]);

  // 应用筛选
  useEffect(() => {
    let filtered = [...cases];

    // 状态筛选
    if (filters.status !== 'all') {
      filtered = filtered.filter(c => {
        switch (filters.status) {
          case 'active':
            return [0, 2, 3].includes(c.status); // PENDING, VOTING, CHALLENGING
          case 'completed':
            return c.status === 5; // COMPLETED
          case 'voting':
            return c.status === 2; // VOTING
          case 'challenging':
            return c.status === 3; // CHALLENGING
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
        c.complainant.toLowerCase().includes(keyword) ||
        c.enterprise.toLowerCase().includes(keyword)
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

  // 删除自定义状态文本函数，使用 constants 中的函数

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
                <p className="text-2xl font-bold text-white">{totalCases}</p>
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
                  {cases.filter(c => [0, 2, 3].includes(c.status)).length}
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
                  {cases.filter(c => c.status === 5).length}
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
                  {cases.filter(c => c.riskLevel === 2).length}
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
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseInfo.status)}`}>
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
                          <span className="font-medium">投诉者:</span> {caseInfo.complainant.slice(0, 8)}...{caseInfo.complainant.slice(-6)}
                        </div>
                        <div>
                          <span className="font-medium">被投诉企业:</span> {caseInfo.enterprise.slice(0, 8)}...{caseInfo.enterprise.slice(-6)}
                        </div>
                        <div>
                          <span className="font-medium">事发地点:</span> {caseInfo.location}
                        </div>
                        <div>
                          <span className="font-medium">风险等级:</span> 
                          <span className={`ml-1 font-medium ${getRiskLevelColor(caseInfo.riskLevel)}`}>
                            {getRiskLevelText(caseInfo.riskLevel)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">保证金:</span> {Number(caseInfo.complainantDeposit) / 1e18} ETH
                        </div>
                        <div>
                          <span className="font-medium">状态:</span> {getStatusText(caseInfo.status)}
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