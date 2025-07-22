/**
 * 配置RainbowKit
 */
import { getDefaultConfig } from '@rainbow-me/rainbowkit';//导入默认配置
import { zksync, mainnet, sepolia, polygonMumbai, anvil } from 'wagmi/chains'; //程序允许的链

// 为本地开发添加Gas优化配置
const localChain = {
  ...anvil,
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
};

export const config = getDefaultConfig({
    appName: 'FoodGuard',
    // 使用环境变量，如果没有则使用一个有效的测试项目 ID
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2f5e89b3b6a94e2c8f7d1a4e6b8c9d2e', 
    chains: [localChain], // 使用优化后的本地链配置
    ssr: true,//启用SSR支持
});

export default config; 