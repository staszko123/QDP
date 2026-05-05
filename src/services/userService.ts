import { mockRoles, mockUsers } from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type { EntityId, Role, User } from "../types";

export const userService = {
  async listUsers(organizationId: EntityId): Promise<User[]> {
    return byOrganization(mockUsers, organizationId);
  },

  async getUser(organizationId: EntityId, id: EntityId): Promise<User | undefined> {
    return findTenantRecord(mockUsers, organizationId, id);
  },

  async listRoles(organizationId: EntityId): Promise<Role[]> {
    return byOrganization(mockRoles, organizationId);
  },

  async inviteUser(input: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const timestamp = new Date().toISOString();

    return {
      ...input,
      id: `user-${crypto.randomUUID()}`,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  },
};
