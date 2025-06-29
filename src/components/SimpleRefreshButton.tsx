/**
 * 简化的刷新按钮组件
 */
"use client"

import { useState } from "react";
import { FaSync } from "react-icons/fa";

interface SimpleRefreshButtonProps {
  onRefresh: () => Promise<void> | void;
  buttonText?: string;
  className?: string;
}

export default function SimpleRefreshButton({ 
  onRefresh, 
  buttonText = "刷新数据",
  className = "btn btn-outline btn-sm" 
}: SimpleRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      await onRefresh();
    } catch (error) {
      console.error('刷新失败:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`${className} ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="手动刷新最新数据"
    >
      <FaSync className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? '刷新中...' : buttonText}
    </button>
  );
} 