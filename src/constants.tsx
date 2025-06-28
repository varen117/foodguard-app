/**
 * FoodGuard 合约常量和 ABI 定义
 * 
 * 数据交互规范说明：
 * 
 * 1. 合约数据（链上）- 使用 useReadContract 和 useWriteContract
 *    - 用户注册状态、角色信息
 *    - 案件基本信息（CaseInfo）
 *    - 投票结果和状态
 *    - 保证金余额和状态
 *    - 系统配置参数
 * 
 * 2. 数据库数据（链下）- 使用 API 调用
 *    - 用户详细资料（姓名、联系方式、头像等）
 *    - 证据文件详情和元数据
 *    - 用户操作日志和活动记录
 *    - Twitter 绑定信息
 *    - 通知消息和提醒
 *    - 缓存数据用于提升性能
 * 
 * 3. 混合数据 - 需要同时查询合约和数据库
 *    - 案件列表（基本信息来自合约，详细信息来自数据库）
 *    - 用户资料页面（注册状态来自合约，个人信息来自数据库）
 *    - 统计数据（部分来自合约事件，部分来自数据库聚合）
 * 
 * 所有 TODO 注释格式：
 * - TODO: 合约接口 - functionName(params) 描述
 * - TODO: 数据库查询 - SQL 或描述性说明
 * - TODO: 数据库操作 - INSERT/UPDATE/DELETE 说明
 * - TODO: 混合数据查询 - 需要合约+数据库的复合查询
 */

// 合约地址映射 (chainId => contract addresses)
export const chainsToFoodGuard: { [key: number]: { [key: string]: string } } = {
  31337: {
    foodSafetyGovernance: "0x5fbdb2315678afecb367f032d93f642f64180aa3", // Anvil local
    fundManager: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    votingManager: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
    disputeManager: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
    rewardManager: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"
  },
  // 可以添加其他网络的合约地址
};

