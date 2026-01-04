import { apiGet, apiPatch, apiPost } from "./apiClient";
import { Endpoints } from "./endpoints";
import { BackendReport, BackendStats, BackendUser } from "../types/admin.backend";


export const AdminService = {
  getStats: () => apiGet<BackendStats>(Endpoints.stats),

  listReports: (type: "lost" | "found") =>
    apiGet<BackendReport[]>(`${Endpoints.reports}?type=${type}`),

  getReportById: (id: string) => apiGet<BackendReport>(Endpoints.reportDetail(id)),

  createFoundReport: (payload: {
    title: string;
    location: string;
    reporterName: string;
    description?: string;
  }) =>
    apiPost(Endpoints.reports, {
      type: "found",
      ...payload,
    }),
};
