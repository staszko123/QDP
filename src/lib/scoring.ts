import { mockEvaluationAnswers } from "../data";
import {
  calculateQualityStatus,
  calculateTotalScore,
  type ScoringEvaluationInput,
} from "../scoring";
import type { Evaluation, EvaluationScoreSummary, ScoreRule, ScoreSeverity } from "../types";

const defaultSeverity: ScoreSeverity = "critical";

export function resolveSeverity(
  percentage: number,
  scoreRules: ScoreRule[]
): ScoreSeverity {
  return (
    scoreRules.find(
      (rule) => percentage >= rule.minPercentage && percentage <= rule.maxPercentage
    )?.severity ?? defaultSeverity
  );
}

export function calculateEvaluationScore(
  evaluation: Evaluation,
  scoreRules: ScoreRule[] = []
): EvaluationScoreSummary {
  const answers = mockEvaluationAnswers.filter((answer) =>
    evaluation.answerIds.includes(answer.id)
  );
  const scoringInput: ScoringEvaluationInput = {
    id: evaluation.id,
    title: evaluation.id,
    sections: [
      {
        id: `${evaluation.id}-section`,
        title: "Evaluation",
        weight: 100,
        criteria: answers.map((answer) => ({
          id: answer.criterionId,
          label: answer.criterionId,
          sectionId: `${evaluation.id}-section`,
          maxScore: answer.maxScore,
          weight: 1,
          score: answer.score,
          answer: answer.value,
        })),
      },
    ],
  };
  const total = calculateTotalScore(scoringInput);
  const qualityStatus = calculateQualityStatus(total.percentage, total.criticalFailures);

  return {
    totalScore: total.score,
    maxScore: total.maxScore,
    percentage: total.percentage,
    severity:
      scoreRules.length > 0 ? resolveSeverity(total.percentage, scoreRules) : mapStatusToSeverity(qualityStatus),
  };
}

function mapStatusToSeverity(status: ReturnType<typeof calculateQualityStatus>): ScoreSeverity {
  if (status === "Dobry") {
    return "excellent";
  }

  if (status === "Wymaga uwagi") {
    return "good";
  }

  if (status === "Słaby") {
    return "warning";
  }

  return "critical";
}
