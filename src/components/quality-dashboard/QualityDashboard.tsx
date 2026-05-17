import { Fragment, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  ClipboardCheck,
  LineChart,
  MessageSquareText,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import {
  dashboardFilters,
  downgradedCriteria,
  formComparison,
  heatmap,
  qualityKpis,
  qualityTrend,
  specialistScores,
  statusDistribution,
  teamScores,
  type HeatmapCell,
  type QualityBarDatum,
  type QualityStatus,
  type QualityTrendPoint,
  type StatusDatum,
} from "./mockQualityDashboard";
import { AIInsightsPanel } from "./AIInsightsPanel";
import { Card, EmptyState, Select, SectionHeader, StatCard, StatusPill } from "../ui";

const statusTone: Record<QualityStatus, "success" | "warning" | "danger" | "neutral"> = {
  Dobry: "success",
  "Wymaga uwagi": "warning",
  Słaby: "danger",
  Krytyczny: "danger",
};

export function QualityDashboard() {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("30d");
  const [team, setTeam] = useState("all");
  const [specialist, setSpecialist] = useState("all");
  const [template, setTemplate] = useState("all");
  const [channel, setChannel] = useState("all");
  const [contactType, setContactType] = useState("all");
  const [status, setStatus] = useState("all");

  const isEmpty = useMemo(
    () => team === "quality-ops" && specialist === "jules",
    [specialist, team]
  );

  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 320);
  }

  return (
    <section className="quality-dashboard" id="dashboard">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label={loading ? "Ładowanie" : "Dane mock"} tone={loading ? "warning" : "success"} />}
          description="Panel decyzyjny dla managera jakości z KPI, trendami i filtrami operacyjnymi."
          title="Dashboard jakości"
        />
        <div className="dashboard-filters" aria-label="Filtry dashboardu">
          <Select
            label="Okres"
            name="period"
            onChange={(event) => updateFilter(setPeriod, event.target.value)}
            options={dashboardFilters.periods}
            value={period}
          />
          <Select
            label="Zespół"
            name="team"
            onChange={(event) => updateFilter(setTeam, event.target.value)}
            options={dashboardFilters.teams}
            value={team}
          />
          <Select
            label="Specjalista"
            name="specialist"
            onChange={(event) => updateFilter(setSpecialist, event.target.value)}
            options={dashboardFilters.specialists}
            value={specialist}
          />
          <Select
            label="Szablon oceny"
            name="template"
            onChange={(event) => updateFilter(setTemplate, event.target.value)}
            options={dashboardFilters.templates}
            value={template}
          />
          <Select
            label="Kanał kontaktu"
            name="channel"
            onChange={(event) => updateFilter(setChannel, event.target.value)}
            options={dashboardFilters.channels}
            value={channel}
          />
          <Select
            label="Typ kontaktu"
            name="contactType"
            onChange={(event) => updateFilter(setContactType, event.target.value)}
            options={dashboardFilters.contactTypes}
            value={contactType}
          />
          <Select
            label="Status oceny"
            name="status"
            onChange={(event) => updateFilter(setStatus, event.target.value)}
            options={dashboardFilters.statuses}
            value={status}
          />
        </div>
      </Card>

      <AIInsightsPanel />

      {isEmpty ? (
        <EmptyState
          description="Wybrana kombinacja filtrów nie ma jeszcze ocen. Zmień zespół lub specjalistę."
          icon={<BarChart3 aria-hidden="true" />}
          title="Brak danych dla filtrów"
        />
      ) : (
        <>
          <section className={`dashboard-kpi-grid ${loading ? "is-loading" : ""}`} aria-label="KPI jakości">
            <StatCard
              helper="Średnia z okresu"
              icon={<TrendingUp aria-hidden="true" />}
              label="średnia ocena"
              value={`${qualityKpis.averageScore}%`}
            />
            <StatCard
              helper="Zakończone formularze"
              icon={<ClipboardCheck aria-hidden="true" />}
              label="liczba ocen"
              value={qualityKpis.evaluationsCount}
            />
            <StatCard
              helper="Wymagają reakcji"
              icon={<AlertTriangle aria-hidden="true" />}
              label="liczba ocen krytycznych"
              value={qualityKpis.criticalCount}
            />
            <StatCard
              helper="Vs poprzedni okres"
              icon={<LineChart aria-hidden="true" />}
              label="trend jakości"
              value={qualityKpis.qualityTrend}
            />
            <StatCard
              helper="Najwyższy wynik"
              icon={<Trophy aria-hidden="true" />}
              label="najlepszy zespół"
              value={qualityKpis.bestTeam}
            />
            <StatCard
              helper="Najniższy obszar"
              icon={<BarChart3 aria-hidden="true" />}
              label="najsłabszy obszar"
              value={qualityKpis.weakestArea}
            />
            <StatCard
              helper="Unikalne kontakty"
              icon={<Users aria-hidden="true" />}
              label="liczba ocenionych rozmów"
              value={qualityKpis.evaluatedConversations}
            />
            <StatCard
              helper="Z komentarzem"
              icon={<MessageSquareText aria-hidden="true" />}
              label="udział ocen z komentarzem"
              value={qualityKpis.commentShare}
            />
          </section>

          <section className="dashboard-chart-grid" aria-label="Wykresy jakości">
            <TrendChart data={qualityTrend} loading={loading} title="Trend jakości w czasie" />
            <BarChart data={teamScores} loading={loading} title="Wyniki według zespołów" />
            <BarChart data={specialistScores} loading={loading} title="Wyniki według specjalistów" />
            <StatusDistribution data={statusDistribution} loading={loading} />
            <BarChart data={downgradedCriteria} loading={loading} mode="count" title="Najczęściej obniżane kryteria" />
            <BarChart data={formComparison} loading={loading} title="Porównanie formularzy" />
            <Heatmap data={heatmap} loading={loading} />
          </section>
        </>
      )}
    </section>
  );
}

