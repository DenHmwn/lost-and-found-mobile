import { apiGet, apiPost, apiPut } from "./apiClient";
import { Endpoints } from "./endpoints";
import { BackendReport, BackendStats, BackendUser } from "../types/admin.backend";

type ApiEnvelope<T> = { data?: T };

function unwrap<T>(res: T | ApiEnvelope<T>): T {
  if (res && typeof res === "object" && "data" in res) {
    return (res as ApiEnvelope<T>).data as T;
  }
  return res as T;
}

function unwrapArray<T>(res: T[] | ApiEnvelope<T[]>): T[] {
  const data = unwrap(res);
  return Array.isArray(data) ? data : [];
}

function normalizeStatus(value: unknown): string {
  return String(value ?? "").trim().toUpperCase();
}

function isOnProgress(value: unknown): boolean {
  const s = normalizeStatus(value).replace(/\s+/g, "");
  return s === "ONPROGRESS" || s === "INPROGRESS" || s === "PROCESSING";
}

export const AdminService = {
  getStats: async (): Promise<BackendStats> => {
    const [lostRes, foundRes, usersRes] = await Promise.all([
      apiGet<BackendReport[] | ApiEnvelope<BackendReport[]>>(Endpoints.lostReports),
      apiGet<BackendReport[] | ApiEnvelope<BackendReport[]>>(Endpoints.foundReports),
      apiGet<BackendUser[] | ApiEnvelope<BackendUser[]>>(Endpoints.users),
    ]);

    const lost = unwrapArray(lostRes);
    const found = unwrapArray(foundRes);
    const users = unwrapArray(usersRes);

    const pendingApproval = lost.filter((r) => normalizeStatus(r?.status) === "PENDING").length;
    const approved = lost.filter((r) => normalizeStatus(r?.status) === "APPROVED").length;
    const inProcess = [...lost, ...found].filter((r) => isOnProgress(r?.statusReport)).length;

    return {
      totalLost: lost.length,
      totalFound: found.length,
      pendingApproval,
      approved,
      inProcess,
      totalUsers: users.length,
    };
  },

  listReports: async (type: "lost" | "found") => {
    const endpoint = type === "lost" ? Endpoints.lostReports : Endpoints.foundReports;
    const res = await apiGet<BackendReport[] | ApiEnvelope<BackendReport[]>>(endpoint);
    return unwrapArray(res);
  },

  getReportById: async (id: string, type: "lost" | "found") => {
    const endpoint = type === "lost" ? Endpoints.lostReportDetail(id) : Endpoints.foundReportDetail(id);
    const res = await apiGet<BackendReport | ApiEnvelope<BackendReport>>(endpoint);
    return unwrap(res);
  },

  createFoundReport: (payload: {
    title: string;
    location: string;
    reporterName: string;
    description?: string;
  }) =>
    apiPost(Endpoints.foundReports, {
      type: "found",
      ...payload,
    }),

  approve: (id: string, type: "lost" | "found") => {
    if (type === "lost") {
      return apiPut(Endpoints.lostReportDetail(id), { status: "APPROVED" });
    }
    return apiPut(Endpoints.foundReportDetail(id), { statusReport: "OnProgress" });
  },
  reject: (id: string, type: "lost" | "found") => {
    if (type === "lost") {
      return apiPut(Endpoints.lostReportDetail(id), { status: "REJECTED" });
    }
    return apiPut(Endpoints.foundReportDetail(id), { statusReport: "Closed" });
  },
  done: (id: string, type: "lost" | "found") => {
    const endpoint = type === "lost" ? Endpoints.lostReportDetail(id) : Endpoints.foundReportDetail(id);
    return apiPut(endpoint, { statusReport: "Done" });
  },
  close: (id: string, type: "lost" | "found") => {
    const endpoint = type === "lost" ? Endpoints.lostReportDetail(id) : Endpoints.foundReportDetail(id);
    return apiPut(endpoint, { statusReport: "Closed" });
  },

  listUsers: async () => {
    const res = await apiGet<BackendUser[] | ApiEnvelope<BackendUser[]>>(Endpoints.users);
    return unwrapArray(res);
  },
};

