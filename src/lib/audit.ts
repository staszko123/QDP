import type { AuditAction, AuditLog, EntityId } from "../types";

interface CreateAuditEventInput {
  organizationId: EntityId;
  actorUserId?: EntityId;
  action: AuditAction;
  targetType: string;
  targetId: EntityId;
  message: string;
  metadata?: AuditLog["metadata"];
}

export function createAuditEvent(input: CreateAuditEventInput): AuditLog {
  const timestamp = new Date().toISOString();

  return {
    id: `audit-${crypto.randomUUID()}`,
    organizationId: input.organizationId,
    actorUserId: input.actorUserId,
    action: input.action,
    targetType: input.targetType,
    targetId: input.targetId,
    message: input.message,
    metadata: input.metadata ?? {},
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
