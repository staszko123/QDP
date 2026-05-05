import { mockOrganizations, mockSubscriptionPlans } from "../data";
import { findRecordById } from "../lib";
import type { EntityId, SubscriptionPlan } from "../types";

export const subscriptionService = {
  async listPlans(): Promise<SubscriptionPlan[]> {
    return [...mockSubscriptionPlans];
  },

  async getPlan(id: EntityId): Promise<SubscriptionPlan | undefined> {
    return findRecordById(mockSubscriptionPlans, id);
  },

  async getOrganizationPlan(
    organizationId: EntityId
  ): Promise<SubscriptionPlan | undefined> {
    const organization = findRecordById(mockOrganizations, organizationId);

    return organization
      ? findRecordById(mockSubscriptionPlans, organization.subscriptionPlanId)
      : undefined;
  },
};
