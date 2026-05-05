import {
  mockEvaluationCriteria,
  mockEvaluationSections,
  mockEvaluationTemplates,
} from "../data";
import { byOrganization, findTenantRecord } from "../lib";
import type {
  EntityId,
  EvaluationCriterion,
  EvaluationSection,
  EvaluationTemplate,
} from "../types";

export const templateService = {
  async listTemplates(organizationId: EntityId): Promise<EvaluationTemplate[]> {
    return byOrganization(mockEvaluationTemplates, organizationId);
  },

  async getTemplate(
    organizationId: EntityId,
    id: EntityId
  ): Promise<EvaluationTemplate | undefined> {
    return findTenantRecord(mockEvaluationTemplates, organizationId, id);
  },

  async listSections(organizationId: EntityId, templateId: EntityId): Promise<EvaluationSection[]> {
    return byOrganization(mockEvaluationSections, organizationId).filter(
      (section) => section.templateId === templateId
    );
  },

  async listCriteria(organizationId: EntityId, sectionId: EntityId): Promise<EvaluationCriterion[]> {
    return byOrganization(mockEvaluationCriteria, organizationId).filter(
      (criterion) => criterion.sectionId === sectionId
    );
  },
};
