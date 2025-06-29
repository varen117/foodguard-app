/**
 * 用户个人资料页面
 */
"use client"

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
import { formatEther } from "viem";
import { 
  FaUser, FaEdit, FaSave, FaTimes, FaShieldAlt, FaGavel, 
  FaEthereum, FaHistory, FaTrophy, FaExclamationTriangle,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
  FaChartLine, FaAward, FaUsers, FaBell, FaPlus, FaMinus
} from "react-icons/fa";
import { 
  useUserRegistration, 
  useUserDeposit,
  useDepositFunds,
  useWithdrawFunds,
  useConfirmTransactionAndRefreshData,
  useForceRefreshData
} from "@/hooks/useContractInteraction";
import TransactionStatus from "@/components/TransactionStatus";
import ForceRefreshButton from "@/components/ForceRefreshButton";
import { useUserStats, useUserCases } from '@/hooks/useDatabase';
import { 
  CaseInfo,
  CaseStatus,
  RiskLevel 
} from "@/constants";
import { Toaster, toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface UserProfile {
  // 数据库字段 - 用户基本信息表 (users)
  name?: string;                    // 用户姓名
  email?: string;                   // 邮箱地址
  phone?: string;                   // 电话号码
  address?: string;                 // 详细地址
  avatar?: string;                  // 头像URL
  bio?: string;                     // 个人简介
  website?: string;                 // 个人网站
  registrationTime?: bigint;        // 注册时间
  lastLoginTime?: bigint;           // 最后登录时间
  isVerified?: boolean;             // 是否已验证身份
  
  // 数据库字段 - 用户统计表 (user_stats)
  totalCasesParticipated?: number;  // 参与案件总数
  totalVotes?: number;              // 总投票次数
  totalChallenges?: number;         // 总质疑次数
  successfulVotes?: number;         // 成功投票次数
  successfulChallenges?: number;    // 成功质疑次数
  averageResponseTime?: number;     // 平均响应时间(小时)
  
  // 合约字段 - 从链上获取的数据
  userRole?: string;                // 用户角色 (COMPLAINANT/ENTERPRISE/DAO_MEMBER)
  reputationScore?: number;         // 信誉分数
  isActive?: boolean;               // 账户是否激活
}

interface ParticipatedCase extends CaseInfo {
  // 数据库字段 - 用户参与案件的额外信息
  participationType?: 'complainant' | 'enterprise' | 'validator' | 'challenger'; // 参与类型
  participationTime?: bigint;       // 参与时间
  earnedReward?: bigint;           // 获得奖励
  paidPenalty?: bigint;            // 支付惩罚
  voteChoice?: number;             // 投票选择 (如果是验证者)
  challengeChoice?: number;        // 质疑选择 (如果是质疑者)
}

interface ActivityRecord {
  // 数据库字段 - 用户活动记录表 (user_activities)
  id: number;                      // 活动ID
  activityType: string;            // 活动类型 (vote, challenge, complaint, etc.)
  description: string;             // 活动描述
  caseId?: number;                 // 相关案件ID
  timestamp: bigint;               // 活动时间
  result?: string;                 // 活动结果
  rewardAmount?: bigint;           // 奖励金额
  penaltyAmount?: bigint;          // 惩罚金额
}

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  
  const [profile, setProfile] = useState<UserProfile>({});
  const [participatedCases, setParticipatedCases] = useState<ParticipatedCase[]>([]);
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'activities' | 'settings'>('overview');
  
  // 保证金操作相关状态
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transactionStep, setTransactionStep] = useState<'idle' | 'submitting' | 'waiting'>('idle');
  const [currentTransactionHash, setCurrentTransactionHash] = useState<`0x${string}` | undefined>();
  const [currentOperationType, setCurrentOperationType] = useState<'deposit' | 'withdraw' | undefined>();
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);

  // 合约接口 - 获取用户注册状态和信息
  const { isRegistered: isUserRegistered, userInfo } = useUserRegistration();
  
  // 合约接口 - 获取用户保证金状态
  const { availableDeposit, depositStatus } = useUserDeposit();
  
  // 合约接口 - 保证金操作
  const { mutate: depositFunds, isPending: isDepositing } = useDepositFunds();
  const { mutate: withdrawFunds, isPending: isWithdrawing } = useWithdrawFunds();
  
  // 交易确认和数据刷新
  const { mutate: confirmTransactionAndRefresh } = useConfirmTransactionAndRefreshData();

  // 数据库查询 - 获取用户统计信息
  const { data: userStatsData, isLoading: isStatsLoading } = useUserStats(address);
  const { data: userCasesData, isLoading: isCasesLoading } = useUserCases(address);

  // 等待交易确认
  const { data: transactionReceipt, isSuccess: isTransactionSuccess, isError: isTransactionError } = useWaitForTransactionReceipt({
    hash: currentTransactionHash,
    query: {
      enabled: !!currentTransactionHash,
      // 禁用自动代币检测以避免调用symbol()和decimals()
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      structuralSharing: false,
    }
  });



  // 处理交易确认结果
  useEffect(() => {
    if (isTransactionSuccess && transactionStep === 'waiting') {
      setTransactionStep('idle');
      
      if (currentOperationType === 'deposit') {
        setShowDepositModal(false);
        setDepositAmount("");
        toast.success("🎉 保证金存入成功！", { duration: 5000 });
      } else if (currentOperationType === 'withdraw') {
        setShowWithdrawModal(false);
        setWithdrawAmount("");
        toast.success("🎉 保证金提取成功！", { duration: 5000 });
      }
      
      // 刷新相关查询缓存以更新UI数据
      queryClient.invalidateQueries({ queryKey: ['userDeposit'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['userCases'] });
      
      setCurrentTransactionHash(undefined);
      setCurrentOperationType(undefined);
    }
  }, [isTransactionSuccess, transactionStep, currentOperationType, queryClient]);

  // 处理交易失败
  useEffect(() => {
    if (isTransactionError && transactionStep === 'waiting') {
      setTransactionStep('idle');
      toast.error("交易确认失败，请重试");
      setCurrentTransactionHash(undefined);
      setCurrentOperationType(undefined);
    }
  }, [isTransactionError, transactionStep]);

  // 处理存入保证金
  const handleDeposit = async () => {
    if (!depositAmount) {
      toast.error("请输入存入金额");
      return;
    }

    console.log('开始存入保证金:', { depositAmount });
    setTransactionStep('submitting');
    setCurrentOperationType('deposit');

    depositFunds({ amount: depositAmount }, {
      onSuccess: (hash) => {
        console.log('存入保证金交易提交成功，hash:', hash);
        console.log('hash类型:', typeof hash, 'hash长度:', hash?.length);
        
        setTransactionStep('waiting');
        setCurrentTransactionHash(hash);
        setShowTransactionStatus(true);
        toast.success("存入交易已提交，正在等待区块链确认...", { duration: 3000 });
      },
      onError: (error) => {
        console.error('存入保证金失败:', error);
        setTransactionStep('idle');
        setCurrentOperationType(undefined);
        setShowTransactionStatus(false);
        toast.error(`存入失败: ${error.message}`);
      }
    });
  };

  // 处理提取保证金
  const handleWithdraw = async () => {
    if (!withdrawAmount) {
      toast.error("请输入提取金额");
      return;
    }

    setTransactionStep('submitting');
    setCurrentOperationType('withdraw');

    withdrawFunds({ amount: withdrawAmount }, {
      onSuccess: (hash) => {
        setTransactionStep('waiting');
        setCurrentTransactionHash(hash);
        setShowTransactionStatus(true);
        toast.success("提取交易已提交，正在等待区块链确认...", { duration: 3000 });
      },
      onError: () => {
        setTransactionStep('idle');
        setCurrentOperationType(undefined);
        setShowTransactionStatus(false);
      }
    });
  };

  // 数据加载 useEffect - 避免无限循环
  useEffect(() => {
    if (!isConnected || !address || !isUserRegistered || !userStatsData || !userCasesData) return;

    const loadUserProfile = async () => {
      try {
        setLoading(true);

        // 数据库查询 - 获取用户基本信息和统计数据
        const realStats = userStatsData.success ? userStatsData.data.stats : null;
        const registration = userStatsData.success ? userStatsData.data.registration : null;
        const realCases = userCasesData.success ? userCasesData.data : null;

        const profile: UserProfile = {
          // 基本信息 (现在使用默认值，后续可以从数据库获取)
          name: "用户",
          email: "",
          phone: "",
          address: "",
          avatar: "",
          bio: "区块链食品安全治理系统用户",
          website: "",
          registrationTime: registration ? BigInt(registration.timestamp) * BigInt(1000) : BigInt(Date.now()),
          lastLoginTime: BigInt(Date.now()),
          isVerified: true,
          
          // 数据库查询 - 真实的用户统计信息
          totalCasesParticipated: realStats?.totalComplaints || 0,
          totalVotes: realStats?.totalVotes || 0,
          totalChallenges: 0, // 暂时没有质疑数据
          successfulVotes: realStats?.totalVotes || 0, // 简化处理
          successfulChallenges: 0,
          averageResponseTime: 0,
          
          // 合约查询 - 获取链上数据
          userRole: userInfo?.role === 2 ? "DAO_MEMBER" : userInfo?.role === 1 ? "ENTERPRISE" : "COMPLAINANT",
          reputationScore: Number(userInfo?.reputation || 0),
          isActive: userInfo?.isActive || false,
        };

        setProfile(profile);
        setEditForm(profile);

        // 数据库查询 - 获取用户参与的案件 (基于真实数据)
        const participatedCases: ParticipatedCase[] = [];
        
        // 转换投诉记录
        if (realCases?.complaints) {
          realCases.complaints.forEach((complaint: any) => {
            participatedCases.push({
              caseId: BigInt(complaint.case_id || 0),
              complainant: complaint.complainant,
              enterprise: complaint.enterprise,
              complaintTitle: complaint.complaint_title || "食品安全投诉",
              complaintDescription: "",
              location: "未知",
              incidentTime: BigInt((complaint.timestamp || 0) * 1000),
              complaintTime: BigInt((complaint.timestamp || 0) * 1000),
              status: CaseStatus.PENDING, // 需要根据case_status_updated表查询
              riskLevel: complaint.risk_level || RiskLevel.LOW,
              complaintUpheld: false,
              complainantDeposit: BigInt("0"),
              enterpriseDeposit: BigInt("0"),
              isCompleted: false,
              completionTime: BigInt(0),
              complainantEvidenceHash: "",
              
              participationType: 'complainant',
              participationTime: BigInt((complaint.timestamp || 0) * 1000),
              earnedReward: BigInt("0"),
              paidPenalty: BigInt("0"),
            });
          });
        }
        
        setParticipatedCases(participatedCases);

        // 数据库查询 - 获取用户活动记录 (基于真实数据)
        const activities: ActivityRecord[] = [];
        
        // 添加保证金记录
        if (realCases?.deposits) {
          realCases.deposits.forEach((deposit: any, index: number) => {
            activities.push({
              id: index + 1,
              activityType: 'deposit',
              description: `存入保证金 ${formatEther(BigInt(deposit.amount))} ETH`,
              timestamp: BigInt((deposit.timestamp || 0) * 1000),
              result: 'success',
              rewardAmount: BigInt("0"),
              penaltyAmount: BigInt("0")
            });
          });
        }
        
        // 添加投票记录
        if (realCases?.votes) {
          realCases.votes.forEach((vote: any, index: number) => {
            activities.push({
              id: activities.length + 1,
              activityType: 'vote',
              description: `在案件 #${vote.case_id || 'unknown'} 中进行投票`,
              caseId: parseInt(vote.case_id) || 0,
              timestamp: BigInt((vote.timestamp || 0) * 1000),
              result: 'success',
              rewardAmount: BigInt("0"),
              penaltyAmount: BigInt("0")
            });
          });
        }
        
        // 添加奖励记录
        if (realCases?.rewards) {
          realCases.rewards.forEach((reward: any, index: number) => {
            activities.push({
              id: activities.length + 1,
              activityType: 'reward',
              description: `获得奖励 ${formatEther(BigInt(reward.amount || 0))} ETH`,
              timestamp: BigInt((reward.timestamp || 0) * 1000),
              result: 'success',
              rewardAmount: BigInt(reward.amount || 0),
              penaltyAmount: BigInt("0")
            });
          });
        }
        
        // 按时间排序
        activities.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
        setActivities(activities);

      } catch (error) {
        console.error('加载用户资料失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [isConnected, address, isUserRegistered, userStatsData?.success, userCasesData?.success, userInfo?.role, userInfo?.isActive]);



  const handleSaveProfile = async () => {
    if (!address) return;

    try {
      // 数据库操作 - 更新用户资料
      setProfile({ ...profile, ...editForm });
      setEditing(false);
      toast.success('资料更新成功！');
    } catch (error) {
      console.error('更新资料失败:', error);
      toast.error('更新资料失败，请重试');
    }
  };

  const getParticipationTypeText = (type?: string) => {
    switch (type) {
      case 'complainant': return '投诉者';
      case 'enterprise': return '被投诉企业';
      case 'validator': return '验证者';
      case 'challenger': return '质疑者';
      default: return '未知';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vote': return <FaGavel className="w-4 h-4 text-blue-600" />;
      case 'challenge': return <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />;
      case 'complaint': return <FaShieldAlt className="w-4 h-4 text-red-600" />;
      default: return <FaHistory className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!isConnected) {
    return (
      <div className="main-container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-8">
            <FaUser className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-card mb-4">
              请连接钱包
            </h2>
            <p className="text-muted">
              您需要连接钱包才能查看个人资料
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isUserRegistered) {
    return (
      <div className="main-container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card p-8">
            <FaExclamationTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-card mb-4">
              用户未注册
            </h2>
            <p className="text-muted mb-6">
              您需要先注册才能使用个人资料功能
            </p>
            <Link href="/register" className="btn btn-primary">
              前往注册
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || isStatsLoading || isCasesLoading) {
    return (
      <div className="main-container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted mt-4">加载用户资料中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="icon-container">
              <FaUser className="w-8 h-8 text-white" />
            </div>
            <span className="gradient-text">个人资料</span>
          </h1>
          <p className="text-muted">
            管理您的个人信息和查看参与记录
          </p>
        </div>

        {/* 用户头部卡片 */}
        <div className="card p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                {profile.avatar && profile.avatar !== '/default-avatar.png' ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <FaUser className="w-10 h-10 text-white" />
                )}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-card">
                    {profile.name || '未设置姓名'}
                  </h2>
                  {profile.isVerified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <FaShieldAlt className="w-3 h-3" />
                      已验证
                    </div>
                  )}
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {profile.userRole === 'DAO_MEMBER' ? 'DAO成员' : 
                     profile.userRole === 'ENTERPRISE' ? '企业用户' : '普通用户'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">
                  {profile.bio || '暂无个人简介'}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>注册于 {profile.registrationTime ? new Date(Number(profile.registrationTime)).toLocaleDateString() : '未知'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTrophy className="w-4 h-4" />
                    <span>信誉分数: {profile.reputationScore || 0}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => editing ? handleSaveProfile() : setEditing(true)}
              className="btn btn-primary btn-sm"
            >
              {editing ? (
                <>
                  <FaSave className="w-4 h-4 mr-2" />
                  保存资料
                </>
              ) : (
                <>
                  <FaEdit className="w-4 h-4 mr-2" />
                  编辑资料
                </>
              )}
            </button>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="card mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: '概览', icon: FaChartLine },
                { key: 'cases', label: '参与案件', icon: FaGavel },
                { key: 'activities', label: '活动记录', icon: FaHistory },
                { key: 'settings', label: '设置', icon: FaBell }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 标签页内容 */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* 统计概览 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="stat-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted mb-1">创建投诉</p>
                      <p className="text-2xl font-bold text-white">{userStatsData?.data?.stats?.totalComplaints || 0}</p>
                    </div>
                    <div className="icon-container">
                      <FaGavel className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="stat-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted mb-1">投票次数</p>
                      <p className="text-2xl font-bold text-white">{userStatsData?.data?.stats?.totalVotes || 0}</p>
                    </div>
                    <div className="icon-container">
                      <FaUsers className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="stat-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted mb-1">保证金次数</p>
                      <p className="text-2xl font-bold text-white">{userStatsData?.data?.stats?.totalDeposits || 0}</p>
                    </div>
                    <div className="icon-container">
                      <FaAward className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="stat-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted mb-1">可用保证金</p>
                      <p className="text-2xl font-bold text-white">
                        {formatEther(availableDeposit)} ETH
                      </p>
                    </div>
                    <div className="icon-container">
                      <FaEthereum className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 保证金详情 */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-card flex items-center gap-2">
                    <FaEthereum className="w-5 h-5" />
                    保证金状态
                  </h3>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDepositModal(true)}
                      className="btn btn-primary btn-sm"
                    >
                      <FaPlus className="w-4 h-4 mr-2" />
                      存入保证金
                    </button>
                    <button
                      onClick={() => setShowWithdrawModal(true)}
                      className="btn btn-primary btn-sm"
                      disabled={availableDeposit === 0n}
                    >
                      <FaMinus className="w-4 h-4 mr-2" />
                      提取保证金
                    </button>
                    <ForceRefreshButton
                      type="deposit"
                      description="保证金数据"
                      className="btn btn-outline btn-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {depositStatus ? formatEther(depositStatus.totalDeposit) : '0'} ETH
                    </div>
                    <div className="text-sm text-gray-500">总保证金</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      {depositStatus ? formatEther(depositStatus.frozenAmount) : '0'} ETH
                    </div>
                    <div className="text-sm text-gray-500">冻结保证金</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {formatEther(availableDeposit)} ETH
                    </div>
                    <div className="text-sm text-gray-500">可用保证金</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>可用比例</span>
                    <span>
                      {depositStatus && depositStatus.totalDeposit > 0n
                        ? Math.round(Number(availableDeposit * 100n / depositStatus.totalDeposit))
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${depositStatus && depositStatus.totalDeposit > 0n
                          ? Math.round(Number(availableDeposit * 100n / depositStatus.totalDeposit))
                          : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* 交易状态显示 */}
                {showTransactionStatus && currentTransactionHash && (
                  <div className="mt-6">
                    <TransactionStatus
                      txHash={currentTransactionHash}
                      description={currentOperationType === 'deposit' ? '存入保证金' : '提取保证金'}
                      chainId={chainId}
                      onSuccess={(receipt) => {
                        console.log('保证金操作确认成功:', receipt);
                        
                        // 使用新的确认和数据刷新逻辑
                        if (currentTransactionHash && currentOperationType) {
                          const operationText = currentOperationType === 'deposit' ? '存入保证金' : '提取保证金';
                          
                          confirmTransactionAndRefresh({
                            hash: currentTransactionHash,
                            description: operationText,
                            type: currentOperationType
                          }, {
                            onSuccess: () => {
                              console.log(`${operationText}操作完成，数据已更新`);
                              
                              // 清理UI状态
                              if (currentOperationType === 'deposit') {
                                setShowDepositModal(false);
                                setDepositAmount("");
                              } else if (currentOperationType === 'withdraw') {
                                setShowWithdrawModal(false);
                                setWithdrawAmount("");
                              }
                              
                              setTransactionStep('idle');
                              setCurrentTransactionHash(undefined);
                              setCurrentOperationType(undefined);
                              setShowTransactionStatus(false);
                            },
                            onError: (error) => {
                              console.error('数据刷新失败:', error);
                              // 即使数据刷新失败，也要清理UI状态
                              setTransactionStep('idle');
                              setCurrentTransactionHash(undefined);
                              setCurrentOperationType(undefined);
                              setShowTransactionStatus(false);
                            }
                          });
                        }
                      }}
                      onError={(error) => {
                        console.error('保证金操作确认失败:', error);
                        setTransactionStep('idle');
                        setCurrentTransactionHash(undefined);
                        setCurrentOperationType(undefined);
                        setShowTransactionStatus(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'cases' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-card mb-4">参与的案件</h3>
              
              {participatedCases.length > 0 ? (
                <div className="space-y-4">
                  {participatedCases.map((caseInfo) => (
                    <div key={Number(caseInfo.caseId)} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {caseInfo.complaintTitle}
                            </h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              {getParticipationTypeText(caseInfo.participationType)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {caseInfo.complaintDescription}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>案件 #{Number(caseInfo.caseId)}</span>
                            <span>参与时间: {caseInfo.participationTime ? new Date(Number(caseInfo.participationTime)).toLocaleDateString() : '未知'}</span>
                            {caseInfo.earnedReward && Number(caseInfo.earnedReward) > 0 && (
                              <span className="text-green-600">
                                奖励: {Number(caseInfo.earnedReward) / 1e18} ETH
                              </span>
                            )}
                            {caseInfo.paidPenalty && Number(caseInfo.paidPenalty) > 0 && (
                              <span className="text-red-600">
                                惩罚: {Number(caseInfo.paidPenalty) / 1e18} ETH
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <Link
                          href={`/case/${Number(caseInfo.caseId)}`}
                          className="btn btn-secondary btn-sm"
                        >
                          查看详情
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  暂未参与任何案件
                </p>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-card mb-4">活动记录</h3>
              
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.activityType)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">
                            {activity.description}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(Number(activity.timestamp)).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          {activity.caseId && (
                            <Link
                              href={`/case/${activity.caseId}`}
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              案件 #{activity.caseId}
                            </Link>
                          )}
                          
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.result === 'success' 
                              ? 'bg-green-100 text-green-800'
                              : activity.result === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.result === 'success' ? '成功' : 
                             activity.result === 'failed' ? '失败' : '处理中'}
                          </span>
                          
                          {activity.rewardAmount && Number(activity.rewardAmount) > 0 && (
                            <span className="text-green-600 text-xs">
                              +{Number(activity.rewardAmount) / 1e18} ETH
                            </span>
                          )}
                          
                          {activity.penaltyAmount && Number(activity.penaltyAmount) > 0 && (
                            <span className="text-red-600 text-xs">
                              -{Number(activity.penaltyAmount) / 1e18} ETH
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  暂无活动记录
                </p>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
              <div className="space-y-6">
              {/* 基本信息编辑 */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-card mb-4">基本信息</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="w-4 h-4 inline mr-1" />
                      姓名
                    </label>
                    <input
                      type="text"
                      value={editing ? editForm.name || '' : profile.name || ''}
                      onChange={(e) => editing && setEditForm({ ...editForm, name: e.target.value })}
                      disabled={!editing}
                      placeholder="请输入您的姓名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="w-4 h-4 inline mr-1" />
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={editing ? editForm.email || '' : profile.email || ''}
                      onChange={(e) => editing && setEditForm({ ...editForm, email: e.target.value })}
                      disabled={!editing}
                      placeholder="请输入您的邮箱"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="w-4 h-4 inline mr-1" />
                      电话
                    </label>
                    <input
                      type="tel"
                      value={editing ? editForm.phone || '' : profile.phone || ''}
                      onChange={(e) => editing && setEditForm({ ...editForm, phone: e.target.value })}
                      disabled={!editing}
                      placeholder="请输入您的电话号码"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 text-gray-900"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="w-4 h-4 inline mr-1" />
                    地址
                  </label>
                  <input
                    type="text"
                    value={editing ? editForm.address || '' : profile.address || ''}
                    onChange={(e) => editing && setEditForm({ ...editForm, address: e.target.value })}
                    disabled={!editing}
                    placeholder="请输入您的地址"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 text-gray-900"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    个人简介
                  </label>
                  <textarea
                    value={editing ? editForm.bio || '' : profile.bio || ''}
                    onChange={(e) => editing && setEditForm({ ...editForm, bio: e.target.value })}
                    disabled={!editing}
                    placeholder="请输入您的个人简介"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 text-gray-900"
                  />
                </div>

                {editing && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="btn btn-primary"
                    >
                      <FaSave className="w-4 h-4 mr-2" />
                      保存更改
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditForm(profile);
                      }}
                      className="btn btn-outline"
                    >
                      <FaTimes className="w-4 h-4 mr-2" />
                      取消
                    </button>
                  </div>
                )}
              </div>

              {/* 钱包信息 */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-card mb-4">钱包信息</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">钱包地址</p>
                      <p className="text-sm text-gray-600 font-mono">{address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">链ID</p>
                      <p className="font-medium">{chainId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 存入保证金模态框 */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                存入保证金
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  金额 (ETH)
                </label>
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="请输入存入金额"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleDeposit}
                  disabled={transactionStep !== 'idle' || !depositAmount}
                  className="btn btn-primary flex-1"
                >
                  {transactionStep === 'submitting' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      提交中...
                    </div>
                  ) : transactionStep === 'waiting' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      等待确认...
                    </div>
                  ) : (
                    '确认存入'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowDepositModal(false);
                    setDepositAmount("");
                    setTransactionStep('idle');
                  }}
                  disabled={transactionStep !== 'idle'}
                  className="btn btn-outline flex-1"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 提取保证金模态框 */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                提取保证金
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>可用保证金:</span>
                  <span>{formatEther(availableDeposit)} ETH</span>
                </div>
                
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  金额 (ETH)
                </label>
                <input
                  type="text"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="请输入提取金额"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleWithdraw}
                  disabled={transactionStep !== 'idle' || !withdrawAmount}
                  className="btn btn-primary flex-1"
                >
                  {transactionStep === 'submitting' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      提交中...
                    </div>
                  ) : transactionStep === 'waiting' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      等待确认...
                    </div>
                  ) : (
                    '确认提取'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount("");
                    setTransactionStep('idle');
                  }}
                  disabled={transactionStep !== 'idle'}
                  className="btn btn-outline flex-1"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Toast 通知组件 */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </div>
  );
} 