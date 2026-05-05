import type { EntityId, TenantEntity } from "../types";

export function byOrganization<T extends TenantEntity>(
  records: T[],
  organizationId: EntityId
): T[] {
  return records.filter((record) => record.organizationId === organizationId);
}

export function findTenantRecord<T extends TenantEntity>(
  records: T[],
  organizationId: EntityId,
  id: EntityId
): T | undefined {
  return records.find(
    (record) => record.organizationId === organizationId && record.id === id
  );
}

export function findRecordById<T extends { id: EntityId }>(
  records: T[],
  id: EntityId
): T | undefined {
  return records.find((record) => record.id === id);
}
