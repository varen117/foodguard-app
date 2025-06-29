import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, formatEther } from "viem";
import { toast } from "react-hot-toast";

import { 
  chainsToFoodGuard, 
  foodSafetyGovernanceAbi,
  participantPoolManagerAbi,
  votingDisputeManagerAbi,
  fundManagerAbi,
  CaseInfo,
  RiskLevel,
  VoteChoice,
  ChallengeChoice,
  UserRole,
  getStatusText,
  getRiskLevelText
} from "@/constants";

// Hook: 获取合约地址
export function useContractAddresses() {
  const chainId = useChainId();
  return chainsToFoodGuard[chainId] || null;
}

// Hook: 检查用户注册状态
export function useUserRegistration() {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data: isRegistered = false } = useReadContract({
    abi: participantPoolManagerAbi,
    address: contracts?.participantPoolManager as `0x${string}`,
    functionName: 'isUserRegistered',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contracts && !!address,
    },
  });

  const { data: userInfo } = useReadContract({
    abi: participantPoolManagerAbi,
    address: contracts?.participantPoolManager as `0x${string}`,
    functionName: 'getUserInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contracts && !!address && isRegistered,
    },
  });

  return {
    isRegistered,
    userInfo: userInfo ? {
      isRegistered: userInfo[0],
      role: userInfo[1] as UserRole,
      isActive: userInfo[2],
      lastActiveTime: userInfo[3]
    } : null
  };
}

// Hook: 用户注册
export function useUserRegister() {
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();
  const contracts = useContractAddresses();
  const { address } = useAccount();

  return useMutation({
    mutationFn: async ({ userType, depositAmount }: { 
      userType: 'complainant' | 'enterprise' | 'dao', 
      depositAmount: string 
    }) => {
      if (!contracts) {
        const error = new Error("合约地址未找到");
        throw error;
      }

      const isEnterprise = userType === 'enterprise';
      
      try {
        const hash = await writeContract({
          abi: participantPoolManagerAbi,
          address: contracts.participantPoolManager as `0x${string}`,
          functionName: 'register',
          args: [isEnterprise],
          value: parseEther(depositAmount),
        });

        return hash;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (hash) => {
      toast.success("注册交易已提交，等待确认...");
      queryClient.invalidateQueries({ queryKey: ['userRegistration'] });
    },
    onError: (error) => {
      toast.error(`注册失败: ${error.message}`);
    },
  });
}

// Hook: 创建投诉
export function useCreateComplaint() {
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();
  const contracts = useContractAddresses();
  const { address } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      enterprise: string;
      complaintTitle: string;
      complaintDescription: string;
      location: string;
      incidentTime: number;
      evidenceHash: string;
      riskLevel: RiskLevel;
      depositAmount?: string;
    }) => {
      if (!contracts) {
        const error = new Error("合约地址未找到");
        throw error;
      }

      try {
        const hash = await writeContract({
          abi: foodSafetyGovernanceAbi,
          address: contracts.foodSafetyGovernance as `0x${string}`,
          functionName: 'createComplaint',
          args: [
            params.enterprise as `0x${string}`,
            params.complaintTitle,
            params.complaintDescription,
            params.location,
            BigInt(params.incidentTime),
            params.evidenceHash,
            params.riskLevel
          ],
          value: params.depositAmount ? parseEther(params.depositAmount) : undefined,
        });

        return hash;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (hash) => {
      toast.success("投诉已提交，等待区块链确认...");
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['totalCases'] });
      queryClient.invalidateQueries({ queryKey: ['activeCases'] });
    },
    onError: (error) => {
      toast.error(`投诉提交失败: ${error.message}`);
    },
  });
}

// Hook: 获取案件信息
export function useCaseInfo(caseId?: number) {
  const contracts = useContractAddresses();

  const { data: caseInfo, isLoading, error } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contracts?.foodSafetyGovernance as `0x${string}`,
    functionName: 'getCaseInfo',
    args: caseId !== undefined ? [BigInt(caseId)] : undefined,
    query: {
      enabled: !!contracts && caseId !== undefined,
    },
  });

  return {
    caseInfo: caseInfo ? {
      caseId: caseInfo.caseId,
      complainant: caseInfo.complainant,
      enterprise: caseInfo.enterprise,
      complaintTitle: caseInfo.complaintTitle,
      complaintDescription: caseInfo.complaintDescription,
      location: caseInfo.location,
      incidentTime: caseInfo.incidentTime,
      complaintTime: caseInfo.complaintTime,
      status: caseInfo.status,
      riskLevel: caseInfo.riskLevel,
      complaintUpheld: caseInfo.complaintUpheld,
      complainantDeposit: caseInfo.complainantDeposit,
      enterpriseDeposit: caseInfo.enterpriseDeposit,
      complainantEvidenceHash: caseInfo.complainantEvidenceHash,
      isCompleted: caseInfo.isCompleted,
      completionTime: caseInfo.completionTime
    } as CaseInfo : null,
    isLoading,
    error
  };
}

