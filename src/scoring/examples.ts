import {
  calculateCriterionScore,
  calculateSectionScore,
  calculateTotalScore,
  detectCriticalFailures,
  generateScoreSummary,
} from "./engine";
import { scoringCriticalFailureEvaluation, scoringTestEvaluation } from "./testData";

const firstSection = scoringTestEvaluation.sections[0];
const firstCriterion = firstSection.criteria[0];

export const scoringExamples = {
  criterion: calculateCriterionScore(firstCriterion),
  section: calculateSectionScore(firstSection),
  total: calculateTotalScore(scoringTestEvaluation),
  criticalFailures: detectCriticalFailures(scoringCriticalFailureEvaluation),
  summary: generateScoreSummary(scoringTestEvaluation),
  criticalSummary: generateScoreSummary(scoringCriticalFailureEvaluation),
};
