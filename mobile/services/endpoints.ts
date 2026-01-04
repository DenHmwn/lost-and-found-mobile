export const Endpoints = {
  stats: "/admin/stats",
  reports: "/reports",
  reportDetail: (id: string) => `/reports/${id}`,
  approve: (id: string) => `/reports/${id}/approve`,
  reject: (id: string) => `/reports/${id}/reject`,
  done: (id: string) => `/reports/${id}/done`,
  close: (id: string) => `/reports/${id}/close`,
  users: "/users",
};
