"use client"

import { useState } from "react";
import { useAccount } from "wagmi";
import { 
  useDatabaseTest, 
  useUserStats, 
  useUserCases, 
  useAllCases 
} from '@/hooks/useDatabase';
import { 
  FaDatabase, 
  FaUser, 
  FaGavel, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaSpinner
} from "react-icons/fa";

export default function DatabaseTestPage() {
  const { address, isConnected } = useAccount();
  const [testAddress, setTestAddress] = useState("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

  // 数据库测试hooks
  const { data: dbTest, isLoading: isDbTestLoading, error: dbTestError } = useDatabaseTest();
  const { data: userStats, isLoading: isUserStatsLoading, error: userStatsError } = useUserStats(testAddress);
  const { data: userCases, isLoading: isUserCasesLoading, error: userCasesError } = useUserCases(testAddress);
  const { data: allCases, isLoading: isAllCasesLoading, error: allCasesError } = useAllCases(10, 0);

  const TestSection = ({ title, isLoading, error, data, icon }: any) => (
    <div className="card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-bold text-card">{title}</h2>
        {isLoading && <FaSpinner className="w-4 h-4 text-blue-500 animate-spin" />}
        {!isLoading && !error && data && <FaCheckCircle className="w-4 h-4 text-green-500" />}
        {error && <FaExclamationTriangle className="w-4 h-4 text-red-500" />}
      </div>
      
      {isLoading && (
        <div className="text-muted">加载中...</div>
      )}
      
      {error && (
        <div className="text-red-500">
          错误: {error.message}
        </div>
      )}
      
      {!isLoading && !error && data && (
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );

  return (
    <div className="main-container py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="icon-container">
              <FaDatabase className="w-8 h-8 text-white" />
            </div>
            <span className="gradient-text">数据库连接测试</span>
          </h1>
          <p className="text-muted">
            测试PostgreSQL数据库连接和查询功能
          </p>
        </div>

        {/* 测试地址输入 */}
        <div className="card p-6 mb-8">
          <h3 className="text-lg font-semibold text-card mb-4">测试配置</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                当前连接地址
              </label>
              <div className="text-card bg-gray-100 p-3 rounded-md">
                {isConnected ? address : "未连接钱包"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">
                测试用户地址
              </label>
              <input
                type="text"
                value={testAddress}
                onChange={(e) => setTestAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="输入要测试的用户地址"
              />
            </div>
          </div>
        </div>

        {/* 数据库连接测试 */}
        <TestSection
          title="数据库连接测试"
          isLoading={isDbTestLoading}
          error={dbTestError}
          data={dbTest}
          icon={<FaDatabase className="w-5 h-5 text-blue-600" />}
        />

        {/* 用户统计测试 */}
        <TestSection
          title="用户统计查询测试"
          isLoading={isUserStatsLoading}
          error={userStatsError}
          data={userStats}
          icon={<FaUser className="w-5 h-5 text-green-600" />}
        />

        {/* 用户案件测试 */}
        <TestSection
          title="用户案件查询测试"
          isLoading={isUserCasesLoading}
          error={userCasesError}
          data={userCases}
          icon={<FaGavel className="w-5 h-5 text-purple-600" />}
        />

        {/* 所有案件测试 */}
        <TestSection
          title="所有案件列表测试"
          isLoading={isAllCasesLoading}
          error={allCasesError}
          data={allCases}
          icon={<FaGavel className="w-5 h-5 text-orange-600" />}
        />

        {/* 总结信息 */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-card mb-4">连接状态总结</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                !isDbTestLoading && !dbTestError && dbTest ? 'bg-green-500' : 
                dbTestError ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <div className="text-sm text-muted">数据库连接</div>
            </div>
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                !isUserStatsLoading && !userStatsError && userStats ? 'bg-green-500' : 
                userStatsError ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <div className="text-sm text-muted">用户统计</div>
            </div>
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                !isUserCasesLoading && !userCasesError && userCases ? 'bg-green-500' : 
                userCasesError ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <div className="text-sm text-muted">用户案件</div>
            </div>
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                !isAllCasesLoading && !allCasesError && allCases ? 'bg-green-500' : 
                allCasesError ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <div className="text-sm text-muted">案件列表</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 