import type {
  CriterionScore,
  QualityStatus,
  ScoreSummary,
  ScoringCriterionInput,
  ScoringEvaluationInput,
  ScoringSectionInput,
  ScoringThreshold,
  SectionScore,
  TotalScore,
} from "./types";

export const DEFAULT_SCORING_THRESHOLDS: ScoringThreshold[] = [
  { status: "Dobry", minPercentage: 85, maxPercentage: 100 },
  { status: "Wymaga uwagi", minPercentage: 70, maxPercentage: 84.99 },
  { status: "Słaby", minPercentage: 50, maxPercentage: 69.99 },
  { status: "Krytyczny", minPercentage: 0, maxPercentage: 49.99 },
];

export function calculateCriterionScore(criterion: ScoringCriterionInput): CriterionScore {
  const maxScore = normalizePositiveNumber(criterion.maxScore);
  const weight = normalizePositiveNumber(criterion.weight);
  const rawScore = clamp(criterion.score ?? 0, 0, maxScore);
  const percentage = maxScore === 0 ? 0 : round((rawScore / maxScore) * 100);
  const critical = criterion.critical ?? false;
  const criticalFailure = critical && (criterion.criticalFailure === true || rawScore === 0);

  return {
    criterionId: criterion.id,
    label: criterion.label,
    score: rawScore,
    maxScore,
    weight,
    weightedScore: round(rawScore * weight),
    weightedMaxScore: round(maxScore * weight),
    percentage,
    critical,
    criticalFailure,
    answered: criterion.answer !== undefined && criterion.answer !== null,
  };
}

export function calculateSectionScore(section: ScoringSectionInput): SectionScore {
  const criteria = section.criteria.map(calculateCriterionScore);
  const score = sum(criteria.map((criterion) => criterion.score));
  const maxScore = sum(criteria.map((criterion) => criterion.maxScore));
  const weightedScore = sum(criteria.map((criterion) => criterion.weightedScore));
  const weightedMaxScore = sum(criteria.map((criterion) => criterion.weightedMaxScore));
  const percentage = weightedMaxScore === 0 ? 0 : round((weightedScore / weightedMaxScore) * 100);

  return {
    sectionId: section.id,
    title: section.title,
    score: round(score),
    maxScore: round(maxScore),
    weight: normalizePositiveNumber(section.weight),
    weightedScore: round(weightedScore),
    weightedMaxScore: round(weightedMaxScore),
    percentage,
    criteria,
    criticalFailures: criteria.filter((criterion) => criterion.criticalFailure),
  };
}

export function calculateTotalScore(evaluation: ScoringEvaluationInput): TotalScore {
  const sections = evaluation.sections.map(calculateSectionScore);
  const sectionWeightTotal = sum(sections.map((section) => section.weight));
  const weightedScore = sum(
    sections.map((section) => {
      const normalizedSectionWeight =
        sectionWeightTotal === 0 ? 0 : section.weight / sectionWeightTotal;

      return section.percentage * normalizedSectionWeight;
    })
  );
  const score = sum(sections.map((section) => section.score));
  const maxScore = sum(sections.map((section) => section.maxScore));

  return {
    evaluationId: evaluation.id,
    score: round(score),
    maxScore: round(maxScore),
    weightedScore: round(weightedScore),
    weightedMaxScore: 100,
    percentage: round(weightedScore),
    sections,
    criticalFailures: detectCriticalFailures(sections),
  };
}

export function calculateQualityStatus(
  percentage: number,
  criticalFailures: CriterionScore[] = [],
  thresholds: ScoringThreshold[] = DEFAULT_SCORING_THRESHOLDS
): QualityStatus {
  if (criticalFailures.length > 0) {
    return "Krytyczny";
  }

  return (
    thresholds.find(
      (threshold) =>
        percentage >= threshold.minPercentage && percentage <= threshold.maxPercentage
    )?.status ?? "Krytyczny"
  );
}

export function detectCriticalFailures(
  input: SectionScore[] | ScoringEvaluationInput
): CriterionScore[] {
  const sections = Array.isArray(input) ? input : input.sections.map(calculateSectionScore);

  return sections.flatMap((section) =>
    section.criteria.filter((criterion) => criterion.criticalFailure)
  );
}

export function generateScoreSummary(evaluation: ScoringEvaluationInput): ScoreSummary {
  const total = calculateTotalScore(evaluation);
  const status = calculateQualityStatus(
    total.percentage,
    total.criticalFailures,
    evaluation.thresholds
  );

  return {
    ...total,
    status,
    passed: status === "Dobry" || status === "Wymaga uwagi",
    summary: buildSummaryText(status, total),
  };
}

function buildSummaryText(status: QualityStatus, total: TotalScore): string {
  if (total.criticalFailures.length > 0) {
    return `${status}: ${total.criticalFailures.length} kryterium krytyczne wymaga natychmiastowej reakcji.`;
  }

  return `${status}: wynik ${total.percentage}% (${total.score}/${total.maxScore} pkt).`;
}

function normalizePositiveNumber(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
