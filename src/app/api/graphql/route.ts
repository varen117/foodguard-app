import { NextRequest, NextResponse } from 'next/server';
import { queryDb } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { query, variables } = await request.json();
    
    // 解析 GraphQL 查询并转换为 SQL
    const result = await handleGraphQLQuery(query, variables);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('GraphQL API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleGraphQLQuery(query: string, variables?: any) {
  // 简化的 GraphQL 解析器，根据查询类型返回对应数据
  
  if (query.includes('allComplaintCreateds')) {
    return await getAllComplaintCreateds(variables);
  }
  
  if (query.includes('allCaseStatusUpdateds')) {
    return await getAllCaseStatusUpdateds(variables);
  }
  
  if (query.includes('allVoteSubmitteds')) {
    return await getAllVoteSubmitteds(variables);
  }
  
  if (query.includes('allRewardDistributeds')) {
    return await getAllRewardDistributeds(variables);
  }
  
  if (query.includes('allUserRegistereds')) {
    return await getAllUserRegistereds(variables);
  }
  
  // 默认返回空结果
  return { data: {} };
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