// Hook: 获取活跃案件列表
export function useActiveCases() {
  const contracts = useContractAddresses();

  const { data: activeCaseInfos, isLoading, error } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contracts?.foodSafetyGovernance as `0x${string}`,
    functionName: 'getActiveCaseInfos',
    query: {
      enabled: !!contracts,
    },
  });

  return {
    cases: activeCaseInfos ? activeCaseInfos.map(caseInfo => ({
      caseId: caseInfo.caseId,
      complainant: caseInfo.complainant,
      enterprise: caseInfo.enterprise,
      complaintTitle: caseInfo.complaintTitle,
      complaintDescription: caseInfo.complaintDescription,
      location: caseInfo.location,
      incidentTime: caseInfo.incidentTime,
      complaintTime: caseInfo.complaintTime,
      status: caseInfo.status,
      riskLevel: caseInfo.riskLevel,
      complaintUpheld: caseInfo.complaintUpheld,
      complainantDeposit: caseInfo.complainantDeposit,
      enterpriseDeposit: caseInfo.enterpriseDeposit,
      complainantEvidenceHash: caseInfo.complainantEvidenceHash,
      isCompleted: caseInfo.isCompleted,
      completionTime: caseInfo.completionTime
    } as CaseInfo)) : [],
    isLoading,
    error
  };
}

// Hook: 获取案件总数
export function useTotalCases() {
  const contracts = useContractAddresses();

  const { data: totalCases = 0n } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contracts?.foodSafetyGovernance as `0x${string}`,
    functionName: 'getTotalCases',
    query: {
      enabled: !!contracts,
    },
  });

  return Number(totalCases);
}

// Hook: 投票功能
export function useSubmitVote() {
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();
  const contracts = useContractAddresses();
  const { address } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      caseId: number;
      choice: VoteChoice;
      reason: string;
      evidenceHash: string;
    }) => {
      if (!contracts) {
        const error = new Error("合约地址未找到");
        throw error;
      }

      try {
        const hash = await writeContract({
          abi: votingDisputeManagerAbi,
          address: contracts.votingDisputeManager as `0x${string}`,
          functionName: 'submitVote',
          args: [
            BigInt(params.caseId),
            params.choice,
            params.reason,
            params.evidenceHash
          ],
        });

        return hash;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (hash) => {
      toast.success("投票已提交，等待区块链确认...");
      queryClient.invalidateQueries({ queryKey: ['votingSession'] });
      queryClient.invalidateQueries({ queryKey: ['caseInfo'] });
    },
    onError: (error) => {
      toast.error(`投票失败: ${error.message}`);
    },
  });
}

// Hook: 质疑功能
export function useSubmitChallenge() {
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();
  const contracts = useContractAddresses();
  const { address } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      caseId: number;
      targetValidator: string;
      choice: ChallengeChoice;
      reason: string;
      evidenceHash: string;
      depositAmount: string;
    }) => {
      if (!contracts) {
        const error = new Error("合约地址未找到");
        throw error;
      }

      try {
        const hash = await writeContract({
          abi: votingDisputeManagerAbi,
          address: contracts.votingDisputeManager as `0x${string}`,
          functionName: 'submitChallenge',
          args: [
            BigInt(params.caseId),
            params.targetValidator as `0x${string}`,
            params.choice,
            params.reason,
            params.evidenceHash
          ],
          value: parseEther(params.depositAmount),
        });

        return hash;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (hash) => {
      toast.success("质疑已提交，等待区块链确认...");
      queryClient.invalidateQueries({ queryKey: ['challengeSession'] });
      queryClient.invalidateQueries({ queryKey: ['caseInfo'] });
    },
    onError: (error) => {
      toast.error(`质疑失败: ${error.message}`);
    },
  });
}

// Hook: 获取投票会话信息
export function useVotingSession(caseId?: number) {
  const contracts = useContractAddresses();

  const { data: votingSession } = useReadContract({
    abi: votingDisputeManagerAbi,
    address: contracts?.votingDisputeManager as `0x${string}`,
    functionName: 'getVotingSessionInfo',
    args: caseId !== undefined ? [BigInt(caseId)] : undefined,
    query: {
      enabled: !!contracts && caseId !== undefined,
    },
  });

  return votingSession ? {
    startTime: votingSession[0],
    endTime: votingSession[1],
    supportVotes: votingSession[2],
    rejectVotes: votingSession[3],
    totalVotes: votingSession[4],
    isActive: votingSession[5],
    isCompleted: votingSession[6]
  } : null;
}

// Hook: 检查用户是否已投票
export function useHasUserVoted(caseId?: number) {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data: hasVoted = false } = useReadContract({
    abi: votingDisputeManagerAbi,
    address: contracts?.votingDisputeManager as `0x${string}`,
    functionName: 'hasUserVoted',
    args: caseId !== undefined && address ? [BigInt(caseId), address] : undefined,
    query: {
      enabled: !!contracts && caseId !== undefined && !!address,
    },
  });

  return hasVoted;
}

