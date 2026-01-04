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
