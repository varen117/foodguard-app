import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// 定义数据接口
interface ComplaintCreatedEvent {
  rindexer_id: number;
  case_id: string;
  complainant: string;
  enterprise: string;
  complaint_title: string;
  risk_level: number;
  timestamp: string;
  block_number: number;
  tx_hash: string;
  contract_address: string;
}

interface CaseStatusUpdatedEvent {
  rindexer_id: number;
  case_id: string;
  old_status: number;
  new_status: number;
  timestamp: string;
  block_number: number;
  tx_hash: string;
  contract_address: string;
}

interface CaseQueryResponse {
  data: {
    allComplaintCreateds: {
      nodes: ComplaintCreatedEvent[];
    };
    allCaseStatusUpdateds: {
      nodes: CaseStatusUpdatedEvent[];
    };
  };
}

// 定义提取的案件数据类型
interface CaseData {
  caseId: string;
  complainant: string;
  enterprise: string;
  complaintTitle: string;
  riskLevel: number;
  status: number;
  timestamp: string;
}

// GraphQL 查询字符串
const GET_RECENT_CASES = `
  query GetRecentCases {
    allComplaintCreateds(
      first: 50,
      orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC, LOG_INDEX_DESC]
    ) {
      nodes {
        rindexer_id
        case_id
        complainant
        enterprise
        complaint_title
        risk_level
        timestamp
        block_number
        tx_hash
        contract_address
      }
    }
    
    allCaseStatusUpdateds {
      nodes {
        case_id
        new_status
        timestamp
      }
    }
  }
`;

// 获取数据的函数
async function fetchCases(): Promise<CaseQueryResponse> {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_RECENT_CASES,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

// 自定义 hook 用于获取和处理案件数据
export function useRecentCases() {
  const { data, isLoading, error } = useQuery<CaseQueryResponse>({
    queryKey: ["recentCases"],
    queryFn: fetchCases,
  });

  // 使用 useMemo 避免在数据未变化时重新处理
  const caseDataList = useMemo(() => {
    if (!data) return [];

    // 创建案件状态映射，用于快速查找最新状态
    const caseStatusMap = new Map<string, number>();
    data.data.allCaseStatusUpdateds.nodes.forEach(statusEvent => {
      const existingStatus = caseStatusMap.get(statusEvent.case_id);
      if (!existingStatus || new Date(statusEvent.timestamp) > new Date(existingStatus.toString())) {
        caseStatusMap.set(statusEvent.case_id, statusEvent.new_status);
      }
    });

    // 处理投诉创建事件，获取前20个最新的案件
    const recentCases = data.data.allComplaintCreateds.nodes.slice(0, 20);

    // 提取需要的数据
    return recentCases.map(complaint => ({
      caseId: complaint.case_id,
      complainant: complaint.complainant,
      enterprise: complaint.enterprise,
      complaintTitle: complaint.complaint_title,
      riskLevel: complaint.risk_level,
      status: caseStatusMap.get(complaint.case_id) || 0, // 默认状态为 0 (PENDING)
      timestamp: complaint.timestamp,
    }));
  }, [data]);

  return { isLoading, error, caseDataList };
}

// 获取用户相关案件的 hook
export function useUserCases(userAddress?: string) {
  const { data, isLoading, error } = useQuery<CaseQueryResponse>({
    queryKey: ["userCases", userAddress],
    queryFn: fetchCases,
    enabled: !!userAddress,
  });

  const userCaseDataList = useMemo(() => {
    if (!data || !userAddress) return [];

    const userAddress_lower = userAddress.toLowerCase();
    
    // 筛选与用户相关的案件（作为投诉者或企业）
    const userRelatedCases = data.data.allComplaintCreateds.nodes.filter(complaint => 
      complaint.complainant.toLowerCase() === userAddress_lower || 
      complaint.enterprise.toLowerCase() === userAddress_lower
    );

    // 创建案件状态映射
    const caseStatusMap = new Map<string, number>();
    data.data.allCaseStatusUpdateds.nodes.forEach(statusEvent => {
      const existingStatus = caseStatusMap.get(statusEvent.case_id);
      if (!existingStatus || new Date(statusEvent.timestamp) > new Date(existingStatus.toString())) {
        caseStatusMap.set(statusEvent.case_id, statusEvent.new_status);
      }
    });

    return userRelatedCases.map(complaint => ({
      caseId: complaint.case_id,
      complainant: complaint.complainant,
      enterprise: complaint.enterprise,
      complaintTitle: complaint.complaint_title,
      riskLevel: complaint.risk_level,
      status: caseStatusMap.get(complaint.case_id) || 0,
      timestamp: complaint.timestamp,
      isComplainant: complaint.complainant.toLowerCase() === userAddress_lower,
      isEnterprise: complaint.enterprise.toLowerCase() === userAddress_lower,
    }));
  }, [data, userAddress]);

  return { isLoading, error, userCaseDataList };
} 