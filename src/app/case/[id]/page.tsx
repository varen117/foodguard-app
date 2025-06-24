/**
 * 案件详情页面
 */
"use client"

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAccount, useChainId, useReadContract, useWriteContract } from "wagmi";
import { 
  FaGavel, 
  FaUsers, 
  FaChartLine, 
  FaThumbsUp, 
  FaThumbsDown,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
  FaFileAlt,
  FaExclamationTriangle
} from "react-icons/fa";
import { InputField } from "@/components/ui/InputField";
import { 
  chainsToFoodGuard, 
  foodSafetyGovernanceAbi, 
  votingManagerAbi,
  disputeManagerAbi,
  CaseStatus, 
  RiskLevel, 
  VoteChoice,
  ChallengeChoice 
} from "@/constants";

export default function CaseDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  const caseId = Number(params.id);
  const [activeTab, setActiveTab] = useState<'details' | 'vote' | 'challenge'>('details');
  const [voteChoice, setVoteChoice] = useState<VoteChoice>(VoteChoice.SUPPORT_COMPLAINT);
  const [voteReason, setVoteReason] = useState("");
  const [challengeChoice, setChallengeChoice] = useState<ChallengeChoice>(ChallengeChoice.OPPOSE_VALIDATOR);
  const [challengeReason, setChallengeReason] = useState("");
  const [targetValidator, setTargetValidator] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;
  const votingManagerAddress = chainsToFoodGuard[chainId]?.votingManager;
  const disputeManagerAddress = chainsToFoodGuard[chainId]?.disputeManager;

  const { writeContractAsync } = useWriteContract();

  // 获取案件信息 (模拟数据)
  const mockCaseInfo = {
    caseId: BigInt(caseId),
    complainant: "0x1111111111111111111111111111111111111111",
    enterprise: "0x2222222222222222222222222222222222222222",
    complaintTitle: `案件 #${caseId} - 食品安全投诉`,
    complaintDescription: "这是一个关于食品安全的详细投诉描述，包含了事件的完整经过和相关证据...",
    location: "北京市朝阳区某餐厅",
    incidentTime: BigInt(Date.now() - 86400000),
    complaintTime: BigInt(Date.now() - 43200000),
    status: CaseStatus.VOTING,
    riskLevel: RiskLevel.MEDIUM,
    complaintUpheld: false,
    complainantDeposit: BigInt("1000000000000000000"),
    enterpriseDeposit: BigInt("2000000000000000000"),
    isCompleted: false,
    completionTime: 0n,
  };

  // 投票信息 (模拟数据)
  const mockVotingInfo = {
    isActive: true,
    validators: ["0x3333333333333333333333333333333333333333", "0x4444444444444444444444444444444444444444"],
    deadline: BigInt(Date.now() + 86400000),
    supportVotes: BigInt(2),
    rejectVotes: BigInt(1),
    totalValidators: BigInt(5),
    votedValidators: BigInt(3),
    minValidators: BigInt(3),
    isCompleted: false,
    result: false,
  };

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'participate') {
      if (mockCaseInfo.status === CaseStatus.VOTING) {
        setActiveTab('vote');
      } else if (mockCaseInfo.status === CaseStatus.CHALLENGING) {
        setActiveTab('challenge');
      }
    }
  }, [searchParams, mockCaseInfo.status]);

  const handleVote = async () => {
    if (!isConnected || !votingManagerAddress) {
      alert("请先连接钱包");
      return;
    }

    if (!voteReason.trim()) {
      alert("请输入投票理由");
      return;
    }

    try {
      setIsSubmitting(true);
      
      await writeContractAsync({
        abi: votingManagerAbi,
        address: votingManagerAddress as `0x${string}`,
        functionName: 'submitVote',
        args: [
          BigInt(caseId),
          voteChoice,
          voteReason,
          [], // evidenceHashes
          [], // evidenceTypes  
          [], // evidenceDescriptions
        ],
      });

      alert("投票提交成功！");
      setVoteReason("");
    } catch (error) {
      console.error('投票失败:', error);
      alert('投票失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChallenge = async () => {
    if (!isConnected || !disputeManagerAddress) {
      alert("请先连接钱包");
      return;
    }

    if (!challengeReason.trim()) {
      alert("请输入质疑理由");
      return;
    }

    if (!targetValidator) {
      alert("请选择要质疑的验证者");
      return;
    }

    try {
      setIsSubmitting(true);
      
      await writeContractAsync({
        abi: disputeManagerAbi,
        address: disputeManagerAddress as `0x${string}`,
        functionName: 'submitChallenge',
        args: [
          BigInt(caseId),
          targetValidator as `0x${string}`,
          challengeChoice,
          challengeReason,
          [], // evidenceHashes
          [], // evidenceTypes
          [], // evidenceDescriptions
        ],
        value: BigInt("100000000000000000"), // 0.1 ETH 质疑保证金
      });

      alert("质疑提交成功！");
      setChallengeReason("");
    } catch (error) {
      console.error('质疑失败:', error);
      alert('质疑失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.VOTING:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case CaseStatus.CHALLENGING:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case CaseStatus.COMPLETED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const getStatusText = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.VOTING: return "投票中";
      case CaseStatus.CHALLENGING: return "质疑中";
      case CaseStatus.COMPLETED: return "已完成";
      default: return "处理中";
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <FaShieldAlt className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            请连接钱包
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            您需要连接钱包才能查看案件详情
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 案件基本信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {mockCaseInfo.complaintTitle}
                </h1>
                <p className="text-emerald-100 mt-2">
                  案件ID: #{caseId}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(mockCaseInfo.status)}`}>
                {getStatusText(mockCaseInfo.status)}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    案件详情
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        事发地点: {mockCaseInfo.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        事发时间: {new Date(Number(mockCaseInfo.incidentTime) * 1000).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaFileAlt className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        投诉时间: {new Date(Number(mockCaseInfo.complaintTime) * 1000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    投诉描述
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {mockCaseInfo.complaintDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    保证金信息
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">投诉者保证金</p>
                      <p className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                        {Number(mockCaseInfo.complainantDeposit) / 1e18} ETH
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">企业保证金</p>
                      <p className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                        {Number(mockCaseInfo.enterpriseDeposit) / 1e18} ETH
                      </p>
                    </div>
                  </div>
                </div>

                {mockCaseInfo.status === CaseStatus.VOTING && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      投票进度
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">支持投诉</span>
                        <span className="text-sm font-medium text-green-600">
                          {Number(mockVotingInfo.supportVotes)} 票
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">反对投诉</span>
                        <span className="text-sm font-medium text-red-600">
                          {Number(mockVotingInfo.rejectVotes)} 票
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">投票进度</span>
                        <span className="text-sm font-medium">
                          {Number(mockVotingInfo.votedValidators)}/{Number(mockVotingInfo.totalValidators)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 操作选项卡 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'details'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaFileAlt className="inline w-4 h-4 mr-2" />
                详细信息
              </button>
              {mockCaseInfo.status === CaseStatus.VOTING && (
                <button
                  onClick={() => setActiveTab('vote')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'vote'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaUsers className="inline w-4 h-4 mr-2" />
                  参与投票
                </button>
              )}
              {mockCaseInfo.status === CaseStatus.CHALLENGING && (
                <button
                  onClick={() => setActiveTab('challenge')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'challenge'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FaChartLine className="inline w-4 h-4 mr-2" />
                  提出质疑
                </button>
              )}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  完整案件信息
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">投诉者地址</label>
                      <p className="text-gray-900 dark:text-white font-mono">{mockCaseInfo.complainant}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">企业地址</label>
                      <p className="text-gray-900 dark:text-white font-mono">{mockCaseInfo.enterprise}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">风险等级</label>
                      <p className="text-gray-900 dark:text-white">
                        {mockCaseInfo.riskLevel === RiskLevel.HIGH ? '高风险' : 
                         mockCaseInfo.riskLevel === RiskLevel.MEDIUM ? '中风险' : '低风险'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">当前状态</label>
                      <p className="text-gray-900 dark:text-white">{getStatusText(mockCaseInfo.status)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vote' && mockCaseInfo.status === CaseStatus.VOTING && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  提交投票
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      投票选择
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setVoteChoice(VoteChoice.SUPPORT_COMPLAINT)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          voteChoice === VoteChoice.SUPPORT_COMPLAINT
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                        }`}
                      >
                        <FaThumbsUp className={`w-6 h-6 mx-auto mb-2 ${
                          voteChoice === VoteChoice.SUPPORT_COMPLAINT ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <p className="text-sm font-medium">支持投诉</p>
                        <p className="text-xs text-gray-500">认为企业有问题</p>
                      </button>
                      
                      <button
                        onClick={() => setVoteChoice(VoteChoice.REJECT_COMPLAINT)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          voteChoice === VoteChoice.REJECT_COMPLAINT
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-red-300'
                        }`}
                      >
                        <FaThumbsDown className={`w-6 h-6 mx-auto mb-2 ${
                          voteChoice === VoteChoice.REJECT_COMPLAINT ? 'text-red-600' : 'text-gray-400'
                        }`} />
                        <p className="text-sm font-medium">反对投诉</p>
                        <p className="text-xs text-gray-500">认为企业无问题</p>
                      </button>
                    </div>
                  </div>

                  <InputField
                    label="投票理由"
                    value={voteReason}
                    onChange={(e) => setVoteReason(e.target.value)}
                    placeholder="请详细说明您的投票理由..."
                    large={true}
                    rows={4}
                    required
                  />

                  <button
                    onClick={handleVote}
                    disabled={isSubmitting || !voteReason.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "提交中..." : "提交投票"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'challenge' && mockCaseInfo.status === CaseStatus.CHALLENGING && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  提出质疑
                </h3>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                        质疑须知
                      </h4>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        提出质疑需要支付保证金，如果质疑失败将被扣除。请谨慎操作。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      选择要质疑的验证者
                    </label>
                    <select
                      value={targetValidator}
                      onChange={(e) => setTargetValidator(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">请选择验证者...</option>
                      {mockVotingInfo.validators.map((validator, index) => (
                        <option key={validator} value={validator}>
                          验证者 #{index + 1}: {validator}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      质疑类型
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setChallengeChoice(ChallengeChoice.OPPOSE_VALIDATOR)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          challengeChoice === ChallengeChoice.OPPOSE_VALIDATOR
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-red-300'
                        }`}
                      >
                        <p className="text-sm font-medium">反对验证者</p>
                        <p className="text-xs text-gray-500">认为验证者判断错误</p>
                      </button>
                      
                      <button
                        onClick={() => setChallengeChoice(ChallengeChoice.SUPPORT_VALIDATOR)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          challengeChoice === ChallengeChoice.SUPPORT_VALIDATOR
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                        }`}
                      >
                        <p className="text-sm font-medium">支持验证者</p>
                        <p className="text-xs text-gray-500">认为验证者判断正确</p>
                      </button>
                    </div>
                  </div>

                  <InputField
                    label="质疑理由"
                    value={challengeReason}
                    onChange={(e) => setChallengeReason(e.target.value)}
                    placeholder="请详细说明您的质疑理由..."
                    large={true}
                    rows={4}
                    required
                  />

                  <button
                    onClick={handleChallenge}
                    disabled={isSubmitting || !challengeReason.trim() || !targetValidator}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "提交中..." : "提交质疑 (0.1 ETH)"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 