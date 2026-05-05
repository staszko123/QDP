import { mockOrganizations } from "../data";
import { findRecordById } from "../lib";
import type { EntityId, Organization } from "../types";

export const organizationService = {
  async listOrganizations(): Promise<Organization[]> {
    return [...mockOrganizations];
  },

  async getOrganization(id: EntityId): Promise<Organization | undefined> {
    return findRecordById(mockOrganizations, id);
  },
};
