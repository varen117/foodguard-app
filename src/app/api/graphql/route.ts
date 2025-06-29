import { NextRequest, NextResponse } from 'next/server';
import { queryDb } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { query, variables } = await request.json();
    
    // 解析 GraphQL 查询并转换为 SQL
    const result = await handleGraphQLQuery(query, variables);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 提取查询类型的辅助函数
function extractQueryType(query: string): string {
  if (query.includes('allComplaintCreateds')) return 'allComplaintCreateds';
  if (query.includes('allCaseStatusUpdateds')) return 'allCaseStatusUpdateds';
  if (query.includes('allVoteSubmitteds')) return 'allVoteSubmitteds';
  if (query.includes('allRewardDistributeds')) return 'allRewardDistributeds';
  if (query.includes('allUserRegistereds')) return 'allUserRegistereds';
  return 'unknown';
}

// 获取结果记录数的辅助函数
function getRecordCount(result: any): number {
  if (result?.data) {
    const dataKeys = Object.keys(result.data);
    for (const key of dataKeys) {
      if (result.data[key]?.nodes) {
        return result.data[key].nodes.length;
      }
    }
  }
  return 0;
}

async function handleGraphQLQuery(query: string, variables?: any) {
  const queryType = extractQueryType(query);
  
  try {
    let result;
    
    if (query.includes('allComplaintCreateds')) {
      result = await getAllComplaintCreateds(variables);
    } else if (query.includes('allCaseStatusUpdateds')) {
      result = await getAllCaseStatusUpdateds(variables);
    } else if (query.includes('allVoteSubmitteds')) {
      result = await getAllVoteSubmitteds(variables);
    } else if (query.includes('allRewardDistributeds')) {
      result = await getAllRewardDistributeds(variables);
    } else if (query.includes('allUserRegistereds')) {
      result = await getAllUserRegistereds(variables);
    } else {
      result = { data: {} };
    }
    
    return result;
  } catch (error) {
    throw error;
  }
}

// 获取所有投诉创建事件
async function getAllComplaintCreateds(variables?: any) {
  const limit = variables?.first || 20;
  const offset = variables?.offset || 0;
  
  const result = await queryDb(`
    SELECT 
      rindexer_id,
      case_id,
      complainant,
      enterprise,
      complaint_title,
      risk_level,
      timestamp,
      block_number,
      tx_hash,
      contract_address
    FROM complaint_createds 
    ORDER BY block_number DESC, tx_index DESC, log_index DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);
  
  return {
    data: {
      allComplaintCreateds: {
        nodes: result.rows
      }
    }
  };
}

// 获取所有案件状态更新事件
async function getAllCaseStatusUpdateds(variables?: any) {
  const limit = variables?.first || 20;
  const offset = variables?.offset || 0;
  
  const result = await queryDb(`
    SELECT 
      rindexer_id,
      case_id,
      old_status,
      new_status,
      timestamp,
      block_number,
      tx_hash,
      contract_address
    FROM case_status_updateds 
    ORDER BY block_number DESC, tx_index DESC, log_index DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);
  
  return {
    data: {
      allCaseStatusUpdateds: {
        nodes: result.rows
      }
    }
  };
}

// 获取所有投票提交事件
async function getAllVoteSubmitteds(variables?: any) {
  const limit = variables?.first || 20;
  const offset = variables?.offset || 0;
  
  const result = await queryDb(`
    SELECT 
      rindexer_id,
      case_id,
      voter,
      choice,
      timestamp,
      block_number,
      tx_hash,
      contract_address
    FROM vote_submitteds 
    ORDER BY block_number DESC, tx_index DESC, log_index DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);
  
  return {
    data: {
      allVoteSubmitteds: {
        nodes: result.rows
      }
    }
  };
}

// 获取所有奖励分配事件
async function getAllRewardDistributeds(variables?: any) {
  const limit = variables?.first || 20;
  const offset = variables?.offset || 0;
  
  const result = await queryDb(`
    SELECT 
      rindexer_id,
      case_id,
      recipient,
      amount,
      reason,
      timestamp,
      block_number,
      tx_hash,
      contract_address
    FROM reward_distributeds 
    ORDER BY block_number DESC, tx_index DESC, log_index DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);
  
  return {
    data: {
      allRewardDistributeds: {
        nodes: result.rows
      }
    }
  };
}

// 获取所有用户注册事件
async function getAllUserRegistereds(variables?: any) {
  const limit = variables?.first || 20;
  const offset = variables?.offset || 0;
  
  const result = await queryDb(`
    SELECT 
      rindexer_id,
      user_address as user,
      is_enterprise,
      deposit_amount,
      timestamp,
      block_number,
      tx_hash,
      contract_address
    FROM user_registereds 
    ORDER BY block_number DESC, tx_index DESC, log_index DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);
  
  return {
    data: {
      allUserRegistereds: {
        nodes: result.rows
      }
    }
  };
} 