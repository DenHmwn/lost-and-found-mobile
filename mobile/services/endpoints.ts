export const Endpoints = {
  lostReports: "/lostreport",
  foundReports: "/foundreport",
  lostReportDetail: (id: string) => `/lostreport/${id}`,
  foundReportDetail: (id: string) => `/foundreport/${id}`,
  users: "/user",
};