function TrendChart({
  data,
  loading,
  title,
}: {
  data: QualityTrendPoint[];
  loading: boolean;
  title: string;
}) {
  const points = data
    .map((point, index) => {
      const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
      const y = 100 - point.score;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className={`dashboard-chart dashboard-chart--wide ${loading ? "is-loading" : ""}`}>
      <SectionHeader description="Średni wynik z ocen w kolejnych dniach." title={title} />
      <svg className="trend-chart" role="img" viewBox="0 0 100 100">
        <polyline fill="none" points={points} stroke="var(--qd-blue)" strokeWidth="4" />
        {data.map((point, index) => {
          const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
          const y = 100 - point.score;
          return <circle cx={x} cy={y} fill="var(--qd-orange)" key={point.label} r="3" />;
        })}
      </svg>
      <div className="trend-axis">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </Card>
  );
}

function BarChart({
  data,
  loading,
  mode = "score",
  title,
}: {
  data: QualityBarDatum[];
  loading: boolean;
  mode?: "score" | "count";
  title: string;
}) {
  const max = Math.max(...data.map((item) => (mode === "score" ? item.score : item.count ?? 0)), 1);

  return (
    <Card className={`dashboard-chart ${loading ? "is-loading" : ""}`}>
      <SectionHeader description={mode === "score" ? "Wynik procentowy." : "Liczba wystąpień."} title={title} />
      <div className="bar-list">
        {data.map((item, index) => {
          const value = mode === "score" ? item.score : item.count ?? 0;
          const width = Math.round((value / max) * 100);
          return (
            <div className="bar-row" key={item.label}>
              <div>
                <span>{item.label}</span>
                <strong>{mode === "score" ? `${item.score}%` : item.count}</strong>
              </div>
              <div className="bar-track">
                <span
                  className={index % 2 === 0 ? "bar-fill bar-fill--blue" : "bar-fill bar-fill--orange"}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function StatusDistribution({ data, loading }: { data: StatusDatum[]; loading: boolean }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className={`dashboard-chart ${loading ? "is-loading" : ""}`}>
      <SectionHeader description="Udział statusów w ocenach." title="Rozkład statusów" />
      <div className="status-stack">
        {data.map((item) => (
          <span
            className={`status-stack__item status-stack__item--${item.status === "Dobry" ? "good" : "weak"}`}
            key={item.status}
            style={{ width: `${Math.round((item.count / total) * 100)}%` }}
          />
        ))}
      </div>
      <div className="status-list">
        {data.map((item) => (
          <div key={item.status}>
            <StatusPill label={item.status} tone={statusTone[item.status]} />
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Heatmap({ data, loading }: { data: HeatmapCell[]; loading: boolean }) {
  const teams = Array.from(new Set(data.map((item) => item.team)));
  const areas = Array.from(new Set(data.map((item) => item.area)));

  return (
    <Card className={`dashboard-chart dashboard-chart--wide ${loading ? "is-loading" : ""}`}>
      <SectionHeader description="Zespoły kontra obszary jakości." title="Heatmapa jakości" />
      <div className="heatmap-grid" style={{ gridTemplateColumns: `150px repeat(${areas.length}, 1fr)` }}>
        <span />
        {areas.map((area) => (
          <strong key={area}>{area}</strong>
        ))}
        {teams.map((team) => (
          <Fragment key={team}>
            <strong key={`${team}-label`}>{team}</strong>
            {areas.map((area) => {
              const cell = data.find((item) => item.team === team && item.area === area);
              const score = cell?.score ?? 0;
              return (
                <span
                  className={score >= 75 ? "heatmap-cell heatmap-cell--good" : "heatmap-cell heatmap-cell--weak"}
                  key={`${team}-${area}`}
                >
                  {score}%
                </span>
              );
            })}
          </Fragment>
        ))}
      </div>
    </Card>
  );
}
