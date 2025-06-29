import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({
        success: false,
        message: '缺少用户地址参数'
      }, { status: 400 });
    }

    // 获取用户统计信息
    const stats = await DatabaseService.getUserStats(address);
    
    // 获取用户注册信息
    const registration = await DatabaseService.getUserRegistration(address);
    
    // 处理BigInt序列化
    const serializedStats = {
      ...stats,
      totalRewards: stats.totalRewards.toString(),
      totalPunishments: stats.totalPunishments.toString()
    };

    return NextResponse.json({
      success: true,
      data: {
        stats: serializedStats,
        registration,
        address: address.toLowerCase()
      }
    });

  } catch (error) {
    console.error('User stats error:', error);
    return NextResponse.json({
      success: false,
      message: '获取用户统计信息失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 