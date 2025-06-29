/**
 * 强制刷新数据按钮组件
 */
"use client"

import { useState } from "react";
import { FaSync } from "react-icons/fa";
import { useForceRefreshData } from "@/hooks/useContractInteraction";

interface ForceRefreshButtonProps {
  type: 'deposit' | 'withdraw' | 'register' | 'complaint' | 'vote' | 'challenge';
  description: string;
  className?: string;
}

export default function ForceRefreshButton({ 
  type, 
  description, 
  className = "btn btn-outline btn-sm" 
}: ForceRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { mutate: forceRefresh } = useForceRefreshData();

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    forceRefresh({
      type,
      description
    }, {
      onSuccess: () => {
        setIsRefreshing(false);
      },
      onError: () => {
        setIsRefreshing(false);
      }
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`${className} ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="手动刷新最新数据"
    >
      <FaSync className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? '刷新中...' : '刷新数据'}
    </button>
  );
} 