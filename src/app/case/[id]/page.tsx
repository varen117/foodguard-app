/**
 * 案件详情页面
 */
"use client"

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAccount, useChainId, useReadContract, useWriteContract } from "wagmi";
import { 
  FaEye, FaGavel, FaExclamationTriangle, FaCheckCircle, 
  FaClock, FaFileAlt, FaUser, FaBuilding, FaMapMarkerAlt,
  FaCalendarAlt, FaShieldAlt, FaVoteYea, FaComments
} from "react-icons/fa";
import { 
  chainsToFoodGuard, 
  foodSafetyGovernanceAbi, 
  votingDisputeManagerAbi,
  CaseInfo, 
  CaseStatus, 
  RiskLevel,
  VoteChoice,
  ChallengeChoice
} from "@/constants";
import TransactionStatus from "@/components/TransactionStatus";
import { useQueryClient } from "@tanstack/react-query";

interface EvidenceInfo {
  hash: string;
  type: string;
  description: string;
  // TODO: 数据库查询 - 证据的详细信息
  fileName?: string;        // 文件名 - 从数据库获取
  fileSize?: number;        // 文件大小 - 从数据库获取
  uploadTime?: bigint;      // 上传时间 - 从数据库获取
  ipfsUrl?: string;         // IPFS完整URL - 从数据库获取
}

