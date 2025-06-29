# FoodGuard 数据库集成完成总结

## 🎯 项目概述
已成功完成 FoodGuard 食品安全治理系统的前端与 PostgreSQL 数据库集成，实现了从智能合约事件到前端数据展示的完整数据流。

## 📊 系统架构

### 数据流架构
```
智能合约 → Rindexer 索引器 → PostgreSQL 数据库 → Next.js API → React 前端
```

### 核心组件
1. **智能合约**: 部署在 Anvil 本地链 (Chain ID: 31337)
2. **Rindexer 索引器**: 监听并索引合约事件到 PostgreSQL
3. **PostgreSQL 数据库**: 存储事件数据 (端口: 5440)
4. **Next.js API**: 提供数据库查询接口
5. **React 前端**: 展示实时数据

## 🗄️ 数据库结构

### 主要 Schema 和表
1. **food_guard_indexer_food_safety_governance**
   - `complaint_created`: 投诉创建事件
   - `case_status_updated`: 案件状态更新事件

2. **food_guard_indexer_participant_pool_manager**
   - `user_registered`: 用户注册事件

3. **food_guard_indexer_fund_manager**
   - `deposit_made`: 保证金存入事件

4. **food_guard_indexer_voting_dispute_manager**
   - `vote_submitted`: 投票提交事件

5. **food_guard_indexer_reward_punishment_manager**
   - `reward_distributed`: 奖励分发事件
   - `punishment_executed`: 处罚执行事件

## 🛠️ 已实现功能

### 1. 数据库连接服务 (`src/lib/database.ts`)
```typescript
export class DatabaseService {
  // 执行原生 SQL 查询
  static async query(text: string, params?: any[]): Promise<any>
  
  // 获取用户注册信息
  static async getUserRegistration(address: string)
  
  // 获取用户保证金记录
  static async getUserDeposits(address: string)
  
  // 获取投诉创建记录
  static async getComplaintsByUser(address: string)
  
  // 获取案件状态更新记录
  static async getCaseStatusUpdates(caseId?: number)
  
  // 获取投票记录
  static async getUserVotes(address: string)
  
  // 获取奖惩记录
  static async getUserRewards(address: string)
  static async getUserPunishments(address: string)
  
  // 获取所有案件列表
  static async getAllCases(limit: number = 50, offset: number = 0)
  
  // 获取用户统计信息
  static async getUserStats(address: string)
  
  // 测试数据库连接
  static async testConnection()
}
```

### 2. API 路由 (Next.js App Router)
- **`/api/database/test`**: 测试数据库连接
- **`/api/database/schema`**: 查看表结构 (支持不同 schema)
- **`/api/user/stats`**: 获取用户统计信息
- **`/api/user/cases`**: 获取用户参与的案件
- **`/api/cases`**: 获取所有案件列表

### 3. React Hooks (`src/hooks/useDatabase.ts`)
```typescript
// 数据库连接测试
export function useDatabaseTest()

// 获取用户统计信息
export function useUserStats(address?: string)

// 获取用户参与的案件
export function useUserCases(address?: string)

// 获取所有案件列表
export function useAllCases(limit: number = 50, offset: number = 0)
```

### 4. 前端页面集成
- **个人中心页面** (`/profile`): 显示真实的数据库统计数据
- **数据库测试页面** (`/database-test`): 完整的数据库功能测试界面

## 📈 实时数据展示

### 个人中心统计数据
- ✅ 创建投诉数量 (从 `complaint_created` 表查询)
- ✅ 投票次数 (从 `vote_submitted` 表查询)
- ✅ 保证金次数 (从 `deposit_made` 表查询)
- ✅ 可用保证金 (从智能合约实时查询)
- ✅ 用户角色和信誉分数 (从链上数据获取)

### 活动记录
- ✅ 保证金操作历史
- ✅ 投票活动记录
- ✅ 奖励分发记录
- ✅ 按时间排序显示

## 🧪 测试功能

