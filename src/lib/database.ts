import { Pool, PoolClient } from 'pg';

// 数据库连接配置
const pool = new Pool({
  host: '127.0.0.1',
  port: 5440,
  database: 'foodguard',
  user: 'rindexer',
  password: 'rindexer',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// 数据库查询服务类
export class DatabaseService {
  /**
   * 执行查询
   */
  static async query(text: string, params?: any[]): Promise<any> {
    const client: PoolClient = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  /**
   * 获取用户注册信息
   */
  static async getUserRegistration(address: string) {
    const query = `
      SELECT * FROM food_guard_indexer_participant_pool_manager.user_registered 
      WHERE "user" = $1 
      ORDER BY block_number DESC 
      LIMIT 1
    `;
    const results = await this.query(query, [address.toLowerCase()]);
    return results[0] || null;
  }

  /**
   * 获取用户保证金记录
   */
  static async getUserDeposits(address: string) {
    const query = `
      SELECT * FROM food_guard_indexer_fund_manager.deposit_made 
      WHERE "user" = $1 
      ORDER BY block_number DESC
    `;
    return await this.query(query, [address.toLowerCase()]);
  }

  /**
   * 获取投诉创建记录
   */
  static async getComplaintsByUser(address: string) {
    const query = `
      SELECT * FROM food_guard_indexer_food_safety_governance.complaint_created 
      WHERE complainant = $1 
      ORDER BY block_number DESC
    `;
    return await this.query(query, [address.toLowerCase()]);
  }

  /**
   * 获取案件状态更新记录
   */
  static async getCaseStatusUpdates(caseId?: number) {
    let query = `
      SELECT * FROM food_guard_indexer_food_safety_governance.case_status_updated 
    `;
    const params: any[] = [];
    
    if (caseId) {
      query += ` WHERE case_id = $1`;
      params.push(caseId.toString());
    }
    
    query += ` ORDER BY block_number DESC`;
    return await this.query(query, params);
  }

  /**
   * 获取投票记录
   */
  static async getUserVotes(address: string) {
    const query = `
      SELECT * FROM food_guard_indexer_voting_dispute_manager.vote_submitted 
      WHERE voter = $1 
      ORDER BY block_number DESC
    `;
    return await this.query(query, [address.toLowerCase()]);
  }

  /**
   * 获取奖惩记录
   */
  static async getUserRewards(address: string) {
    const query = `
      SELECT * FROM food_guard_indexer_reward_punishment_manager.reward_distributed 
      WHERE recipient = $1 
      ORDER BY block_number DESC
    `;
    return await this.query(query, [address.toLowerCase()]);
  }

  /**
   * 获取用户处罚记录
   */
  static async getUserPunishments(address: string) {
    const query = `
      SELECT * FROM food_guard_indexer_reward_punishment_manager.punishment_executed 
      WHERE target = $1 
      ORDER BY block_number DESC
    `;
    return await this.query(query, [address.toLowerCase()]);
  }

  /**
   * 获取所有案件列表
   */
  static async getAllCases(limit: number = 50, offset: number = 0) {
    const query = `
      SELECT 
        cc.*,
        csu.new_status as current_status,
        csu.timestamp as status_updated_at
      FROM food_guard_indexer_food_safety_governance.complaint_created cc
      LEFT JOIN (
        SELECT DISTINCT ON (case_id) 
          case_id, new_status, timestamp, block_number
        FROM food_guard_indexer_food_safety_governance.case_status_updated 
        ORDER BY case_id, block_number DESC
      ) csu ON cc.case_id = csu.case_id
      ORDER BY cc.block_number DESC
      LIMIT $1 OFFSET $2
    `;
    return await this.query(query, [limit, offset]);
  }

  /**
   * 获取用户统计信息
   */
  static async getUserStats(address: string) {
    const userAddress = address.toLowerCase();
    
    // 并行查询各种统计数据
    const [complaints, votes, deposits, rewards, punishments] = await Promise.all([
      this.getComplaintsByUser(userAddress),
      this.getUserVotes(userAddress),
      this.getUserDeposits(userAddress),
      this.getUserRewards(userAddress),
      this.getUserPunishments(userAddress)
    ]);

    return {
      totalComplaints: complaints.length,
      totalVotes: votes.length,
      totalDeposits: deposits.length,
      totalRewards: rewards.reduce((sum: bigint, r: any) => sum + BigInt(r.amount || 0), BigInt(0)),
      totalPunishments: punishments.reduce((sum: bigint, p: any) => sum + BigInt(p.amount || 0), BigInt(0)),
      latestActivity: Math.max(
        complaints[0]?.timestamp || 0,
        votes[0]?.timestamp || 0,
        deposits[0]?.timestamp || 0
      )
    };
  }

  /**
   * 测试数据库连接
   */
  static async testConnection() {
    try {
      const result = await this.query('SELECT NOW() as current_time');
      console.log('数据库连接成功:', result[0]);
      return true;
    } catch (error) {
      console.error('数据库连接失败:', error);
      return false;
    }
  }
}

// 导出数据库连接池供其他模块使用
export { pool }; 