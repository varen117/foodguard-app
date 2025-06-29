/**
 * 配置RainbowKit
 */
import { getDefaultConfig } from '@rainbow-me/rainbowkit';//导入默认配置
import { zksync, mainnet, sepolia, polygonMumbai, anvil } from 'wagmi/chains'; //程序允许的链

export default getDefaultConfig({
    appName: 'FoodGuard',
    // 使用环境变量，如果没有则使用一个有效的测试项目 ID
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2f5e89b3b6a94e2c8f7d1a4e6b8c9d2e', 
    chains: [anvil, sepolia, zksync, mainnet, polygonMumbai], // 将anvil放在第一位用于本地开发
    ssr: true,//启用SSR支持
}) 