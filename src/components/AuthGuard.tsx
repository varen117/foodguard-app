/**
 * 路由守卫组件 - 检查钱包连接状态
 */
"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // 允许访问的公共路径（无需钱包连接）
  const publicPaths = ['/register'];

  useEffect(() => {
    // 只有在不是连接中且未连接钱包且当前不在公共路径时才跳转
    if (!isConnecting && !isConnected && !publicPaths.includes(pathname)) {
      setIsRedirecting(true);
      router.push('/register');
    }
    // 移除自动跳转逻辑，让已连接钱包的用户能够访问注册页面
  }, [isConnected, isConnecting, pathname, router]);

  // 显示加载状态的条件：
  // 1. 正在连接钱包
  // 2. 未连接且不在公共路径且正在重定向
  // 3. 未连接且不在公共路径
  if (isConnecting || 
      (!isConnected && !publicPaths.includes(pathname) && isRedirecting) ||
      (!isConnected && !publicPaths.includes(pathname))) {
    return (
      <div className="main-container flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md w-full">
          <div className="loading-pulse mb-6">
            <div className="icon-container mx-auto">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            {isConnecting ? '正在连接钱包...' : '检查钱包状态...'}
          </h3>
          <p className="text-muted">
            {isConnecting 
              ? '请在钱包中确认连接请求' 
              : '正在为您跳转到注册页面'}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 