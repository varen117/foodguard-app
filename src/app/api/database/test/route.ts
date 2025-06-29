import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

export async function GET() {
  try {
    const isConnected = await DatabaseService.testConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        success: true, 
        message: '数据库连接成功',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: '数据库连接失败' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      success: false, 
      message: '数据库连接测试失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 