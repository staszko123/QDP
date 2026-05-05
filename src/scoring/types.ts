export type QualityStatus = "Dobry" | "Wymaga uwagi" | "Słaby" | "Krytyczny";

export type ScoringAnswerValue = string | number | boolean | null;

export interface ScoringThreshold {
  status: QualityStatus;
  minPercentage: number;
  maxPercentage: number;
}

export interface ScoringCriterionInput {
  id: string;
  label: string;
  sectionId: string;
  maxScore: number;
  weight: number;
  score?: number;
  answer?: ScoringAnswerValue;
  critical?: boolean;
  criticalFailure?: boolean;
  required?: boolean;
}

export interface ScoringSectionInput {
  id: string;
  title: string;
  weight: number;
  criteria: ScoringCriterionInput[];
}

export interface ScoringEvaluationInput {
  id: string;
  title: string;
  sections: ScoringSectionInput[];
  thresholds?: ScoringThreshold[];
}

export interface CriterionScore {
  criterionId: string;
  label: string;
  score: number;
  maxScore: number;
  weight: number;
  weightedScore: number;
  weightedMaxScore: number;
  percentage: number;
  critical: boolean;
  criticalFailure: boolean;
  answered: boolean;
}

export interface SectionScore {
  sectionId: string;
  title: string;
  score: number;
  maxScore: number;
  weight: number;
  weightedScore: number;
  weightedMaxScore: number;
  percentage: number;
  criteria: CriterionScore[];
  criticalFailures: CriterionScore[];
}

export interface TotalScore {
  evaluationId: string;
  score: number;
  maxScore: number;
  weightedScore: number;
  weightedMaxScore: number;
  percentage: number;
  sections: SectionScore[];
  criticalFailures: CriterionScore[];
}

export interface ScoreSummary extends TotalScore {
  status: QualityStatus;
  passed: boolean;
  summary: string;
}
