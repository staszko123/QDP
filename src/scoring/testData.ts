import type { ScoringEvaluationInput } from "./types";

export const scoringTestEvaluation: ScoringEvaluationInput = {
  id: "scoring-demo-001",
  title: "Support conversation quality check",
  sections: [
    {
      id: "resolution",
      title: "Resolution",
      weight: 60,
      criteria: [
        {
          id: "issue-solved",
          label: "Issue solved",
          sectionId: "resolution",
          maxScore: 5,
          weight: 3,
          score: 5,
          answer: 5,
          critical: true,
        },
        {
          id: "policy-accuracy",
          label: "Policy accuracy",
          sectionId: "resolution",
          maxScore: 5,
          weight: 2,
          score: 4,
          answer: true,
        },
      ],
    },
    {
      id: "communication",
      title: "Communication",
      weight: 40,
      criteria: [
        {
          id: "empathy",
          label: "Empathy",
          sectionId: "communication",
          maxScore: 5,
          weight: 2,
          score: 4,
          answer: 4,
        },
        {
          id: "next-steps",
          label: "Clear next steps",
          sectionId: "communication",
          maxScore: 5,
          weight: 1,
          score: 5,
          answer: "clear",
        },
      ],
    },
  ],
};

export const scoringCriticalFailureEvaluation: ScoringEvaluationInput = {
  ...scoringTestEvaluation,
  id: "scoring-demo-critical",
  sections: scoringTestEvaluation.sections.map((section) =>
    section.id === "resolution"
      ? {
          ...section,
          criteria: section.criteria.map((criterion) =>
            criterion.id === "issue-solved"
              ? { ...criterion, score: 0, criticalFailure: true }
              : criterion
          ),
        }
      : section
  ),
};