// 食品安全治理主合约 ABI
export const foodSafetyGovernanceAbi = [
  // TODO: 合约接口 - 用户注册相关
  {
    inputs: [],
    name: "registerUser",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "registerEnterprise", 
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "registerDaoMember",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  // 创建投诉
  {
    inputs: [
      { name: "enterprise", type: "address" },
      { name: "complaintTitle", type: "string" },
      { name: "complaintDescription", type: "string" },
      { name: "location", type: "string" },
      { name: "incidentTime", type: "uint256" },
      { name: "evidenceHashes", type: "string[]" },
      { name: "riskLevel", type: "uint8" }
    ],
    name: "createComplaint",
    outputs: [{ name: "caseId", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  // 查询函数
  {
    inputs: [{ name: "caseId", type: "uint256" }],
    name: "getCaseInfo",
    outputs: [
      {
        components: [
          { name: "caseId", type: "uint256" },
          { name: "complainant", type: "address" },
          { name: "enterprise", type: "address" },
          { name: "complaintTitle", type: "string" },
          { name: "complaintDescription", type: "string" },
          { name: "location", type: "string" },
          { name: "incidentTime", type: "uint256" },
          { name: "complaintTime", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "riskLevel", type: "uint8" },
          { name: "complaintUpheld", type: "bool" },
          { name: "complainantDeposit", type: "uint256" },
          { name: "enterpriseDeposit", type: "uint256" },
          { name: "isCompleted", type: "bool" },
          { name: "completionTime", type: "uint256" }
        ],
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalCases",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "isUserRegistered",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "checkIsEnterprise",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  // 投票和质疑相关
  {
    inputs: [{ name: "caseId", type: "uint256" }],
    name: "endVotingAndStartChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "caseId", type: "uint256" }],
    name: "endChallengeAndProcessRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  // 事件
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "caseId", type: "uint256" },
      { indexed: true, name: "complainant", type: "address" },
      { indexed: true, name: "enterprise", type: "address" },
      { indexed: false, name: "title", type: "string" },
      { indexed: false, name: "riskLevel", type: "uint8" },
      { indexed: false, name: "timestamp", type: "uint256" }
    ],
    name: "ComplaintCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "isEnterprise", type: "bool" },
      { indexed: false, name: "depositAmount", type: "uint256" },
      { indexed: false, name: "timestamp", type: "uint256" }
    ],
    name: "UserRegistered",
    type: "event"
  },
  {
    inputs: [],
    name: "registerDaoMember",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
] as const;

// 投票管理合约 ABI (简化版)
export const votingManagerAbi = [
  {
    inputs: [
      { name: "caseId", type: "uint256" },
      { name: "choice", type: "uint8" },
      { name: "reason", type: "string" },
      { name: "evidenceHashes", type: "string[]" },
      { name: "evidenceTypes", type: "string[]" },
      { name: "evidenceDescriptions", type: "string[]" }
    ],
    name: "submitVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "caseId", type: "uint256" }],
    name: "getVotingSessionInfo",
    outputs: [
      { name: "isActive", type: "bool" },
      { name: "validators", type: "address[]" },
      { name: "deadline", type: "uint256" },
      { name: "supportVotes", type: "uint256" },
      { name: "rejectVotes", type: "uint256" },
      { name: "totalValidators", type: "uint256" },
      { name: "votedValidators", type: "uint256" },
      { name: "minValidators", type: "uint256" },
      { name: "isCompleted", type: "bool" },
      { name: "result", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

// 质疑管理合约 ABI (简化版)
export const disputeManagerAbi = [
  {
    inputs: [
      { name: "caseId", type: "uint256" },
      { name: "targetValidator", type: "address" },
      { name: "choice", type: "uint8" },
      { name: "reason", type: "string" },
      { name: "evidenceHashes", type: "string[]" },
      { name: "evidenceTypes", type: "string[]" },
      { name: "evidenceDescriptions", type: "string[]" }
    ],
    name: "submitChallenge",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
] as const;

// 资金管理合约 ABI (简化版)
export const fundManagerAbi = [
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getAvailableDeposit",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getSystemConfig",
    outputs: [
      {
        components: [
          { name: "minComplaintDeposit", type: "uint256" },
          { name: "maxComplaintDeposit", type: "uint256" },
          { name: "minEnterpriseDeposit", type: "uint256" },
          { name: "maxEnterpriseDeposit", type: "uint256" },
          { name: "minDaoDeposit", type: "uint256" },
          { name: "maxDaoDeposit", type: "uint256" },
          { name: "votingPeriod", type: "uint256" },
          { name: "challengePeriod", type: "uint256" },
          { name: "minValidators", type: "uint256" },
          { name: "maxValidators", type: "uint256" },
          { name: "rewardPoolPercentage", type: "uint256" },
          { name: "operationalFeePercentage", type: "uint256" }
        ],
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

// 数据类型定义
export enum CaseStatus {
  PENDING = 0,
  DEPOSIT_LOCKED = 1,
  VOTING = 2,
  CHALLENGING = 3,
  REWARD_PUNISHMENT = 4,
  COMPLETED = 5,
  CANCELLED = 6
}

export enum RiskLevel {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2
}

export enum VoteChoice {
  SUPPORT_COMPLAINT = 0,
  REJECT_COMPLAINT = 1
}

export enum ChallengeChoice {
  SUPPORT_VALIDATOR = 0,
  OPPOSE_VALIDATOR = 1
}

// 案件信息类型
export interface CaseInfo {
  caseId: bigint;
  complainant: string;
  enterprise: string;
  complaintTitle: string;
  complaintDescription: string;
  location: string;
  incidentTime: bigint;
  complaintTime: bigint;
  status: CaseStatus;
  riskLevel: RiskLevel;
  complaintUpheld: boolean;
  complainantDeposit: bigint;
  enterpriseDeposit: bigint;
  isCompleted: boolean;
  completionTime: bigint;
}

// 投票会话信息类型
export interface VotingSessionInfo {
  isActive: boolean;
  validators: string[];
  deadline: bigint;
  supportVotes: bigint;
  rejectVotes: bigint;
  totalValidators: bigint;
  votedValidators: bigint;
  minValidators: bigint;
  isCompleted: boolean;
  result: boolean;
}

// 系统配置类型
export interface SystemConfig {
  minComplaintDeposit: bigint;
  maxComplaintDeposit: bigint;
  minEnterpriseDeposit: bigint;
  maxEnterpriseDeposit: bigint;
  minDaoDeposit: bigint;
  maxDaoDeposit: bigint;
  votingPeriod: bigint;
  challengePeriod: bigint;
  minValidators: bigint;
  maxValidators: bigint;
  rewardPoolPercentage: bigint;
  operationalFeePercentage: bigint;
} 