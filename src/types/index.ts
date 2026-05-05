export const REQUIRED_ROLES = [
  "Owner",
  "Admin",
  "Quality Manager",
  "Team Leader",
  "Evaluator",
  "Viewer",
  "Integration Admin",
] as const;

export type RoleName = (typeof REQUIRED_ROLES)[number];

export type EntityId = string;
export type IsoDateString = string;

export type SubscriptionStatus = "trialing" | "active" | "past_due" | "canceled";
export type OrganizationStatus = "active" | "suspended" | "archived";
export type UserStatus = "invited" | "active" | "disabled";
export type SpecialistStatus = "active" | "inactive" | "on_leave";
export type TemplateStatus = "draft" | "published" | "archived";
export type CriterionType = "rating" | "boolean" | "text" | "choice";
export type EvaluationStatus = "draft" | "in_review" | "completed" | "voided";
export type ScoreSeverity = "excellent" | "good" | "warning" | "critical";
export type ReportStatus = "queued" | "ready" | "failed";
export type IntegrationProvider = "zendesk" | "intercom" | "salesforce" | "slack" | "custom";
export type IntegrationStatus = "connected" | "degraded" | "disabled";
export type WebhookEventType =
  | "evaluation.completed"
  | "report.ready"
  | "integration.failed"
  | "audit.created";
export type WebhookStatus = "active" | "paused" | "failing";
export type AuditAction =
  | "organization.created"
  | "user.invited"
  | "template.published"
  | "evaluation.completed"
  | "integration.connected"
  | "webhook.delivered"
  | "subscription.changed";

export interface TenantEntity {
  id: EntityId;
  organizationId: EntityId;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface SubscriptionPlan {
  id: EntityId;
  name: string;
  status: SubscriptionStatus;
  priceMonthly: number;
  currency: "USD" | "EUR" | "PLN";
  maxUsers: number;
  maxEvaluationsPerMonth: number;
  features: string[];
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface Organization {
  id: EntityId;
  name: string;
  slug: string;
  status: OrganizationStatus;
  subscriptionPlanId: EntityId;
  timezone: string;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface Role extends TenantEntity {
  name: RoleName;
  description: string;
  permissions: string[];
}

export interface User extends TenantEntity {
  email: string;
  displayName: string;
  status: UserStatus;
  roleIds: EntityId[];
  teamIds: EntityId[];
  lastSeenAt?: IsoDateString;
}

export interface Team extends TenantEntity {
  name: string;
  description: string;
  leaderId: EntityId;
  memberUserIds: EntityId[];
  specialistIds: EntityId[];
}

export interface Specialist extends TenantEntity {
  displayName: string;
  externalRef: string;
  teamId: EntityId;
  status: SpecialistStatus;
  channels: string[];
}

export interface ScoreRule {
  id: EntityId;
  label: string;
  minPercentage: number;
  maxPercentage: number;
  severity: ScoreSeverity;
}

export interface EvaluationCriterion extends TenantEntity {
  sectionId: EntityId;
  label: string;
  description: string;
  type: CriterionType;
  weight: number;
  maxScore: number;
  required: boolean;
  options?: string[];
}

export interface EvaluationSection extends TenantEntity {
  templateId: EntityId;
  title: string;
  description: string;
  weight: number;
  criterionIds: EntityId[];
}

export interface EvaluationTemplate extends TenantEntity {
  name: string;
  description: string;
  status: TemplateStatus;
  version: number;
  sectionIds: EntityId[];
  scoreRules: ScoreRule[];
}

export interface EvaluationAnswer extends TenantEntity {
  evaluationId: EntityId;
  criterionId: EntityId;
  score: number;
  maxScore: number;
  value: string | number | boolean;
  notes?: string;
}

export interface Evaluation extends TenantEntity {
  templateId: EntityId;
  specialistId: EntityId;
  evaluatorId: EntityId;
  status: EvaluationStatus;
  answerIds: EntityId[];
  totalScore: number;
  maxScore: number;
  percentage: number;
  severity: ScoreSeverity;
  completedAt?: IsoDateString;
}

export interface Report extends TenantEntity {
  title: string;
  status: ReportStatus;
  periodStart: IsoDateString;
  periodEnd: IsoDateString;
  evaluationIds: EntityId[];
  generatedById: EntityId;
  summary: string;
}

export interface Webhook extends TenantEntity {
  integrationId: EntityId;
  url: string;
  events: WebhookEventType[];
  status: WebhookStatus;
  secretPreview: string;
  lastDeliveredAt?: IsoDateString;
}

export interface Integration extends TenantEntity {
  provider: IntegrationProvider;
  name: string;
  status: IntegrationStatus;
  connectedById: EntityId;
  webhookIds: EntityId[];
  lastSyncAt?: IsoDateString;
}

export interface AuditLog extends TenantEntity {
  actorUserId?: EntityId;
  action: AuditAction;
  targetType: string;
  targetId: EntityId;
  message: string;
  metadata: Record<string, string | number | boolean>;
}

export interface EvaluationScoreSummary {
  totalScore: number;
  maxScore: number;
  percentage: number;
  severity: ScoreSeverity;
}
