import { mockTeams } from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type { EntityId, Team } from "../types";

export const teamService = {
  async listTeams(organizationId: EntityId): Promise<Team[]> {
    return byOrganization(mockTeams, organizationId);
  },

  async getTeam(organizationId: EntityId, id: EntityId): Promise<Team | undefined> {
    return findTenantRecord(mockTeams, organizationId, id);
  },
};
