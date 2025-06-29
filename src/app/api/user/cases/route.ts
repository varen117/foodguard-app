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

    // 并行获取用户相关的各种记录
    const [complaints, votes, deposits, rewards, punishments] = await Promise.all([
      DatabaseService.getComplaintsByUser(address),
      DatabaseService.getUserVotes(address),
      DatabaseService.getUserDeposits(address),
      DatabaseService.getUserRewards(address),
      DatabaseService.getUserPunishments(address)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        complaints,
        votes,
        deposits,
        rewards,
        punishments,
        address: address.toLowerCase()
      }
    });

  } catch (error) {
    console.error('User cases error:', error);
    return NextResponse.json({
      success: false,
      message: '获取用户案件信息失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 