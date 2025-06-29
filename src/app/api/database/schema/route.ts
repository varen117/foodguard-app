import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') || 'complaint_created';
    const schema = searchParams.get('schema') || 'food_guard_indexer_food_safety_governance';
    
    // 查看表结构
    const schemaQuery = `
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_schema = $1 
      AND table_name = $2
      ORDER BY ordinal_position;
    `;
    
    const columns = await DatabaseService.query(schemaQuery, [schema, table]);
    
    // 查看表中的数据示例
    const sampleQuery = `
      SELECT * FROM ${schema}.${table} 
      LIMIT 5
    `;
    
    let sampleData = [];
    try {
      sampleData = await DatabaseService.query(sampleQuery);
    } catch (error) {
      console.log(`No data in table ${schema}.${table}:`, error);
    }
    
    return NextResponse.json({
      success: true,
      data: {
        table: `${schema}.${table}`,
        columns,
        sampleData,
        totalColumns: columns.length,
        totalSampleRows: sampleData.length
      }
    });

  } catch (error) {
    console.error('Schema check error:', error);
    return NextResponse.json({
      success: false,
      message: '查看数据库表结构失败',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 