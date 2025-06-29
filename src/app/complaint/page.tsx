/**
 * 创建投诉页面
 */
"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useChainId } from "wagmi";
import { FaPlus, FaMinus, FaUpload, FaInfoCircle, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { InputField } from "@/components/ui/InputField";
import { RiskLevel } from "@/constants";
import { useUserRegistration, useCreateComplaint, useSystemConfig } from "@/hooks/useContractInteraction";
import { Toaster, toast } from "react-hot-toast";
import TransactionStatus from "@/components/TransactionStatus";
import { useQueryClient } from "@tanstack/react-query";

interface Evidence {
  hash: string;
  type: string;
  description: string;
}

export default function ComplaintPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  
  // 表单状态
  const [formData, setFormData] = useState({
    enterprise: "",
    complaintTitle: "",
    complaintDescription: "",
    location: "",
    incidentTime: "",
    depositAmount: "",
    riskLevel: "0", // 默认低风险
  });
  
  const [evidenceHash, setEvidenceHash] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);

  // TODO: 合约接口 - 获取用户注册状态和信息
  const { isRegistered: isUserRegistered, userInfo } = useUserRegistration();
  
  // TODO: 合约接口 - 获取系统配置信息
  const systemConfig = useSystemConfig();
  
  // TODO: 合约接口 - 创建投诉功能
  const { mutate: createComplaint, isPending: isSubmitting } = useCreateComplaint();

  useEffect(() => {
    // 检查用户注册状态，如果已连接钱包但未注册，直接跳转到注册页面
    if (isConnected && !isUserRegistered) {
      console.log('用户未注册，跳转到注册页面');
      router.push('/register');
    }
  }, [isUserRegistered, isConnected]);

  useEffect(() => {
    // 设置默认保证金
    if (systemConfig?.minComplaintDeposit) {
      setFormData(prev => ({
        ...prev,
        depositAmount: systemConfig.minComplaintDeposit
      }));
    }
  }, [systemConfig?.minComplaintDeposit]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除相关错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // 删除证据相关的函数，现在只使用单个证据哈希

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.enterprise) {
      newErrors.enterprise = "请输入企业地址";
    } else if (formData.enterprise.length !== 42 || !formData.enterprise.startsWith('0x')) {
      newErrors.enterprise = "请输入有效的以太坊地址";
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
      const depositAmount = parseFloat(formData.depositAmount);
      const minDeposit = systemConfig ? parseFloat(systemConfig.minComplaintDeposit) : 0;
      if (depositAmount < minDeposit) {
        newErrors.depositAmount = `保证金不能少于 ${minDeposit} ETH`;
      }
    }

    // 检查证据
    if (!evidenceHash.trim()) {
      newErrors.evidenceHash = "请提供证据哈希或存储链接";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!isConnected) {
      toast.error("请先连接钱包");
      return;
    }

    // TODO: 合约接口 - createComplaint() 创建投诉
    const incidentTimestamp = Math.floor(new Date(formData.incidentTime).getTime() / 1000);

    const complaintData = {
      enterprise: formData.enterprise,
      complaintTitle: formData.complaintTitle,
      complaintDescription: formData.complaintDescription,
      location: formData.location,
      incidentTime: incidentTimestamp,
      evidenceHash: evidenceHash,
      riskLevel: parseInt(formData.riskLevel) as RiskLevel,
      depositAmount: formData.depositAmount,
    };

    createComplaint(
      complaintData,
      {
        onSuccess: (hash) => {
          console.log('投诉交易已提交:', hash);
          setTxHash(hash);
          setShowTransactionStatus(true);
          toast.success("投诉交易已提交，正在等待区块链确认...");
        },
        onError: (error) => {
          console.error('创建投诉失败:', error);
          toast.error(`创建投诉失败: ${error.message}`);
        }
      }
    );
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
                  helpText="请输入被投诉企业的地址"
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

                {/* 风险等级选择 */}
                <div>
                  <label className="form-label">
                    风险等级 *
                  </label>
                  <select
                    value={formData.riskLevel}
                    onChange={handleInputChange('riskLevel')}
                    className="form-input"
                    required
                  >
                    <option value="0">低风险 - 一般食品安全问题</option>
                    <option value="1">中风险 - 影响较大的食品安全问题</option>
                    <option value="2">高风险 - 严重的食品安全问题，可能危及生命</option>
                  </select>
                  <p className="text-sm text-muted mt-1">
                    请根据问题的严重程度选择合适的风险等级，这将影响保证金要求和处理流程
                  </p>
                  {errors.riskLevel && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.riskLevel}</p>
                  )}
                </div>

                <InputField
                  label="保证金金额 (ETH)"
                  type="number"
                  value={formData.depositAmount}
                  onChange={handleInputChange('depositAmount')}
                  placeholder="0.01"
                  min={systemConfig?.minComplaintDeposit || "0.01"}
                  step="0.001"
                  required
                  error={errors.depositAmount}
                  helpText={`最低保证金: ${systemConfig?.minComplaintDeposit || "0.01"} ETH`}
                />
              </div>

              {/* 右侧：证据上传 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  证据材料
                </h3>

                <div>
                  <label className="form-label">
                    证据哈希 / 存储链接 *
                  </label>
                  <textarea
                    value={evidenceHash}
                    onChange={(e) => setEvidenceHash(e.target.value)}
                    placeholder="请输入证据的IPFS哈希、文件链接或其他存储标识..."
                    className="form-input"
                    rows={4}
                    required
                  />
                  {errors.evidenceHash && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.evidenceHash}</p>
                  )}
                  <p className="text-sm text-muted mt-1">
                    支持 IPFS 哈希、去中心化存储链接或其他可验证的证据标识
                  </p>
                </div>

                {/* 证据类型说明 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    证据要求
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• 照片：产品外观、标签、生产日期等</li>
                    <li>• 文档：购买凭证、检验报告、医疗诊断等</li>
                    <li>• 视频：问题展示、现场记录等</li>
                    <li>• 其他：相关证明材料</li>
                  </ul>
                </div>

                {/* 提交按钮 */}
                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || showTransactionStatus}
                    className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        提交中...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaPlus className="w-5 h-5" />
                        创建投诉
                      </div>
                    )}
                  </button>
                  
                  <p className="text-xs text-muted text-center mt-2">
                    点击创建投诉即表示您同意承担相应的法律责任
                  </p>
                </div>

                {/* 交易状态显示 */}
                {showTransactionStatus && txHash && (
                  <div className="mt-6">
                    <TransactionStatus
                      txHash={txHash}
                      description="创建投诉"
                      chainId={chainId}
                      onSuccess={(receipt) => {
                        console.log('投诉交易确认成功:', receipt);
                        toast.success("🎉 投诉创建成功！", { duration: 5000 });
                        
                        // 刷新相关查询缓存以更新UI数据
                        queryClient.invalidateQueries({ queryKey: ['cases'] });
                        queryClient.invalidateQueries({ queryKey: ['totalCases'] });
                        queryClient.invalidateQueries({ queryKey: ['activeCases'] });
                        queryClient.invalidateQueries({ queryKey: ['userStats'] });
                        queryClient.invalidateQueries({ queryKey: ['userCases'] });
                        
                        // 延迟跳转到案件列表页面
                        setTimeout(() => {
                          router.push('/cases');
                        }, 3000);
                      }}
                      onError={(error) => {
                        console.error('投诉交易确认失败:', error);
                        setShowTransactionStatus(false);
                        setTxHash(undefined);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
  );
} 