import { useQuery } from '@tanstack/react-query';

// 测试数据库连接
export function useDatabaseTest() {
  return useQuery({
    queryKey: ['database', 'test'],
    queryFn: async () => {
      const response = await fetch('/api/database/test');
      if (!response.ok) {
        throw new Error('数据库连接测试失败');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5分钟
    retry: 2,
  });
}

// 获取用户统计信息
export function useUserStats(address?: string) {
  return useQuery({
    queryKey: ['user', 'stats', address],
    queryFn: async () => {
      if (!address) throw new Error('用户地址不能为空');
      
      const response = await fetch(`/api/user/stats?address=${encodeURIComponent(address)}`);
      if (!response.ok) {
        throw new Error('获取用户统计信息失败');
      }
      return response.json();
    },
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2分钟
    retry: 2,
  });
}

// 获取用户参与的案件
export function useUserCases(address?: string) {
  return useQuery({
    queryKey: ['user', 'cases', address],
    queryFn: async () => {
      if (!address) throw new Error('用户地址不能为空');
      
      const response = await fetch(`/api/user/cases?address=${encodeURIComponent(address)}`);
      if (!response.ok) {
        throw new Error('获取用户案件信息失败');
      }
      return response.json();
    },
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1分钟
    retry: 2,
  });
}

// 获取所有案件列表
export function useAllCases(limit: number = 50, offset: number = 0) {
  return useQuery({
    queryKey: ['cases', 'all', limit, offset],
    queryFn: async () => {
      const response = await fetch(`/api/cases?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('获取案件列表失败');
      }
      return response.json();
    },
    staleTime: 30 * 1000, // 30秒
    retry: 2,
  });
}

// 数据库查询结果类型定义
export interface DatabaseTestResult {
  success: boolean;
  message: string;
  timestamp?: string;
  error?: string;
}

export interface UserStatsResult {
  success: boolean;
  data?: {
    stats: {
      totalComplaints: number;
      totalVotes: number;
      totalDeposits: number;
      totalRewards: bigint;
      totalPunishments: bigint;
      latestActivity: number;
    };
    registration: any;
    address: string;
  };
  message?: string;
  error?: string;
}

export interface UserCasesResult {
  success: boolean;
  data?: {
    complaints: any[];
    votes: any[];
    deposits: any[];
    rewards: any[];
    punishments: any[];
    address: string;
  };
  message?: string;
  error?: string;
}

export interface AllCasesResult {
  success: boolean;
  data?: {
    cases: any[];
    pagination: {
      limit: number;
      offset: number;
      total: number;
    };
  };
  message?: string;
  error?: string;
} 