/**
 * 用户个人资料页面
 */
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { 
  FaUser, FaEdit, FaSave, FaTimes, FaShieldAlt, FaGavel, 
  FaEthereum, FaHistory, FaTrophy, FaExclamationTriangle,
  FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
  FaChartLine, FaAward, FaUsers, FaBell
} from "react-icons/fa";
import { 
  chainsToFoodGuard, 
  foodSafetyGovernanceAbi,
  fundManagerAbi,
  CaseInfo,
  CaseStatus,
  RiskLevel 
} from "@/constants";

interface UserProfile {
  // TODO: 数据库字段 - 用户基本信息表 (users)
  name?: string;                    // 用户姓名
  email?: string;                   // 邮箱地址
  phone?: string;                   // 电话号码
  address?: string;                 // 详细地址
  avatar?: string;                  // 头像URL
  bio?: string;                     // 个人简介
  website?: string;                 // 个人网站
  twitterHandle?: string;           // Twitter用户名
  registrationTime?: bigint;        // 注册时间
  lastLoginTime?: bigint;           // 最后登录时间
  isVerified?: boolean;             // 是否已验证身份
  
  // TODO: 数据库字段 - 用户统计表 (user_stats)
  totalCasesParticipated?: number;  // 参与案件总数
  totalVotes?: number;              // 总投票次数
  totalChallenges?: number;         // 总质疑次数
  successfulVotes?: number;         // 成功投票次数
  successfulChallenges?: number;    // 成功质疑次数
  averageResponseTime?: number;     // 平均响应时间(小时)
  
  // TODO: 合约字段 - 从链上获取的数据
  userRole?: string;                // 用户角色 (COMPLAINANT/ENTERPRISE/DAO_MEMBER)
  reputationScore?: number;         // 信誉分数
  isActive?: boolean;               // 账户是否激活
  totalDeposit?: bigint;            // 总保证金
  frozenDeposit?: bigint;           // 冻结保证金
  availableDeposit?: bigint;        // 可用保证金
}

interface ParticipatedCase extends CaseInfo {
  // TODO: 数据库字段 - 用户参与案件的额外信息
  participationType?: 'complainant' | 'enterprise' | 'validator' | 'challenger'; // 参与类型
  participationTime?: bigint;       // 参与时间
  earnedReward?: bigint;           // 获得奖励
  paidPenalty?: bigint;            // 支付惩罚
  voteChoice?: number;             // 投票选择 (如果是验证者)
  challengeChoice?: number;        // 质疑选择 (如果是质疑者)
}

interface ActivityRecord {
  // TODO: 数据库字段 - 用户活动记录表 (user_activities)
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
  
  const [profile, setProfile] = useState<UserProfile>({});
  const [participatedCases, setParticipatedCases] = useState<ParticipatedCase[]>([]);
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'activities' | 'settings'>('overview');

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;
  const fundManagerAddress = chainsToFoodGuard[chainId]?.fundManager;

