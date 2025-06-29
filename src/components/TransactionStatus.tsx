/**
 * 交易状态显示组件
 */
"use client"

import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { FaExternalLinkAlt, FaCheckCircle, FaSpinner, FaExclamationCircle, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface TransactionStatusProps {
  txHash?: `0x${string}`;
  description: string;
  onSuccess?: (receipt: any) => void;
  onError?: (error: any) => void;
  chainId?: number;
}

export function TransactionStatus({ 
  txHash, 
  description, 
  onSuccess, 
  onError,
  chainId = 31337 // 默认本地链
}: TransactionStatusProps) {
  const [copied, setCopied] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  console.log('TransactionStatus 渲染:', { 
    txHash, 
    description, 
    chainId,
    hasOnSuccess: !!onSuccess,
    hasOnError: !!onError 
  });

  const { 
    data: receipt, 
    isLoading, 
    isSuccess, 
    isError, 
    error,
    status
  } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
      retry: 3,
      retryDelay: 1000,
      // 禁用自动代币检测以避免调用symbol()和decimals()
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // 禁用结构化共享，避免自动解析代币信息
      structuralSharing: false,
    }
  });

  useEffect(() => {
    console.log('交易状态更新:', {
      txHash,
      isLoading,
      isSuccess,
      isError,
      status,
      receipt: receipt ? 'received' : 'null',
      error: error?.message
    });
    
    setDebugInfo(`Status: ${status}, Loading: ${isLoading}, Success: ${isSuccess}, Error: ${isError}`);
  }, [txHash, isLoading, isSuccess, isError, status, receipt, error]);

  useEffect(() => {
    if (isSuccess && receipt && onSuccess) {
      console.log('交易成功，调用onSuccess:', receipt);
      onSuccess(receipt);
    }
  }, [isSuccess, receipt, onSuccess]);

  useEffect(() => {
    if (isError && error && onError) {
      console.log('交易失败，调用onError:', error);
      onError(error);
    }
  }, [isError, error, onError]);

  const getExplorerUrl = (hash: string, chainId: number) => {
    const explorers = {
      1: `https://etherscan.io/tx/${hash}`,
      11155111: `https://sepolia.etherscan.io/tx/${hash}`,
      31337: `http://localhost:8545`, // 本地链暂无浏览器
    };
    return explorers[chainId as keyof typeof explorers] || `https://etherscan.io/tx/${hash}`;
  };

  const copyToClipboard = async () => {
    if (txHash) {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      toast.success("交易哈希已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  if (!txHash) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">
          交易状态
        </h4>
        {isLoading && (
          <FaSpinner className="w-4 h-4 text-blue-500 animate-spin" />
        )}
        {isSuccess && (
          <FaCheckCircle className="w-4 h-4 text-green-500" />
        )}
        {isError && (
          <FaExclamationCircle className="w-4 h-4 text-red-500" />
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            操作描述
          </p>
          <p className="text-gray-900 dark:text-white">
            {description}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            交易哈希
          </p>
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded border">
            <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white">
              {formatHash(txHash)}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title="复制完整哈希"
            >
              <FaCopy className={`w-4 h-4 ${copied ? 'text-green-500' : ''}`} />
            </button>
            {chainId !== 31337 && (
              <a
                href={getExplorerUrl(txHash, chainId)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                title="在区块浏览器中查看"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* 调试信息 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-600 p-2 rounded">
            <strong>调试信息:</strong> {debugInfo}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          {isLoading && (
            <>
              <FaSpinner className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-blue-600 dark:text-blue-400">
                等待交易确认... (Status: {status})
              </span>
            </>
          )}
          {isSuccess && (
            <>
              <FaCheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-600 dark:text-green-400">
                交易已确认，{description}成功！
              </span>
            </>
          )}
          {isError && (
            <>
              <FaExclamationCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-600 dark:text-red-400">
                交易失败: {error?.message || "未知错误"}
              </span>
            </>
          )}
        </div>

        {isSuccess && receipt && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-green-700 dark:text-green-300">Gas Used:</span>
                <div className="font-mono">{receipt.gasUsed?.toString()}</div>
              </div>
              <div>
                <span className="text-green-700 dark:text-green-300">Block:</span>
                <div className="font-mono">{receipt.blockNumber?.toString()}</div>
              </div>
              <div>
                <span className="text-green-700 dark:text-green-300">Status:</span>
                <div className="font-mono">{receipt.status}</div>
              </div>
              <div>
                <span className="text-green-700 dark:text-green-300">Hash:</span>
                <div className="font-mono">{receipt.transactionHash?.slice(0, 10)}...</div>
              </div>
            </div>
          </div>
        )}

        {/* 手动测试按钮 - 仅在开发环境显示 */}
        {process.env.NODE_ENV === 'development' && txHash && (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <p className="text-xs text-yellow-800 dark:text-yellow-200 mb-2">
              开发工具 - 手动测试按钮:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onSuccess && onSuccess({ 
                  transactionHash: txHash, 
                  blockNumber: 1004n, 
                  gasUsed: 40514n,
                  status: 'success'
                })}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200"
              >
                模拟成功
              </button>
              <button
                onClick={() => onError && onError(new Error('手动测试错误'))}
                className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded hover:bg-red-200"
              >
                模拟失败
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionStatus; 