// Hook: 检查用户是否为选定的验证者
export function useIsSelectedValidator(caseId?: number) {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data: isValidator = false } = useReadContract({
    abi: votingDisputeManagerAbi,
    address: contracts?.votingDisputeManager as `0x${string}`,
    functionName: 'isUserSelectedValidator',
    args: caseId !== undefined && address ? [BigInt(caseId), address] : undefined,
    query: {
      enabled: !!contracts && caseId !== undefined && !!address,
    },
  });

  return isValidator;
}

// Hook: 获取用户保证金信息
export function useUserDeposit() {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data: availableDeposit = 0n } = useReadContract({
    abi: fundManagerAbi,
    address: contracts?.fundManager as `0x${string}`,
    functionName: 'getAvailableDeposit',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contracts && !!address,
    },
  });

  const { data: totalDeposit = 0n } = useReadContract({
    abi: fundManagerAbi,
    address: contracts?.fundManager as `0x${string}`,
    functionName: 'getTotalDeposit',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contracts && !!address,
    },
  });

  const { data: frozenDeposit = 0n } = useReadContract({
    abi: fundManagerAbi,
    address: contracts?.fundManager as `0x${string}`,
    functionName: 'getFrozenDeposit',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contracts && !!address,
    },
  });

  return {
    availableDeposit: formatEther(availableDeposit),
    totalDeposit: formatEther(totalDeposit),
    frozenDeposit: formatEther(frozenDeposit)
  };
}

// Hook: 获取系统配置
export function useSystemConfig() {
  const contracts = useContractAddresses();

  const { data: systemConfig } = useReadContract({
    abi: fundManagerAbi,
    address: contracts?.fundManager as `0x${string}`,
    functionName: 'getSystemConfig',
    query: {
      enabled: !!contracts,
    },
  });

  return systemConfig ? {
    minComplaintDeposit: formatEther(systemConfig.minComplaintDeposit),
    minEnterpriseDeposit: formatEther(systemConfig.minEnterpriseDeposit),
    minDaoDeposit: formatEther(systemConfig.minDaoDeposit),
    votingPeriod: Number(systemConfig.votingPeriod),
    challengePeriod: Number(systemConfig.challengePeriod),
    minValidators: Number(systemConfig.minValidators),
    maxValidators: Number(systemConfig.maxValidators),
    rewardPoolPercentage: Number(systemConfig.rewardPoolPercentage),
    operationalFeePercentage: Number(systemConfig.operationalFeePercentage)
  } : null;
}

// Hook: 结束投票并开始质疑
export function useEndVotingAndStartChallenge() {
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();
  const contracts = useContractAddresses();

  return useMutation({
    mutationFn: async (caseId: number) => {
      if (!contracts) throw new Error("合约地址未找到");

      // TODO: 合约接口 - endVotingAndStartChallenge() 结束投票开始质疑
      const hash = await writeContract({
        abi: foodSafetyGovernanceAbi,
        address: contracts.foodSafetyGovernance as `0x${string}`,
        functionName: 'endVotingAndStartChallenge',
        args: [BigInt(caseId)],
      });

      return hash;
    },
    onSuccess: (hash) => {
      toast.success("投票已结束，质疑期开始");
      queryClient.invalidateQueries({ queryKey: ['caseInfo'] });
      queryClient.invalidateQueries({ queryKey: ['votingSession'] });
    },
    onError: (error) => {
      toast.error(`操作失败: ${error.message}`);
    },
  });
}

// Hook: 结束质疑并处理奖惩
export function useEndChallengeAndProcessRewards() {
  const { writeContract } = useWriteContract();
  const queryClient = useQueryClient();
  const contracts = useContractAddresses();

  return useMutation({
    mutationFn: async (caseId: number) => {
      if (!contracts) throw new Error("合约地址未找到");

      // TODO: 合约接口 - endChallengeAndProcessRewards() 结束质疑处理奖惩
      const hash = await writeContract({
        abi: foodSafetyGovernanceAbi,
        address: contracts.foodSafetyGovernance as `0x${string}`,
        functionName: 'endChallengeAndProcessRewards',
        args: [BigInt(caseId)],
      });

      return hash;
    },
    onSuccess: (hash) => {
      toast.success("质疑期已结束，正在处理奖惩");
      queryClient.invalidateQueries({ queryKey: ['caseInfo'] });
      queryClient.invalidateQueries({ queryKey: ['activeCases'] });
    },
    onError: (error) => {
      toast.error(`操作失败: ${error.message}`);
    },
  });
}

// Hook: 等待交易确认
export function useWaitForTransaction(hash?: `0x${string}`) {
  const { data: receipt, isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    }
  });

  return {
    receipt,
    isLoading,
    isSuccess,
    isError
  };
} 