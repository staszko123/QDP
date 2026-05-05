import { mockReports } from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type { EntityId, Report } from "../types";

export const reportService = {
  async listReports(organizationId: EntityId): Promise<Report[]> {
    return byOrganization(mockReports, organizationId);
  },

  async getReport(organizationId: EntityId, id: EntityId): Promise<Report | undefined> {
    return findTenantRecord(mockReports, organizationId, id);
  },
};
