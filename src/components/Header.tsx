import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaShieldAlt, FaHome, FaPlus, FaList, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            <FaShieldAlt className="w-8 h-8 text-emerald-600" />
                            <span>FoodGuard</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FaHome className="w-4 h-4" />
                            首页
                        </Link>
                        <Link href="/complaint" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FaPlus className="w-4 h-4" />
                            创建投诉
                        </Link>
                        <Link href="/cases" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FaList className="w-4 h-4" />
                            案件列表
                        </Link>
                        <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FaUser className="w-4 h-4" />
                            个人中心
                        </Link>
                    </nav>

                    {/* Wallet Connection */}
                    <div className="flex items-center">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </header>
    );
} 