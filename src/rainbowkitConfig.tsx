/**
 * 配置RainbowKit
 */
import {getDefaultConfig } from '@rainbow-me/rainbowkit';//导入默认配置
import {anvil, zksync, mainnet} from 'wagmi/chains'; //程序允许的链

export default getDefaultConfig({
    appName: 'FoodGuard',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [anvil, zksync, mainnet],
    ssr: false,//服务渲染
}) 