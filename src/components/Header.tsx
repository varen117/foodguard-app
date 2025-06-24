"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaShieldAlt, FaHome, FaPlus, FaList, FaUser } from "react-icons/fa";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { chainsToFoodGuard, foodSafetyGovernanceAbi } from "@/constants";

export default function Header() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const router = useRouter();

    const contractAddress = chainsToFoodGuard[chainId]?.foodSafetyGovernance;

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

    // 处理创建投诉点击
    const handleComplaintClick = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!isConnected) {
            router.push('/register');
            return;
        }

        if (isUserRegistered === false) {
            console.log('用户未注册，跳转到注册页面');
            router.push('/register');
        } else {
            router.push('/complaint');
        }
    };

    return (
        <header className="navbar sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link href={isConnected ? "/" : "/register"} className="flex items-center gap-3 text-2xl font-bold text-white hover:text-primary transition-colors group">
                            <div className="icon-container">
                                <FaShieldAlt className="w-6 h-6 text-white" />
                            </div>
                            <span className="gradient-text">FoodGuard</span>
                        </Link>
                    </div>

                    {/* Navigation - 只有连接钱包后才显示 */}
                    {isConnected && (
                        <nav className="hidden md:flex items-center space-x-2">
                            <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-primary rounded-xl hover:bg-white/10 transition-all duration-300 group">
                                <FaHome className="w-4 h-4 group-hover:text-primary transition-colors" />
                                首页
                            </Link>
                            <button onClick={handleComplaintClick} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-primary rounded-xl hover:bg-white/10 transition-all duration-300 group">
                                <FaPlus className="w-4 h-4 group-hover:text-primary transition-colors" />
                                创建投诉
                            </button>
                            <Link href="/cases" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-primary rounded-xl hover:bg-white/10 transition-all duration-300 group">
                                <FaList className="w-4 h-4 group-hover:text-primary transition-colors" />
                                案件列表
                            </Link>
                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-primary rounded-xl hover:bg-white/10 transition-all duration-300 group">
                                <FaUser className="w-4 h-4 group-hover:text-primary transition-colors" />
                                个人中心
                            </Link>
                        </nav>
                    )}

                    {/* Wallet Connection */}
                    <div className="flex items-center">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </header>
    );
} 