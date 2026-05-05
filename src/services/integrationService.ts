import { mockIntegrations, mockWebhooks } from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type { EntityId, Integration, Webhook } from "../types";

export const integrationService = {
  async listIntegrations(organizationId: EntityId): Promise<Integration[]> {
    return byOrganization(mockIntegrations, organizationId);
  },

  async getIntegration(
    organizationId: EntityId,
    id: EntityId
  ): Promise<Integration | undefined> {
    return findTenantRecord(mockIntegrations, organizationId, id);
  },

  async listWebhooks(organizationId: EntityId, integrationId?: EntityId): Promise<Webhook[]> {
    const webhooks = byOrganization(mockWebhooks, organizationId);

    return integrationId
      ? webhooks.filter((webhook) => webhook.integrationId === integrationId)
      : webhooks;
  },
};
