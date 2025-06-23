/**
 * 包装提供者，希望整个应用程序都知道我们的钱包，封装全局配置
 */
"use client"

import {useState, type ReactNode} from "react"
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
            },
        },
    }))
    
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