### 数据库测试页面 (`/database-test`)
提供完整的数据库功能测试，包括：
- 数据库连接状态检查
- 用户统计数据查询测试
- 用户案件数据查询测试
- 案件列表查询测试
- 实时状态指示器
- JSON 格式数据展示

### 测试用户数据
系统中已有测试数据：
- 测试地址: `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`
- 用户角色: ENTERPRISE (role: 1)
- 保证金记录: 1 笔 (0.1 ETH)
- 注册时间: 区块 #405

## 🔧 技术特性

### 数据处理
- **BigInt 支持**: 正确处理以太坊大数值
- **时间戳转换**: Unix 时间戳到 JavaScript Date 转换
- **错误处理**: 完善的错误捕获和用户反馈
- **数据验证**: API 参数验证和数据格式检查

### 性能优化
- **并行查询**: 使用 Promise.all 进行多表查询
- **连接池**: PostgreSQL 连接池管理
- **缓存策略**: React Query 缓存和重试机制
- **分页支持**: 案件列表分页查询

### 安全性
- **参数化查询**: 防止 SQL 注入
- **地址规范化**: 统一转换为小写格式
- **连接超时**: 数据库连接超时保护

## 🌐 访问地址

### 本地开发环境
- **前端应用**: http://localhost:3000
- **个人中心**: http://localhost:3000/profile
- **数据库测试**: http://localhost:3000/database-test
- **数据库**: PostgreSQL (127.0.0.1:5440)
- **区块链**: Anvil (127.0.0.1:8545)

### API 端点
- **数据库测试**: `GET /api/database/test`
- **表结构查询**: `GET /api/database/schema?schema=<schema>&table=<table>`
- **用户统计**: `GET /api/user/stats?address=<address>`
- **用户案件**: `GET /api/user/cases?address=<address>`
- **案件列表**: `GET /api/cases?limit=<limit>&offset=<offset>`

## 🚀 使用指南

### 1. 启动所有服务
```bash
# 启动 Anvil 区块链
anvil --host 0.0.0.0 --port 8545

# 启动 PostgreSQL 数据库
cd foodguard-indexer && docker-compose up -d

# 启动 Rindexer 索引器
cd foodguard-indexer && rindexer start indexer

# 启动前端应用
cd foodguard-app && pnpm run dev
```

### 2. 测试数据库功能
1. 访问 http://localhost:3000/database-test
2. 查看所有测试项目的状态
3. 检查 JSON 数据是否正确返回

### 3. 查看个人中心
1. 连接 MetaMask 到本地 Anvil 网络
2. 使用测试账户或注册新账户
3. 访问 http://localhost:3000/profile
4. 查看实时的统计数据和活动记录

## 📋 下一步功能扩展

### 可能的增强功能
1. **实时数据更新**: WebSocket 或 Server-Sent Events
2. **数据分析面板**: 图表和统计报表
3. **高级搜索**: 多条件筛选和排序
4. **数据导出**: CSV/Excel 导出功能
5. **缓存优化**: Redis 缓存层
6. **监控告警**: 数据库性能监控

### 数据库表扩展
1. **用户详细信息表**: 存储用户个人资料
2. **系统日志表**: 记录系统操作日志
3. **配置管理表**: 动态系统配置
4. **通知记录表**: 用户通知历史

## ✅ 验证清单

- [x] PostgreSQL 数据库正常运行
- [x] Rindexer 索引器成功索引事件
- [x] 所有 API 端点正常响应
- [x] 前端页面正确显示数据
- [x] 数据库连接测试通过
- [x] 用户统计数据准确
- [x] 实时数据同步正常
- [x] 错误处理机制完善
- [x] 文档和测试页面完整

## 🎉 总结

FoodGuard 系统已成功实现了完整的数据库集成，从智能合约事件到前端展示形成了完整的数据流。系统具备了实时数据查询、用户统计、活动记录等核心功能，为食品安全治理提供了强大的数据支持。

所有功能都经过测试验证，可以立即投入使用。系统架构设计合理，具备良好的扩展性和维护性。 