/**
 * FoodGuard 主页面
 */
"use client"

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAccount, useChainId } from "wagmi";
import { FaShieldAlt, FaHome, FaPlus, FaEye, FaUsers, FaGavel, FaChartLine, FaVoteYea, FaSync } from "react-icons/fa";
import { CaseStatus, RiskLevel, getStatusText, getRiskLevelText, getStatusColor, getRiskLevelColor } from "@/constants";
import { useUserRegistration, useActiveCases, useTotalCases } from "@/hooks/useContractInteraction";
import { Toaster, toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import SimpleRefreshButton from "@/components/SimpleRefreshButton";

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  
  // TODO: 合约接口 - 获取用户注册状态和信息
  const { isRegistered: isUserRegistered, userInfo } = useUserRegistration();
  
  // TODO: 合约接口 - 获取活跃案件列表
  const { cases: recentCases, isLoading: loading } = useActiveCases();
  
  // TODO: 合约接口 - 获取案件总数
  const totalCases = useTotalCases();

  // 强制刷新注册状态
  const handleRefreshRegistrationStatus = async () => {
    console.log('手动刷新注册状态...');
    toast.success("正在刷新注册状态...", { duration: 2000 });
    
    // 使用精确的查询键刷新用户注册相关数据
    await queryClient.invalidateQueries({ queryKey: ['userRegistration'] });
    await queryClient.invalidateQueries({ queryKey: ['userDeposit'] });
    await queryClient.invalidateQueries({ queryKey: ['activeCases'] });
    await queryClient.invalidateQueries({ queryKey: ['totalCases'] });
    
    // 等待数据刷新
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("注册状态已刷新！", { duration: 3000 });
  };



  // 使用 useMemo 优化统计数据计算
  const { activeCasesCount, completedCasesCount, highRiskCasesCount } = useMemo(() => {
    const active = recentCases.filter(c => 
      [CaseStatus.PENDING, CaseStatus.DEPOSIT_LOCKED, CaseStatus.VOTING, CaseStatus.CHALLENGING].includes(c.status)
    ).length;
    
    const completed = recentCases.filter(c => c.status === CaseStatus.COMPLETED).length;
    const highRisk = recentCases.filter(c => c.riskLevel === RiskLevel.HIGH).length;

    return {
      activeCasesCount: active,
      completedCasesCount: completed,
      highRiskCasesCount: highRisk
    };
  }, [recentCases]);

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
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-white mb-4 text-lg font-medium">
                    您尚未注册，请选择注册类型：
                  </p>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm text-white/80">
                      刚完成注册？
                    </p>
                    <button
                      onClick={handleRefreshRegistrationStatus}
                      className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white text-sm"
                    >
                      <FaSync className="w-3 h-3" />
                      <span>刷新状态</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <Link 
                    href="/register?type=user" 
                    className="btn btn-primary"
                  >
                    <FaUsers className="w-4 h-4 mr-2" />
                    注册为用户
                  </Link>
                  <Link 
                    href="/register?type=dao" 
                    className="btn btn-secondary"
                  >
                    <FaVoteYea className="w-4 h-4 mr-2" />
                    DAO组织成员
                  </Link>
                  <Link 
                    href="/register?type=enterprise" 
                    className="btn btn-secondary"
                  >
                    <FaShieldAlt className="w-4 h-4 mr-2" />
                    注册为企业
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/complaint" 
                    className="btn btn-primary"
                  >
                    <FaPlus className="w-4 h-4 mr-2" />
                    创建投诉
                  </Link>
                  <Link 
                    href="/cases" 
                    className="btn btn-secondary"
                  >
                    <FaEye className="w-4 h-4 mr-2" />
                    查看案件
                  </Link>
                </div>
                <div className="flex justify-center">
                  <SimpleRefreshButton 
                    onRefresh={handleRefreshRegistrationStatus}
                    buttonText="刷新数据"
                    className="btn btn-outline btn-sm"
                  />
                </div>
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
                  {totalCases}
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
                  处理中案件
                </p>
                <p className="text-3xl font-bold text-white">
                  {activeCasesCount}
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
                  已完成案件
                </p>
                <p className="text-3xl font-bold text-white">
                  {completedCasesCount}
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
                  高风险案件
                </p>
                <p className="text-3xl font-bold text-white">
                  {highRiskCasesCount}
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
              <Link 
                href="/cases" 
                className="btn btn-secondary"
              >
                查看全部
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card p-6 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentCases.slice(0, 4).map((caseInfo) => (
                  <Link 
                    key={Number(caseInfo.caseId)} 
                    href={`/case/${Number(caseInfo.caseId)}`}
                    className="card p-6 hover-lift cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-card mb-2">
                        {caseInfo.complaintTitle}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseInfo.status)}`}>
                        {getStatusText(caseInfo.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {caseInfo.complaintDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>案件 #{Number(caseInfo.caseId)}</span>
                      <span className={`font-medium ${getRiskLevelColor(caseInfo.riskLevel)}`}>
                        {getRiskLevelText(caseInfo.riskLevel)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>投诉者: {caseInfo.complainant.slice(0, 8)}...{caseInfo.complainant.slice(-6)}</span>
                      <span>企业: {caseInfo.enterprise.slice(0, 8)}...{caseInfo.enterprise.slice(-6)}</span>
                    </div>
                    <div className="mt-3 text-xs text-gray-400">
                      创建时间: {new Date(Number(caseInfo.complaintTime) * 1000).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
  );
}