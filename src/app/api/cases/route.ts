import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 获取案件列表
    const cases = await DatabaseService.getAllCases(limit, offset);
    
    return NextResponse.json({
      success: true,
      data: {
        cases,
        pagination: {
          limit,
          offset,
          total: cases.length
        }
      }
    });

  } catch (error) {
    console.error('Cases list error:', error);
    return NextResponse.json({
      success: false,
      message: '获取案件列表失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 