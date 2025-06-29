/**
 * 包装提供者，希望整个应用程序都知道我们的钱包，封装全局配置
 */
"use client"

import {useState, useEffect, type ReactNode} from "react"
import config from "@/rainbowkitConfig"
import {WagmiProvider} from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

/**
 * 提供者层级说明:
 * 
 * WagmiProvider - 提供链连接和 Web3 的核心能力
 * QueryClientProvider - 提供数据请求与缓存能力  
 * RainbowKitProvider - 负责显示用户连接钱包相关的 UI
 * children - 应用的实际内容，可以使用这三个 provider 提供的上下文能力
 */
export function Providers(props: {children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5分钟
                retry: 2,
                refetchOnWindowFocus: false, // 防止多次请求
            },
        },
    }))
    
    const [mounted, setMounted] = useState(false)

    // 防止 SSR hydration 错误
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
                </div>
            </div>
        )
    }
    
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
} 