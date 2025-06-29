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

/**
 * FoodGuard 系统常量配置
 */

// 合约地址配置
export const chainsToFoodGuard: Record<number, { 
  foodSafetyGovernance: string;
  participantPoolManager: string;
  fundManager: string;
  votingDisputeManager: string;
  rewardPunishmentManager: string;
}> = {
  31337: {
    foodSafetyGovernance: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", // Anvil 本地网络 - FoodSafetyGovernance
    participantPoolManager: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // ParticipantPoolManager
    fundManager: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // FundManager  
    votingDisputeManager: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // VotingDisputeManager
    rewardPunishmentManager: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", // RewardPunishmentManager
  },
  // 可以添加其他网络的合约地址
};

// 业务枚举定义（与合约保持一致）
export enum CaseStatus {
  PENDING = 0,            // 待处理
  DEPOSIT_LOCKED = 1,     // 保证金已锁定
  VOTING = 2,             // 投票中
  CHALLENGING = 3,        // 质疑中
  REWARD_PUNISHMENT = 4,  // 奖惩阶段
  COMPLETED = 5,          // 已完成
  CANCELLED = 6           // 已取消
}

export enum RiskLevel {
  LOW = 0,      // 低风险
  MEDIUM = 1,   // 中风险
  HIGH = 2      // 高风险
}

export enum VoteChoice {
  SUPPORT_COMPLAINT = 0,  // 支持投诉
  REJECT_COMPLAINT = 1    // 反对投诉
}

export enum ChallengeChoice {
  SUPPORT_VALIDATOR = 0,  // 支持验证者
  OPPOSE_VALIDATOR = 1    // 反对验证者
}

export enum UserRole {
  COMPLAINANT = 0,    // 投诉者
  ENTERPRISE = 1,     // 企业
  DAO_MEMBER = 2      // DAO成员
}

// 案件信息接口
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
  complainantEvidenceHash: string;
  isCompleted: boolean;
  completionTime: bigint;
}