  // TODO: 合约接口 - 检查用户注册状态
  const { data: isUserRegistered = false } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'isUserRegistered',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contractAddress && !!address,
    },
  });

  // TODO: 合约接口 - 获取用户可用保证金
  const { data: availableDeposit = 0n } = useReadContract({
    abi: fundManagerAbi,
    address: fundManagerAddress as `0x${string}`,
    functionName: 'getAvailableDeposit',
    args: address ? [address] : undefined,
    query: {
      enabled: !!fundManagerAddress && !!address,
    },
  });

  useEffect(() => {
    if (isConnected && address && isUserRegistered) {
      loadUserProfile();
    }
  }, [isConnected, address, isUserRegistered]);

  const loadUserProfile = async () => {
    if (!address) return;

    try {
      setLoading(true);

      // TODO: 数据库查询 - 获取用户基本信息
      // SELECT * FROM users WHERE wallet_address = ?
      const mockProfile: UserProfile = {
        name: "张三",
        email: "zhangsan@example.com",
        phone: "138****1234",
        address: "北京市朝阳区XX路XX号",
        avatar: "/default-avatar.png",
        bio: "食品安全监督志愿者，关注食品安全问题，积极参与社区治理。",
        website: "https://example.com",
        twitterHandle: "zhangsan123",
        registrationTime: BigInt(Date.now() - 86400000 * 30),
        lastLoginTime: BigInt(Date.now() - 3600000),
        isVerified: true,
        
        // TODO: 数据库查询 - 获取用户统计信息
        // SELECT * FROM user_stats WHERE user_address = ?
        totalCasesParticipated: 15,
        totalVotes: 12,
        totalChallenges: 3,
        successfulVotes: 10,
        successfulChallenges: 2,
        averageResponseTime: 4.5,
        
        // TODO: 合约查询 - 获取链上数据
        userRole: "DAO_MEMBER",
        reputationScore: 850,
        isActive: true,
        totalDeposit: BigInt("5000000000000000000"), // 5 ETH
        frozenDeposit: BigInt("1000000000000000000"), // 1 ETH
        availableDeposit: availableDeposit,
      };

      // TODO: 数据库查询 - 从Twitter绑定表获取Twitter信息
      // SELECT twitter_id FROM twitter_bindings WHERE user_address = ?
      const twitterBindings = JSON.parse(localStorage.getItem('twitterBindings') || '{}');
      if (twitterBindings[address]) {
        mockProfile.twitterHandle = twitterBindings[address].twitterId;
      }

      setProfile(mockProfile);
      setEditForm(mockProfile);

      // TODO: 数据库查询 - 获取用户参与的案件
      // SELECT c.*, up.participation_type, up.participation_time, up.earned_reward, up.paid_penalty 
      // FROM cases c 
      // JOIN user_participations up ON c.case_id = up.case_id 
      // WHERE up.user_address = ? 
      // ORDER BY up.participation_time DESC
      const mockCases: ParticipatedCase[] = [
        {
          caseId: BigInt(1),
          complainant: "0x" + "1".repeat(40),
          enterprise: "0x" + "2".repeat(40),
          complaintTitle: "食品变质投诉案件",
          complaintDescription: "购买的食品存在变质问题...",
          location: "北京市朝阳区",
          incidentTime: BigInt(Date.now() - 86400000 * 5),
          complaintTime: BigInt(Date.now() - 86400000 * 4),
          status: CaseStatus.COMPLETED,
          riskLevel: RiskLevel.MEDIUM,
          complaintUpheld: true,
          complainantDeposit: BigInt("1000000000000000000"),
          enterpriseDeposit: BigInt("2000000000000000000"),
          isCompleted: true,
          completionTime: BigInt(Date.now() - 86400000 * 1),
          
          participationType: 'validator',
          participationTime: BigInt(Date.now() - 86400000 * 3),
          earnedReward: BigInt("100000000000000000"), // 0.1 ETH
          paidPenalty: BigInt("0"),
          voteChoice: 0, // SUPPORT_COMPLAINT
        },
        {
          caseId: BigInt(2),
          complainant: address as string,
          enterprise: "0x" + "3".repeat(40),
          complaintTitle: "餐厅卫生问题投诉",
          complaintDescription: "发现餐厅存在卫生问题...",
          location: "上海市浦东新区",
          incidentTime: BigInt(Date.now() - 86400000 * 10),
          complaintTime: BigInt(Date.now() - 86400000 * 9),
          status: CaseStatus.COMPLETED,
          riskLevel: RiskLevel.LOW,
          complaintUpheld: false,
          complainantDeposit: BigInt("1000000000000000000"),
          enterpriseDeposit: BigInt("2000000000000000000"),
          isCompleted: true,
          completionTime: BigInt(Date.now() - 86400000 * 6),
          
          participationType: 'complainant',
          participationTime: BigInt(Date.now() - 86400000 * 9),
          earnedReward: BigInt("0"),
          paidPenalty: BigInt("500000000000000000"), // 0.5 ETH
        }
      ];
      setParticipatedCases(mockCases);

      // TODO: 数据库查询 - 获取用户活动记录
      // SELECT * FROM user_activities WHERE user_address = ? ORDER BY timestamp DESC LIMIT 20
      const mockActivities: ActivityRecord[] = [
    {
      id: 1,
          activityType: 'vote',
          description: '在案件 #1 中投票支持投诉',
          caseId: 1,
          timestamp: BigInt(Date.now() - 86400000 * 1),
          result: 'success',
          rewardAmount: BigInt("100000000000000000"),
          penaltyAmount: BigInt("0")
    },
    {
      id: 2,
          activityType: 'complaint',
          description: '创建了食品安全投诉案件',
          caseId: 2,
          timestamp: BigInt(Date.now() - 86400000 * 9),
          result: 'failed',
          rewardAmount: BigInt("0"),
          penaltyAmount: BigInt("500000000000000000")
    },
    {
      id: 3,
          activityType: 'challenge',
          description: '对案件 #3 的投票结果提出质疑',
          caseId: 3,
          timestamp: BigInt(Date.now() - 86400000 * 15),
          result: 'success',
          rewardAmount: BigInt("75000000000000000"),
          penaltyAmount: BigInt("0")
    }
  ];
      setActivities(mockActivities);

      // TODO: 数据库操作 - 更新最后访问时间
      // UPDATE users SET last_login_time = ? WHERE wallet_address = ?
      console.log('TODO: 更新最后访问时间:', { userAddress: address, timestamp: Date.now() });

    } catch (error) {
      console.error('加载用户资料失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!address) return;

    try {
      // TODO: 数据库操作 - 更新用户资料
      // UPDATE users SET name = ?, email = ?, phone = ?, address = ?, bio = ?, website = ? WHERE wallet_address = ?
      console.log('TODO: 更新用户资料:', {
        userAddress: address,
        updates: editForm,
        timestamp: Date.now()
      });

      // TODO: 数据库操作 - 记录资料更新活动
      // INSERT INTO user_activities (user_address, activity_type, description, timestamp) VALUES (?, 'profile_update', '更新了个人资料', ?)

      setProfile({ ...profile, ...editForm });
      setEditing(false);
      alert('资料更新成功！');
    } catch (error) {
      console.error('更新资料失败:', error);
      alert('更新资料失败，请重试');
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

  if (loading) {
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
                {profile.avatar ? (
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
                      <p className="text-sm text-muted mb-1">参与案件</p>
                      <p className="text-2xl font-bold text-white">{profile.totalCasesParticipated || 0}</p>
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
                      <p className="text-2xl font-bold text-white">{profile.totalVotes || 0}</p>
                    </div>
                    <div className="icon-container">
                      <FaUsers className="w-6 h-6 text-white" />
                  </div>
                  </div>
                </div>

                <div className="stat-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted mb-1">成功率</p>
                      <p className="text-2xl font-bold text-white">
                        {profile.totalVotes ? Math.round((profile.successfulVotes || 0) / profile.totalVotes * 100) : 0}%
                      </p>
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
                        {Number(profile.availableDeposit || 0) / 1e18} ETH
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
                <h3 className="text-lg font-semibold text-card mb-4 flex items-center gap-2">
                  <FaEthereum className="w-5 h-5" />
                  保证金状态
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {Number(profile.totalDeposit || 0) / 1e18} ETH
                    </div>
                    <div className="text-sm text-gray-500">总保证金</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      {Number(profile.frozenDeposit || 0) / 1e18} ETH
                    </div>
                    <div className="text-sm text-gray-500">冻结保证金</div>
                  </div>
                  
                    <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {Number(profile.availableDeposit || 0) / 1e18} ETH
                    </div>
                    <div className="text-sm text-gray-500">可用保证金</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>可用比例</span>
                    <span>
                      {profile.totalDeposit && Number(profile.totalDeposit) > 0 
                        ? Math.round(Number(profile.availableDeposit || 0) / Number(profile.totalDeposit) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${profile.totalDeposit && Number(profile.totalDeposit) > 0 
                          ? Math.round(Number(profile.availableDeposit || 0) / Number(profile.totalDeposit) * 100)
                          : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaTwitter className="w-4 h-4 inline mr-1" />
                      Twitter
                    </label>
                    <input
                      type="text"
                      value={editing ? editForm.twitterHandle || '' : profile.twitterHandle || ''}
                      onChange={(e) => editing && setEditForm({ ...editForm, twitterHandle: e.target.value })}
                      disabled={!editing}
                      placeholder="请输入您的Twitter用户名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
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
                      className="btn btn-secondary"
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
      </div>
    </div>
  );
} 