export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ProcessStatus = "open" | "in_progress" | "closed";

export type UiStats = {
  totalLost: number;
  totalFound: number;
  pendingApproval: number;
  approved: number;
  inProcess: number;
  totalUsers: number;
};
export type UiReport = {
  id: string;
  type: "lost" | "found";
  title: string;
  location: string;
  reporterName: string;
  createdAtISO: string;
  description?: string;
  approvalStatus: ApprovalStatus;
  processStatus: ProcessStatus;
};

export type UiUser = {
  id: string;
  name: string;
  email: string;
  status: "active" | "banned";
  role?: string;
};
