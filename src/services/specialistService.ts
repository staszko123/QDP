import { mockSpecialists } from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type { EntityId, Specialist } from "../types";

export const specialistService = {
  async listSpecialists(organizationId: EntityId): Promise<Specialist[]> {
    return byOrganization(mockSpecialists, organizationId);
  },

  async getSpecialist(
    organizationId: EntityId,
    id: EntityId
  ): Promise<Specialist | undefined> {
    return findTenantRecord(mockSpecialists, organizationId, id);
  },
};
