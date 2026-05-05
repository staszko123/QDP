import { mockAuditLogs } from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type { AuditAction, AuditLog, EntityId } from "../types";

interface AuditLogFilters {
  action?: AuditAction;
  actorUserId?: EntityId;
  targetType?: string;
}

export const auditLogService = {
  async listAuditLogs(
    organizationId: EntityId,
    filters: AuditLogFilters = {}
  ): Promise<AuditLog[]> {
    return byOrganization(mockAuditLogs, organizationId).filter((log) => {
      return (
        (!filters.action || log.action === filters.action) &&
        (!filters.actorUserId || log.actorUserId === filters.actorUserId) &&
        (!filters.targetType || log.targetType === filters.targetType)
      );
    });
  },

  async getAuditLog(organizationId: EntityId, id: EntityId): Promise<AuditLog | undefined> {
    return findTenantRecord(mockAuditLogs, organizationId, id);
  },
};
