/**
 * 根布局，所有页面都会被包裹在这里
 */
import type { Metadata } from "next";
import "./globals.css";
import {ReactNode} from "react"
import {Providers} from "./providers"
import Header from "@/components/Header"
import AuthGuard from "@/components/AuthGuard"

export const metadata: Metadata = {
  title: "FoodGuard - 食品安全治理平台",
  description: "基于区块链的去中心化食品安全投诉与治理系统",
  keywords: "食品安全, 区块链, 投诉, 治理, 去中心化"
};

export default function RootLayout(props: {children: ReactNode}) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <AuthGuard>
            <Header />
            <main>
              {props.children}
            </main>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
