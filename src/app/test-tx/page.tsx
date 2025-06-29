/**
 * 交易状态测试页面
 */
"use client"

import { useState } from "react";
import { useChainId } from "wagmi";
import TransactionStatus from "@/components/TransactionStatus";

export default function TestTransactionPage() {
  const chainId = useChainId();
  // 使用Anvil日志中的实际交易hash
  const [testHash] = useState<`0x${string}`>("0x1c1e4515ffe8bd5bc79821429f5607271b36c44e900f4ab9113cda5f15fc907d");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            交易状态测试页面
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            测试TransactionStatus组件是否能正确监听和显示交易状态
          </p>
          
          <div className="space-y-4">
            <div>
              <strong>当前链ID:</strong> {chainId}
            </div>
            <div>
              <strong>测试交易Hash:</strong> 
              <code className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                {testHash}
              </code>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TransactionStatus
            txHash={testHash}
            description="测试保证金存入"
            chainId={chainId}
            onSuccess={(receipt) => {
              console.log('测试成功回调:', receipt);
              alert(`交易确认成功！区块号: ${receipt.blockNumber}`);
            }}
            onError={(error) => {
              console.log('测试错误回调:', error);
              alert(`交易确认失败: ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
} 