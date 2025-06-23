/**
 * 创建投诉页面
 */
"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useChainId, useWriteContract, useReadContract } from "wagmi";
import { parseEther } from "viem";
import { FaPlus, FaMinus, FaUpload, FaInfoCircle, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { InputField } from "@/components/ui/InputField";
import { chainsToFoodGuard, foodSafetyGovernanceAbi, fundManagerAbi } from "@/constants";

interface Evidence {
  hash: string;
  type: string;
  description: string;
}

export default function ComplaintPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  // 表单状态
  const [formData, setFormData] = useState({
    enterprise: "",
    complaintTitle: "",
    complaintDescription: "",
    location: "",
    incidentTime: "",
    depositAmount: "",
  });
  
  const [evidences, setEvidences] = useState<Evidence[]>([
    { hash: "", type: "图片", description: "" }
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;
  const fundManagerAddress = chainsToFoodGuard[chainId]?.fundManager;

  const { writeContractAsync } = useWriteContract();

  // 获取系统配置
  const { data: systemConfig } = useReadContract({
    abi: fundManagerAbi,
    address: fundManagerAddress as `0x${string}`,
    functionName: 'getSystemConfig',
    query: {
      enabled: !!fundManagerAddress,
    },
  });

  // 获取用户注册状态
  const { data: isUserRegistered = false } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'isUserRegistered',
    args: address ? [address] : undefined,
    query: {
      enabled: !!contractAddress && !!address,
    },
  });

  // 检查目标地址是否为企业
  const { data: isTargetEnterprise = false } = useReadContract({
    abi: foodSafetyGovernanceAbi,
    address: contractAddress as `0x${string}`,
    functionName: 'checkIsEnterprise',
    args: formData.enterprise ? [formData.enterprise as `0x${string}`] : undefined,
    query: {
      enabled: !!contractAddress && !!formData.enterprise && formData.enterprise.length === 42,
    },
  });

  useEffect(() => {
    // 检查用户注册状态
    if (!isUserRegistered && isConnected) {
      alert("您尚未注册，请先注册后再创建投诉");
      router.push('/register');
    }
  }, [isUserRegistered, isConnected, router]);

  useEffect(() => {
    // 设置默认保证金
    if (systemConfig) {
      setFormData(prev => ({
        ...prev,
        depositAmount: systemConfig.minComplaintDeposit.toString()
      }));
    }
  }, [systemConfig]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // 清除相关错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const addEvidence = () => {
    setEvidences(prev => [...prev, { hash: "", type: "图片", description: "" }]);
  };

  const removeEvidence = (index: number) => {
    if (evidences.length > 1) {
      setEvidences(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateEvidence = (index: number, field: keyof Evidence, value: string) => {
    setEvidences(prev => prev.map((evidence, i) => 
      i === index ? { ...evidence, [field]: value } : evidence
    ));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.enterprise) {
      newErrors.enterprise = "请输入企业地址";
    } else if (formData.enterprise.length !== 42 || !formData.enterprise.startsWith('0x')) {
      newErrors.enterprise = "请输入有效的以太坊地址";
    } else if (!isTargetEnterprise) {
      newErrors.enterprise = "该地址不是已注册的企业";
    }

    if (!formData.complaintTitle.trim()) {
      newErrors.complaintTitle = "请输入投诉标题";
    }

    if (!formData.complaintDescription.trim()) {
      newErrors.complaintDescription = "请输入投诉描述";
    }

    if (!formData.location.trim()) {
      newErrors.location = "请输入事发地点";
    }

    if (!formData.incidentTime) {
      newErrors.incidentTime = "请选择事发时间";
    } else {
      const incidentDate = new Date(formData.incidentTime);
      if (incidentDate > new Date()) {
        newErrors.incidentTime = "事发时间不能晚于当前时间";
      }
    }

    if (!formData.depositAmount) {
      newErrors.depositAmount = "请输入保证金金额";
    } else {
      const depositBigInt = BigInt(formData.depositAmount);
      const minDeposit = systemConfig?.minComplaintDeposit || 0n;
      if (depositBigInt < minDeposit) {
        newErrors.depositAmount = `保证金不能少于 ${minDeposit.toString()} Wei`;
      }
    }

    // 检查证据
    const validEvidences = evidences.filter(e => e.hash.trim() && e.description.trim());
    if (validEvidences.length === 0) {
      newErrors.evidences = "至少需要提供一个有效证据";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!isConnected || !contractAddress) {
      alert("请先连接钱包");
      return;
    }

    try {
      setIsSubmitting(true);

      // 过滤有效证据
      const validEvidences = evidences.filter(e => e.hash.trim() && e.description.trim());
      
      const evidenceHashes = validEvidences.map(e => e.hash);
      const evidenceTypes = validEvidences.map(e => e.type);
      const evidenceDescriptions = validEvidences.map(e => e.description);

      const incidentTimestamp = Math.floor(new Date(formData.incidentTime).getTime() / 1000);

      const result = await writeContractAsync({
        abi: foodSafetyGovernanceAbi,
        address: contractAddress as `0x${string}`,
        functionName: 'createComplaint',
        args: [
          formData.enterprise as `0x${string}`,
          formData.complaintTitle,
          formData.complaintDescription,
          formData.location,
          BigInt(incidentTimestamp),
          evidenceHashes,
          evidenceTypes,
          evidenceDescriptions,
        ],
        value: BigInt(formData.depositAmount),
      });

      alert("投诉创建成功！");
      router.push('/cases');
    } catch (error) {
      console.error('创建投诉失败:', error);
      alert('创建投诉失败，请重试');
    } finally {
      setIsSubmitting(false);
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
            您需要连接钱包才能创建投诉
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaExclamationTriangle className="w-8 h-8" />
              创建食品安全投诉
            </h1>
            <p className="text-emerald-100 mt-2">
              详细描述您遇到的食品安全问题，我们将为您启动治理流程
            </p>
          </div>

          <div className="p-8">
            {/* 风险提示 */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                    投诉须知
                  </h4>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                    <li>• 请确保投诉内容真实准确，虚假投诉将面临保证金惩罚</li>
                    <li>• 提供的证据将被公开用于验证过程</li>
                    <li>• 投诉一旦提交无法撤销，请仔细核对信息</li>
                    <li>• 高风险案件将触发特殊处理流程</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：基本信息 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  基本信息
                </h3>

                <InputField
                  label="被投诉企业地址"
                  value={formData.enterprise}
                  onChange={handleInputChange('enterprise')}
                  placeholder="0x..."
                  required
                  error={errors.enterprise}
                  helpText={formData.enterprise && isTargetEnterprise ? "✓ 企业地址有效" : "请输入已注册的企业地址"}
                />

                <InputField
                  label="投诉标题"
                  value={formData.complaintTitle}
                  onChange={handleInputChange('complaintTitle')}
                  placeholder="简短描述问题..."
                  required
                  error={errors.complaintTitle}
                />

                <InputField
                  label="详细描述"
                  value={formData.complaintDescription}
                  onChange={handleInputChange('complaintDescription')}
                  placeholder="详细描述您遇到的食品安全问题，包括具体情况、影响等..."
                  large={true}
                  rows={6}
                  required
                  error={errors.complaintDescription}
                />

                <InputField
                  label="事发地点"
                  value={formData.location}
                  onChange={handleInputChange('location')}
                  placeholder="具体地址..."
                  required
                  error={errors.location}
                />

                <InputField
                  label="事发时间"
                  type="datetime-local"
                  value={formData.incidentTime}
                  onChange={handleInputChange('incidentTime')}
                  required
                  error={errors.incidentTime}
                />

                <InputField
                  label="保证金金额 (Wei)"
                  value={formData.depositAmount}
                  onChange={handleInputChange('depositAmount')}
                  placeholder={`最小金额: ${systemConfig?.minComplaintDeposit?.toString() || '0'} Wei`}
                  required
                  error={errors.depositAmount}
                  helpText={`当前输入: ${formData.depositAmount ? Number(formData.depositAmount) / 1e18 : 0} ETH`}
                />
              </div>

              {/* 右侧：证据材料 */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    证据材料
                  </h3>
                  <button
                    onClick={addEvidence}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    添加证据
                  </button>
                </div>

                {errors.evidences && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.evidences}</p>
                )}

                <div className="space-y-4">
                  {evidences.map((evidence, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          证据 #{index + 1}
                        </h4>
                        {evidences.length > 1 && (
                          <button
                            onClick={() => removeEvidence(index)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <FaMinus className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            证据类型
                          </label>
                          <select
                            value={evidence.type}
                            onChange={(e) => updateEvidence(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="图片">图片</option>
                            <option value="视频">视频</option>
                            <option value="文档">文档</option>
                            <option value="音频">音频</option>
                            <option value="其他">其他</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            IPFS哈希 / 存储链接
                          </label>
                          <input
                            type="text"
                            value={evidence.hash}
                            onChange={(e) => updateEvidence(index, 'hash', e.target.value)}
                            placeholder="QmXXXXXX... 或 https://..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            证据描述
                          </label>
                          <textarea
                            value={evidence.description}
                            onChange={(e) => updateEvidence(index, 'description', e.target.value)}
                            placeholder="描述此证据的内容和重要性..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 证据上传提示 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FaUpload className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        证据上传建议
                      </h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• 建议使用IPFS进行去中心化存储</li>
                        <li>• 可使用Pinata、NFT.Storage等服务</li>
                        <li>• 确保证据文件可长期访问</li>
                        <li>• 避免上传个人敏感信息</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    提交投诉中...
                  </div>
                ) : (
                  "提交投诉"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 