interface VotingInfo {
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

interface UserProfile {
  // TODO: 数据库查询 - 用户详细资料
  name?: string;            // 用户姓名 - 从数据库获取
  email?: string;           // 邮箱 - 从数据库获取
  phone?: string;           // 电话 - 从数据库获取
  address?: string;         // 详细地址 - 从数据库获取
  avatar?: string;          // 头像URL - 从数据库获取
  registrationTime?: bigint; // 注册时间 - 从数据库获取
  reputationScore?: number; // 信誉分数 - 从合约获取
}

export default function CaseDetailPage() {
  const params = useParams();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const caseId = parseInt(params.id as string);
  const queryClient = useQueryClient();
  
  const [caseInfo, setCaseInfo] = useState<CaseInfo | null>(null);
  const [evidences, setEvidences] = useState<EvidenceInfo[]>([]);
  const [votingInfo, setVotingInfo] = useState<VotingInfo | null>(null);
  const [complainantProfile, setComplainantProfile] = useState<UserProfile>({});
  const [enterpriseProfile, setEnterpriseProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);
  
  // 投票相关状态
  const [voteChoice, setVoteChoice] = useState<VoteChoice>(VoteChoice.SUPPORT_COMPLAINT);
  const [voteReason, setVoteReason] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  
  // 质疑相关状态
  const [challengeChoice, setChallengeChoice] = useState<ChallengeChoice>(ChallengeChoice.SUPPORT_VALIDATOR);
  const [challengeReason, setChallengeReason] = useState("");
  const [selectedValidator, setSelectedValidator] = useState("");
  const [isChallenging, setIsChallenging] = useState(false);
  
  // 交易状态相关
  const [currentTxHash, setCurrentTxHash] = useState<`0x${string}` | undefined>();
  const [currentTxType, setCurrentTxType] = useState<'vote' | 'challenge' | undefined>();
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;
  const votingDisputeManagerAddress = chainsToFoodGuard[chainId]?.votingDisputeManager;

  const { writeContractAsync } = useWriteContract();

  // TODO: 合约接口 - 获取案件基本信息
  const { data: contractCaseInfo } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'getCaseInfo',
    args: [BigInt(caseId)],
    query: {
      enabled: !!contractAddress && !isNaN(caseId),
    },
  });

  // TODO: 合约接口 - 获取投票会话信息
  const { data: contractVotingInfo } = useReadContract({
    abi: votingDisputeManagerAbi,
    address: votingDisputeManagerAddress as `0x${string}`,
    functionName: 'getVotingSessionInfo',
    args: [BigInt(caseId)],
    query: {
      enabled: !!votingDisputeManagerAddress && !isNaN(caseId),
    },
  });

  const loadCaseDetails = useCallback(async () => {
    if (!contractCaseInfo) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // TODO: 合约数据转换 - 将合约返回的数据转换为前端格式
      const caseData: CaseInfo = {
        caseId: contractCaseInfo.caseId,
        complainant: contractCaseInfo.complainant,
        enterprise: contractCaseInfo.enterprise,
        complaintTitle: contractCaseInfo.complaintTitle,
        complaintDescription: contractCaseInfo.complaintDescription,
        location: contractCaseInfo.location,
        incidentTime: contractCaseInfo.incidentTime,
        complaintTime: contractCaseInfo.complaintTime,
        status: contractCaseInfo.status,
        riskLevel: contractCaseInfo.riskLevel,
        complaintUpheld: contractCaseInfo.complaintUpheld,
        complainantDeposit: contractCaseInfo.complainantDeposit,
        enterpriseDeposit: contractCaseInfo.enterpriseDeposit,
        isCompleted: contractCaseInfo.isCompleted,
        completionTime: contractCaseInfo.completionTime,
      };

      setCaseInfo(caseData);

      // TODO: 数据库查询 - 获取案件的证据列表
      // SELECT * FROM evidences WHERE case_id = ? ORDER BY upload_time DESC
      const mockEvidences: EvidenceInfo[] = [
        {
          hash: "QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          type: "图片",
          description: "食品变质的照片",
          fileName: "spoiled_food.jpg",
          fileSize: 2048576,
          uploadTime: BigInt(Date.now() - 3600000),
          ipfsUrl: "https://ipfs.io/ipfs/QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        },
        {
          hash: "QmYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
          type: "文档",
          description: "购买凭证",
          fileName: "receipt.pdf",
          fileSize: 512000,
          uploadTime: BigInt(Date.now() - 7200000),
          ipfsUrl: "https://ipfs.io/ipfs/QmYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
        }
      ];
      setEvidences(mockEvidences);

      // TODO: 数据库查询 - 获取投诉者详细资料
      // SELECT * FROM users WHERE address = ?
      const mockComplainantProfile: UserProfile = {
        name: "张三",
        email: "zhangsan@example.com",
        phone: "138****1234",
        address: "北京市朝阳区XX路XX号",
        avatar: "/default-avatar.png",
        registrationTime: BigInt(Date.now() - 86400000 * 30),
        reputationScore: 850
      };
      setComplainantProfile(mockComplainantProfile);

      // TODO: 数据库查询 - 获取企业详细资料
      // SELECT * FROM enterprises WHERE address = ?
      const mockEnterpriseProfile: UserProfile = {
        name: "XX食品有限公司",
        email: "contact@xxfood.com",
        phone: "400-XXX-XXXX",
        address: "北京市海淀区XX科技园",
        avatar: "/default-company.png",
        registrationTime: BigInt(Date.now() - 86400000 * 180),
        reputationScore: 720
      };
      setEnterpriseProfile(mockEnterpriseProfile);

      // TODO: 合约数据处理 - 处理投票信息
      if (contractVotingInfo) {
        setVotingInfo({
          isActive: contractVotingInfo.isActive,
          validators: contractVotingInfo.validators,
          deadline: contractVotingInfo.deadline,
          supportVotes: contractVotingInfo.supportVotes,
          rejectVotes: contractVotingInfo.rejectVotes,
          totalValidators: contractVotingInfo.totalValidators,
          votedValidators: contractVotingInfo.votedValidators,
          minValidators: contractVotingInfo.minValidators,
          isCompleted: contractVotingInfo.isCompleted,
          result: contractVotingInfo.result
        });
      }

      // TODO: 数据库操作 - 增加案件浏览次数
      // UPDATE case_stats SET view_count = view_count + 1 WHERE case_id = ?
      console.log('TODO: 增加案件浏览次数:', { caseId, timestamp: Date.now() });

      // TODO: 数据库操作 - 记录用户查看案件详情的行为
      // INSERT INTO user_activities (user_address, activity_type, case_id, timestamp) VALUES (?, 'view_case_detail', ?, ?)
      if (address) {
        console.log('TODO: 记录用户查看案件详情:', {
          userAddress: address,
          caseId,
          timestamp: Date.now()
        });
      }

    } catch (error) {
      console.error('加载案件详情失败:', error);
    } finally {
      setLoading(false);
    }
  }, [contractCaseInfo, contractVotingInfo, caseId, address, votingDisputeManagerAddress]);

  useEffect(() => {
    loadCaseDetails();
  }, [loadCaseDetails]);

  const handleVote = async () => {
    if (!isConnected || !votingDisputeManagerAddress || !caseInfo) {
      alert("请先连接钱包");
      return;
    }

    try {
      setIsVoting(true);

      // TODO: 合约接口调用 - 提交投票
      const txHash = await writeContractAsync({
        abi: votingDisputeManagerAbi,
        address: votingDisputeManagerAddress as `0x${string}`,
        functionName: 'submitVote',
        args: [
          BigInt(caseId),
          voteChoice,
          voteReason,
          "" // 证据哈希
        ],
      });

      console.log('投票交易已提交:', txHash);
      setCurrentTxHash(txHash);
      setCurrentTxType('vote');
      setShowTransactionStatus(true);

      // TODO: 数据库操作 - 记录投票行为
      console.log('TODO: 记录投票行为:', {
        userAddress: address,
        caseId,
        voteChoice,
        reason: voteReason,
        timestamp: Date.now()
      });

    } catch (error) {
      console.error('投票失败:', error);
      alert('投票失败，请重试');
      setIsVoting(false);
    }
  };

  const handleChallenge = async () => {
    if (!isConnected || !votingDisputeManagerAddress || !selectedValidator) {
      alert("请先连接钱包并选择要质疑的验证者");
      return;
    }

    try {
      setIsChallenging(true);

      // TODO: 合约接口调用 - 提交质疑
      const txHash = await writeContractAsync({
        abi: votingDisputeManagerAbi,
        address: votingDisputeManagerAddress as `0x${string}`,
        functionName: 'submitChallenge',
        args: [
          BigInt(caseId),
          challengeChoice,
          challengeReason,
          "" // 证据哈希
        ],
        // TODO: 合约要求 - 质疑需要支付保证金
        value: BigInt("50000000000000000"), // 0.05 ETH 质疑保证金
      });

      console.log('质疑交易已提交:', txHash);
      setCurrentTxHash(txHash);
      setCurrentTxType('challenge');
      setShowTransactionStatus(true);

      // TODO: 数据库操作 - 记录质疑行为
      console.log('TODO: 记录质疑行为:', {
        userAddress: address,
        caseId,
        targetValidator: selectedValidator,
        challengeChoice,
        reason: challengeReason,
        timestamp: Date.now()
      });

    } catch (error) {
      console.error('质疑失败:', error);
      alert('质疑失败，请重试');
      setIsChallenging(false);
    }
  };

  const getStatusText = (status: CaseStatus) => {
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

  const getRiskLevelText = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW: return "低风险";
      case RiskLevel.MEDIUM: return "中风险";
      case RiskLevel.HIGH: return "高风险";
      default: return "未知";
    }
  };

  const isUserValidator = () => {
    return votingInfo?.validators.includes(address as string) || false;
  };

  const hasUserVoted = () => {
    // TODO: 合约查询 - 检查用户是否已经投票
    // 这里需要调用合约方法检查用户是否已经在此案件中投票
    return false; // 临时返回false
  };

  if (loading) {
    return (
      <div className="main-container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted mt-4">加载案件详情中...</p>
        </div>
      </div>
    );
  }

  if (!caseInfo) {
    return (
      <div className="main-container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-8">
            <FaExclamationTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-card mb-4">
              案件不存在
            </h2>
            <p className="text-muted">
              您访问的案件不存在或已被删除
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 案件头部信息 */}
        <div className="card p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold text-card">
                  {caseInfo.complaintTitle}
                </h1>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  caseInfo.status === CaseStatus.VOTING ? 'bg-blue-100 text-blue-800' :
                  caseInfo.status === CaseStatus.CHALLENGING ? 'bg-yellow-100 text-yellow-800' :
                  caseInfo.status === CaseStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {caseInfo.status === CaseStatus.VOTING && <FaGavel className="w-4 h-4" />}
                  {caseInfo.status === CaseStatus.CHALLENGING && <FaExclamationTriangle className="w-4 h-4" />}
                  {caseInfo.status === CaseStatus.COMPLETED && <FaCheckCircle className="w-4 h-4" />}
                  {![CaseStatus.VOTING, CaseStatus.CHALLENGING, CaseStatus.COMPLETED].includes(caseInfo.status) && <FaClock className="w-4 h-4" />}
                  {getStatusText(caseInfo.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <FaFileAlt className="w-4 h-4" />
                  <span>案件编号: #{Number(caseInfo.caseId)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  <span>事发地点: {caseInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>创建时间: {new Date(Number(caseInfo.complaintTime) * 1000).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="w-4 h-4" />
                  <span className={`font-medium ${
                    caseInfo.riskLevel === RiskLevel.HIGH ? 'text-red-500' :
                    caseInfo.riskLevel === RiskLevel.MEDIUM ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    风险等级: {getRiskLevelText(caseInfo.riskLevel)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-card mb-3">投诉描述</h3>
            <p className="text-gray-600 leading-relaxed">
              {caseInfo.complaintDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 证据材料 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-card mb-4 flex items-center gap-2">
                <FaFileAlt className="w-5 h-5" />
                证据材料 ({evidences.length})
              </h3>
              
              {evidences.length > 0 ? (
                <div className="space-y-4">
                  {evidences.map((evidence, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {evidence.type}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {evidence.fileName}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {evidence.uploadTime && new Date(Number(evidence.uploadTime)).toLocaleString()}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {evidence.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>大小: {evidence.fileSize ? (evidence.fileSize / 1024 / 1024).toFixed(2) + ' MB' : '未知'}</span>
                        <span>哈希: {evidence.hash.substring(0, 20)}...</span>
                        {evidence.ipfsUrl && (
                          <a
                            href={evidence.ipfsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            查看文件
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-8">
                  暂无证据材料
                </p>
              )}
            </div>

            {/* 投票功能 */}
            {caseInfo.status === CaseStatus.VOTING && isUserValidator() && !hasUserVoted() && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-card mb-4 flex items-center gap-2">
                  <FaVoteYea className="w-5 h-5" />
                  参与投票
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      您的投票选择
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="voteChoice"
                          value={VoteChoice.SUPPORT_COMPLAINT}
                          checked={voteChoice === VoteChoice.SUPPORT_COMPLAINT}
                          onChange={(e) => setVoteChoice(parseInt(e.target.value) as VoteChoice)}
                          className="mr-2"
                        />
                        <span>支持投诉 - 认为投诉有理，企业确实存在问题</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="voteChoice"
                          value={VoteChoice.REJECT_COMPLAINT}
                          checked={voteChoice === VoteChoice.REJECT_COMPLAINT}
                          onChange={(e) => setVoteChoice(parseInt(e.target.value) as VoteChoice)}
                          className="mr-2"
                        />
                        <span>反对投诉 - 认为投诉无理，企业没有实质性问题</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      投票理由
                    </label>
                    <textarea
                      value={voteReason}
                      onChange={(e) => setVoteReason(e.target.value)}
                      placeholder="请详细说明您的投票理由..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <button
                    onClick={handleVote}
                    disabled={isVoting || !voteReason.trim()}
                    className="btn btn-primary w-full"
                  >
                    {isVoting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        提交投票中...
                      </div>
                    ) : (
                      '提交投票'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 质疑功能 */}
            {caseInfo.status === CaseStatus.CHALLENGING && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-card mb-4 flex items-center gap-2">
                  <FaExclamationTriangle className="w-5 h-5" />
                  提出质疑
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      选择要质疑的验证者
                    </label>
                    <select
                      value={selectedValidator}
                      onChange={(e) => setSelectedValidator(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">请选择验证者</option>
                      {votingInfo?.validators.map((validator, index) => (
                        <option key={validator} value={validator}>
                          验证者 {index + 1}: {validator.substring(0, 10)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      质疑立场
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="challengeChoice"
                          value={ChallengeChoice.SUPPORT_VALIDATOR}
                          checked={challengeChoice === ChallengeChoice.SUPPORT_VALIDATOR}
                          onChange={(e) => setChallengeChoice(parseInt(e.target.value) as ChallengeChoice)}
                          className="mr-2"
                        />
                        <span>支持验证者的判断</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="challengeChoice"
                          value={ChallengeChoice.OPPOSE_VALIDATOR}
                          checked={challengeChoice === ChallengeChoice.OPPOSE_VALIDATOR}
                          onChange={(e) => setChallengeChoice(parseInt(e.target.value) as ChallengeChoice)}
                          className="mr-2"
                        />
                        <span>反对验证者的判断</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      质疑理由
                    </label>
                    <textarea
                      value={challengeReason}
                      onChange={(e) => setChallengeReason(e.target.value)}
                      placeholder="请详细说明您的质疑理由..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>质疑须知：</strong> 提出质疑需要支付 0.05 ETH 保证金。如果质疑成功，您将获得奖励；如果质疑失败，保证金将被扣除。
                    </p>
                  </div>

                  <button
                    onClick={handleChallenge}
                    disabled={isChallenging || !selectedValidator || !challengeReason.trim()}
                    className="btn btn-primary w-full"
                  >
                    {isChallenging ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        提交质疑中...
                      </div>
                    ) : (
                      '提交质疑 (0.05 ETH)'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 交易状态显示 */}
            {showTransactionStatus && currentTxHash && (
              <div className="card p-6">
                <TransactionStatus
                  txHash={currentTxHash}
                  description={currentTxType === 'vote' ? '提交投票' : '提交质疑'}
                  chainId={chainId}
                  onSuccess={(receipt) => {
                    console.log('交易确认成功:', receipt);
                    
                    if (currentTxType === 'vote') {
                      setIsVoting(false);
                      alert("投票提交成功！");
                    } else if (currentTxType === 'challenge') {
                      setIsChallenging(false);
                      alert("质疑提交成功！");
                    }
                    
                    // 刷新相关查询缓存以更新UI数据
                    queryClient.invalidateQueries({ queryKey: ['caseInfo'] });
                    queryClient.invalidateQueries({ queryKey: ['votingSession'] });
                    queryClient.invalidateQueries({ queryKey: ['challengeSession'] });
                    queryClient.invalidateQueries({ queryKey: ['cases'] });
                    queryClient.invalidateQueries({ queryKey: ['activeCases'] });
                    queryClient.invalidateQueries({ queryKey: ['userStats'] });
                    queryClient.invalidateQueries({ queryKey: ['userCases'] });
                    
                    // 重新加载案件信息
                    loadCaseDetails();
                    
                    // 清理状态
                    setCurrentTxHash(undefined);
                    setCurrentTxType(undefined);
                    setShowTransactionStatus(false);
                  }}
                  onError={(error) => {
                    console.error('交易确认失败:', error);
                    
                    if (currentTxType === 'vote') {
                      setIsVoting(false);
                    } else if (currentTxType === 'challenge') {
                      setIsChallenging(false);
                    }
                    
                    // 清理状态
                    setCurrentTxHash(undefined);
                    setCurrentTxType(undefined);
                    setShowTransactionStatus(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* 右侧：侧边栏信息 */}
          <div className="space-y-6">
            {/* 参与者信息 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-card mb-4">参与者信息</h3>
              
              <div className="space-y-4">
                {/* 投诉者 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FaUser className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900">投诉者</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>姓名:</strong> {complainantProfile.name || '匿名用户'}</p>
                    <p><strong>信誉:</strong> {complainantProfile.reputationScore || 0} 分</p>
                    <p><strong>地址:</strong> {caseInfo.complainant.substring(0, 10)}...</p>
                    <p><strong>保证金:</strong> {Number(caseInfo.complainantDeposit) / 1e18} ETH</p>
                  </div>
                </div>

                {/* 被投诉企业 */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FaBuilding className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-gray-900">被投诉企业</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>企业:</strong> {enterpriseProfile.name || '未知企业'}</p>
                    <p><strong>信誉:</strong> {enterpriseProfile.reputationScore || 0} 分</p>
                    <p><strong>地址:</strong> {caseInfo.enterprise.substring(0, 10)}...</p>
                    <p><strong>保证金:</strong> {Number(caseInfo.enterpriseDeposit) / 1e18} ETH</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 投票进度 */}
            {votingInfo && caseInfo.status === CaseStatus.VOTING && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-card mb-4 flex items-center gap-2">
                  <FaGavel className="w-5 h-5" />
                  投票进度
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Number(votingInfo.supportVotes)}
                      </div>
                      <div className="text-gray-500">支持投诉</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {Number(votingInfo.rejectVotes)}
                      </div>
                      <div className="text-gray-500">反对投诉</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>验证者总数:</span>
                      <span>{Number(votingInfo.totalValidators)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>已投票:</span>
                      <span>{Number(votingInfo.votedValidators)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>投票截止:</span>
                      <span>{new Date(Number(votingInfo.deadline) * 1000).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(Number(votingInfo.votedValidators) / Number(votingInfo.totalValidators)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* 时间线 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-card mb-4 flex items-center gap-2">
                <FaClock className="w-5 h-5" />
                案件时间线
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">投诉创建</div>
                    <div className="text-gray-500">
                      {new Date(Number(caseInfo.complaintTime) * 1000).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {caseInfo.status >= CaseStatus.VOTING && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">进入投票阶段</div>
                      <div className="text-gray-500">验证者开始投票</div>
                    </div>
                  </div>
                )}
                
                {caseInfo.status >= CaseStatus.CHALLENGING && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">进入质疑阶段</div>
                      <div className="text-gray-500">允许对投票结果提出质疑</div>
                    </div>
                  </div>
                )}
                
                {caseInfo.status === CaseStatus.COMPLETED && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">案件完成</div>
                      <div className="text-gray-500">
                        {new Date(Number(caseInfo.completionTime) * 1000).toLocaleString()}
                      </div>
                      <div className={`mt-1 font-medium ${caseInfo.complaintUpheld ? 'text-green-600' : 'text-red-600'}`}>
                        最终结果: {caseInfo.complaintUpheld ? '投诉成立' : '投诉不成立'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 