// FoodSafetyGovernance 合约 ABI
export const foodSafetyGovernanceAbi = [
  // 主要函数
  {
    "type": "function",
    "name": "createComplaint",
    "inputs": [
      {"name": "enterprise", "type": "address"},
      {"name": "complaintTitle", "type": "string"},
      {"name": "complaintDescription", "type": "string"},
      {"name": "location", "type": "string"},
      {"name": "incidentTime", "type": "uint256"},
      {"name": "evidenceHash", "type": "string"},
      {"name": "riskLevel", "type": "uint8"}
    ],
    "outputs": [{"name": "caseId", "type": "uint256"}],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "endVotingAndStartChallenge",
    "inputs": [{"name": "caseId", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "endChallengeAndProcessRewards",
    "inputs": [{"name": "caseId", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  
  // 查询函数
  {
    "type": "function",
    "name": "getCaseInfo",
    "inputs": [{"name": "caseId", "type": "uint256"}],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {"name": "caseId", "type": "uint256"},
          {"name": "complainant", "type": "address"},
          {"name": "enterprise", "type": "address"},
          {"name": "complaintTitle", "type": "string"},
          {"name": "complaintDescription", "type": "string"},
          {"name": "location", "type": "string"},
          {"name": "incidentTime", "type": "uint256"},
          {"name": "complaintTime", "type": "uint256"},
          {"name": "status", "type": "uint8"},
          {"name": "riskLevel", "type": "uint8"},
          {"name": "complaintUpheld", "type": "bool"},
          {"name": "complainantDeposit", "type": "uint256"},
          {"name": "enterpriseDeposit", "type": "uint256"},
          {"name": "complainantEvidenceHash", "type": "string"},
          {"name": "isCompleted", "type": "bool"},
          {"name": "completionTime", "type": "uint256"}
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalCases",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getActiveCases",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getActiveCaseInfos",
    "inputs": [],
    "outputs": [
      {
        "name": "activeCaseInfos",
        "type": "tuple[]",
        "components": [
          {"name": "caseId", "type": "uint256"},
          {"name": "complainant", "type": "address"},
          {"name": "enterprise", "type": "address"},
          {"name": "complaintTitle", "type": "string"},
          {"name": "complaintDescription", "type": "string"},
          {"name": "location", "type": "string"},
          {"name": "incidentTime", "type": "uint256"},
          {"name": "complaintTime", "type": "uint256"},
          {"name": "status", "type": "uint8"},
          {"name": "riskLevel", "type": "uint8"},
          {"name": "complaintUpheld", "type": "bool"},
          {"name": "complainantDeposit", "type": "uint256"},
          {"name": "enterpriseDeposit", "type": "uint256"},
          {"name": "complainantEvidenceHash", "type": "string"},
          {"name": "isCompleted", "type": "bool"},
          {"name": "completionTime", "type": "uint256"}
        ]
      }
    ],
    "stateMutability": "view"
  },
  
  // 事件定义
  {
    "type": "event",
    "name": "ComplaintCreated",
    "inputs": [
      {"name": "caseId", "type": "uint256", "indexed": true},
      {"name": "complainant", "type": "address", "indexed": true},
      {"name": "enterprise", "type": "address", "indexed": true},
      {"name": "complaintTitle", "type": "string", "indexed": false},
      {"name": "riskLevel", "type": "uint8", "indexed": false},
      {"name": "timestamp", "type": "uint256", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "CaseStatusUpdated",
    "inputs": [
      {"name": "caseId", "type": "uint256", "indexed": true},
      {"name": "oldStatus", "type": "uint8", "indexed": false},
      {"name": "newStatus", "type": "uint8", "indexed": false},
      {"name": "timestamp", "type": "uint256", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "CaseCompleted",
    "inputs": [
      {"name": "caseId", "type": "uint256", "indexed": true},
      {"name": "complaintUpheld", "type": "bool", "indexed": false},
      {"name": "totalReward", "type": "uint256", "indexed": false},
      {"name": "totalPunishment", "type": "uint256", "indexed": false},
      {"name": "timestamp", "type": "uint256", "indexed": false}
    ]
  }
] as const;

// ParticipantPoolManager 合约 ABI（用户注册相关）
export const participantPoolManagerAbi = [
  {
    "type": "function",
    "name": "register",
    "inputs": [{"name": "isEnterprise", "type": "bool"}],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "isUserRegistered",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserInfo",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [
      {"name": "isRegistered", "type": "bool"},
      {"name": "role", "type": "uint8"},
      {"name": "isActive", "type": "bool"},
      {"name": "lastActiveTime", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "UserRegistered",
    "inputs": [
      {"name": "user", "type": "address", "indexed": true},
      {"name": "isEnterprise", "type": "bool", "indexed": false},
      {"name": "depositAmount", "type": "uint256", "indexed": false},
      {"name": "timestamp", "type": "uint256", "indexed": false}
    ]
  }
] as const;

// VotingDisputeManager 合约 ABI（投票和质疑相关）
export const votingDisputeManagerAbi = [
  {
    "type": "function",
    "name": "submitVote",
    "inputs": [
      {"name": "caseId", "type": "uint256"},
      {"name": "choice", "type": "uint8"},
      {"name": "reason", "type": "string"},
      {"name": "evidenceHash", "type": "string"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "submitChallenge",
    "inputs": [
      {"name": "caseId", "type": "uint256"},
      {"name": "targetValidator", "type": "address"},
      {"name": "choice", "type": "uint8"},
      {"name": "reason", "type": "string"},
      {"name": "evidenceHash", "type": "string"}
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getVotingSessionInfo",
    "inputs": [{"name": "caseId", "type": "uint256"}],
    "outputs": [
      {"name": "startTime", "type": "uint256"},
      {"name": "endTime", "type": "uint256"},
      {"name": "supportVotes", "type": "uint256"},
      {"name": "rejectVotes", "type": "uint256"},
      {"name": "totalVotes", "type": "uint256"},
      {"name": "isActive", "type": "bool"},
      {"name": "isCompleted", "type": "bool"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasUserVoted",
    "inputs": [
      {"name": "caseId", "type": "uint256"},
      {"name": "voter", "type": "address"}
    ],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isUserSelectedValidator",
    "inputs": [
      {"name": "caseId", "type": "uint256"},
      {"name": "user", "type": "address"}
    ],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "VoteSubmitted",
    "inputs": [
      {"name": "caseId", "type": "uint256", "indexed": true},
      {"name": "voter", "type": "address", "indexed": true},
      {"name": "choice", "type": "uint8", "indexed": false},
      {"name": "timestamp", "type": "uint256", "indexed": false}
    ]
  },
  {
    "type": "event",
    "name": "ChallengeSubmitted",
    "inputs": [
      {"name": "caseId", "type": "uint256", "indexed": true},
      {"name": "challenger", "type": "address", "indexed": true},
      {"name": "targetValidator", "type": "address", "indexed": true},
      {"name": "choice", "type": "uint8", "indexed": false},
      {"name": "timestamp", "type": "uint256", "indexed": false}
    ]
  }
] as const;

// FundManager 合约 ABI（资金管理相关）
export const fundManagerAbi = [
  {
    "type": "function",
    "name": "getAvailableDeposit",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalDeposit",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getFrozenDeposit",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSystemConfig",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {"name": "minComplaintDeposit", "type": "uint256"},
          {"name": "minEnterpriseDeposit", "type": "uint256"},
          {"name": "minDaoDeposit", "type": "uint256"},
          {"name": "votingPeriod", "type": "uint256"},
          {"name": "challengePeriod", "type": "uint256"},
          {"name": "minValidators", "type": "uint256"},
          {"name": "maxValidators", "type": "uint256"},
          {"name": "rewardPoolPercentage", "type": "uint256"},
          {"name": "operationalFeePercentage", "type": "uint256"}
        ]
      }
    ],
    "stateMutability": "view"
  }
] as const;

// 状态文本映射
export const getStatusText = (status: CaseStatus): string => {
  switch (status) {
    case CaseStatus.PENDING: return "等待处理";
    case CaseStatus.DEPOSIT_LOCKED: return "保证金锁定";
    case CaseStatus.VOTING: return "投票中";
    case CaseStatus.CHALLENGING: return "质疑中";
    case CaseStatus.REWARD_PUNISHMENT: return "奖惩处理";
    case CaseStatus.COMPLETED: return "已完成";
    case CaseStatus.CANCELLED: return "已取消";
    default: return "未知状态";
  }
};

export const getRiskLevelText = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case RiskLevel.LOW: return "低风险";
    case RiskLevel.MEDIUM: return "中风险";
    case RiskLevel.HIGH: return "高风险";
    default: return "未知";
  }
};

export const getRiskLevelColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case RiskLevel.LOW: return "text-green-500";
    case RiskLevel.MEDIUM: return "text-yellow-500";
    case RiskLevel.HIGH: return "text-red-500";
    default: return "text-gray-500";
  }
};

export const getStatusColor = (status: CaseStatus): string => {
  switch (status) {
    case CaseStatus.PENDING: return "bg-gray-100 text-gray-800";
    case CaseStatus.DEPOSIT_LOCKED: return "bg-blue-100 text-blue-800";
    case CaseStatus.VOTING: return "bg-yellow-100 text-yellow-800";
    case CaseStatus.CHALLENGING: return "bg-orange-100 text-orange-800";
    case CaseStatus.REWARD_PUNISHMENT: return "bg-purple-100 text-purple-800";
    case CaseStatus.COMPLETED: return "bg-green-100 text-green-800";
    case CaseStatus.CANCELLED: return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

// 合约地址查找函数
export const getContractAddresses = (chainId: number) => {
  return chainsToFoodGuard[chainId] || null;
}; 