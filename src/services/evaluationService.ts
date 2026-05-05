import { mockEvaluationAnswers, mockEvaluations, mockEvaluationTemplates } from "../data";
import { byOrganization, calculateEvaluationScore, findTenantRecord } from "../lib";
import type {
  EntityId,
  Evaluation,
  EvaluationAnswer,
  EvaluationScoreSummary,
} from "../types";

export const evaluationService = {
  async listEvaluations(organizationId: EntityId): Promise<Evaluation[]> {
    return byOrganization(mockEvaluations, organizationId);
  },

  async getEvaluation(
    organizationId: EntityId,
    id: EntityId
  ): Promise<Evaluation | undefined> {
    return findTenantRecord(mockEvaluations, organizationId, id);
  },

  async listAnswers(organizationId: EntityId, evaluationId: EntityId): Promise<EvaluationAnswer[]> {
    return byOrganization(mockEvaluationAnswers, organizationId).filter(
      (answer) => answer.evaluationId === evaluationId
    );
  },

  calculateEvaluationScore(evaluation: Evaluation): EvaluationScoreSummary {
    const template = mockEvaluationTemplates.find(
      (item) =>
        item.organizationId === evaluation.organizationId && item.id === evaluation.templateId
    );

    return calculateEvaluationScore(evaluation, template?.scoreRules ?? []);
  },

  async createDraftEvaluation(
    input: Pick<Evaluation, "organizationId" | "templateId" | "specialistId" | "evaluatorId">
  ): Promise<Evaluation> {
    const timestamp = new Date().toISOString();

    return {
      ...input,
      id: `evaluation-${crypto.randomUUID()}`,
      status: "draft",
      answerIds: [],
      totalScore: 0,
      maxScore: 0,
      percentage: 0,
      severity: "critical",
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  },
};
