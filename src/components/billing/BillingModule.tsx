import { CheckCircle2, CreditCard } from "lucide-react";
import { pricingComparisonRows, pricingPlans } from "../pricing/pricingPlans";
import { Badge, Button, Card, SectionHeader, StatusPill, Table } from "../ui";

export function BillingModule() {
  return (
    <section className="billing-module" id="billing">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label="Pakiety sprzedażowe" tone="blue" />}
          description="Billing pokazuje aktualną ofertę handlową QualityDesk i zakres funkcji w pakietach."
          title="Billing i pakiety"
        />

        <div className="billing-plan-grid">
          {pricingPlans.map((plan) => (
            <Card className="billing-plan-card" elevated={plan.highlighted} key={plan.id}>
              <div className="billing-plan-card__header">
                <div>
                  <Badge tone={plan.highlighted ? "orange" : "blue"}>{plan.name}</Badge>
                  <h3>{plan.price}</h3>
                  <p>{plan.audience}</p>
                  <strong>{plan.limit}</strong>
                </div>
                <CreditCard aria-hidden="true" />
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 aria-hidden="true" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button>{plan.cta}</Button>
            </Card>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader
          description="Szybkie porównanie zakresu funkcji dla rozmów sprzedażowych i decyzji zakupowych."
          title="Porównanie pakietów"
        />
        <Table
          headers={["Funkcja", "Starter", "Professional", "Enterprise"]}
          rows={pricingComparisonRows.map((row) => [
            row.feature,
            row.starter,
            row.professional,
            row.enterprise,
          ])}
        />
      </Card>
    </section>
  );
}
