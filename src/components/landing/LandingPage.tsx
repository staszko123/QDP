import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  LockKeyhole,
  MessageSquareText,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge, Button, Card, Input, SectionHeader, Textarea } from "../ui";
import { pricingComparisonRows, pricingPlans } from "../pricing/pricingPlans";

const modules = [
  "Dashboard jakości",
  "Formularze ocen",
  "AI Assistant mock",
  "Biblioteka szablonów",
  "Raporty",
  "Integracje",
  "Administracja",
  "Demo sandbox",
];

const audiences = [
  "Contact center",
  "E-commerce support",
  "Helpdesk techniczny",
  "Customer success",
  "Zespoły reklamacji",
  "Operacje B2B",
];

const faqs = [
  {
    q: "Czy QualityDesk wymaga integracji od pierwszego dnia?",
    a: "Nie. Możesz zacząć od demo sandboxa, importów mock lub formularzy ręcznych, a integracje podłączyć później.",
  },
  {
    q: "Czy AI zapisuje oceny automatycznie?",
    a: "Nie. AI proponuje punktację i komentarze, ale evaluator zatwierdza lub zmienia ocenę.",
  },
  {
    q: "Czy dane demo są prawdziwe?",
    a: "Nie. Sandbox używa wyłącznie realistycznych, fikcyjnych i maskowanych danych.",
  },
];

const enterpriseReadiness = [
  "Role i uprawnienia",
  "Separacja danych organizacji",
  "Logi audytowe",
  "Historia zmian ocen",
  "Historia zmian szablonów",
  "Retencja danych",
  "Eksport danych",
  "Usuwanie danych",
  "Zgody na przetwarzanie",
  "Brak prawdziwych danych w demo",
  "Maskowanie danych w demo",
];

export function LandingPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <a className="landing-brand" href="#/">
          <span>QD</span>
          QualityDesk
        </a>
        <div>
          <a href="#problem">Problem</a>
          <a href="#modules">Moduły</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Kontakt</a>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero__copy">
          <Badge tone="orange">Premium B2B SaaS</Badge>
          <h1>QualityDesk to platforma SaaS do monitorowania jakości obsługi klienta.</h1>
          <p>
            Pomaga firmom tworzyć własne formularze ocen, analizować rozmowy,
            monitorować jakość pracy zespołów i integrować dane z systemami klienta.
          </p>
          <div className="landing-hero__actions">
            <a className="landing-cta landing-cta--primary" href="#contact">
              Umów demo
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="landing-cta landing-cta--secondary" href="#/app/sandbox">
              Zobacz sandbox
            </a>
            <a className="landing-cta landing-cta--ghost" href="#pricing">
              Poproś o wycenę
            </a>
          </div>
        </div>
        <div className="landing-product-shot" aria-label="QualityDesk dashboard preview">
          <div>
            <span>Średnia jakość</span>
            <strong>86%</strong>
          </div>
          <div className="landing-chart">
            <span style={{ height: "62%" }} />
            <span style={{ height: "78%" }} />
            <span style={{ height: "70%" }} />
            <span style={{ height: "88%" }} />
            <span style={{ height: "94%" }} />
          </div>
          <p>Oceny, raporty, integracje i sandbox demo w jednym miejscu.</p>
        </div>
      </section>

      <section className="landing-section" id="problem">
        <SectionHeader
          description="Jakość obsługi często jest rozproszona między arkuszami, nagraniami, CRM i subiektywnymi notatkami."
          title="Problem"
        />
        <div className="landing-card-grid">
          <LandingCard icon={<MessageSquareText />} title="Rozproszone rozmowy" text="Dane są w wielu narzędziach, a liderzy nie widzą pełnego obrazu jakości." />
          <LandingCard icon={<ClipboardCheck />} title="Niespójne formularze" text="Każdy zespół ocenia inaczej, więc trudno porównać wyniki." />
          <LandingCard icon={<BarChart3 />} title="Za mało decyzji" text="Raporty opisują przeszłość, ale nie wskazują działań coachingowych." />
        </div>
      </section>

      <section className="landing-section landing-section--white">
        <SectionHeader
          description="QualityDesk porządkuje formularze, scoring, raporty i integracje w jednym panelu decyzyjnym."
          title="Rozwiązanie"
        />
        <div className="landing-split">
          <div>
            <h2>Od transkrypcji do decyzji managerskiej</h2>
            <p>
              Tworzysz szablony ocen, oceniasz rozmowy, widzisz trendy, wykrywasz ryzyka i eksportujesz raporty dla zespołów lub zarządu.
            </p>
          </div>
          <ul>
            <li><CheckCircle2 /> Własne formularze ocen</li>
            <li><CheckCircle2 /> Scoring i kryteria krytyczne</li>
            <li><CheckCircle2 /> Dashboard jakości i raporty</li>
            <li><CheckCircle2 /> Integracje i importy danych</li>
          </ul>
        </div>
      </section>

      <section className="landing-section" id="modules">
        <SectionHeader description="Moduły produktu gotowe pod proces jakości w organizacji." title="Moduły produktu" />
        <div className="landing-module-grid">
          {modules.map((module) => (
            <Card key={module}>
              <Sparkles aria-hidden="true" className="landing-icon" />
              <h3>{module}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--white">
        <SectionHeader description="QualityDesk pasuje do zespołów, które mierzą jakość wielu kontaktów z klientami." title="Dla kogo" />
        <div className="landing-pill-list">
          {audiences.map((audience) => (
            <Badge key={audience} tone="blue">{audience}</Badge>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <SectionHeader description="Prosty proces wdrożenia jakości od konfiguracji po raport." title="Jak działa" />
        <div className="landing-steps">
          {["Wybierz szablon", "Oceń rozmowę", "Zobacz scoring", "Podejmij decyzję"].map((step, index) => (
            <div key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--white">
        <SectionHeader description="Bezpieczne środowisko sprzedażowe z fikcyjnymi danymi." title="Sandbox demo" />
        <div className="landing-split">
          <p>Sandbox zawiera organizacje testowe, zespoły, specjalistów, oceny, raporty, integracje mock i scenariusze sprzedażowe.</p>
          <a className="landing-cta landing-cta--primary" href="#/app/sandbox">Zobacz sandbox</a>
        </div>
      </section>

      <section className="landing-section">
        <SectionHeader description="Importy, API, webhooki i placeholdery pod systemy klienta." title="Integracje" />
        <div className="landing-card-grid">
          <LandingCard icon={<DatabaseZap />} title="Import CSV/XLSX" text="Szybki start bez ciężkich integracji." />
          <LandingCard icon={<PlugZap />} title="API i webhooki" text="Struktura pod automatyczny przepływ danych." />
          <LandingCard icon={<Bot />} title="Źródła transkrypcji" text="Gotowe miejsce na rozmowy i nagrania." />
        </div>
      </section>

      <section className="landing-section landing-section--white">
        <SectionHeader description="Kontrola dostępu, retencja danych i audyt działań." title="Bezpieczeństwo" />
        <div className="landing-card-grid">
          <LandingCard icon={<ShieldCheck />} title="RBAC ready" text="Role i uprawnienia przygotowane pod auth." />
          <LandingCard icon={<LockKeyhole />} title="Retencja danych" text="Ustawienia danych, nagrań i logów audytowych." />
          <LandingCard icon={<Users />} title="Multi tenant" text="Organizacje i użytkownicy odseparowani w modelu danych." />
        </div>
        <div className="landing-security-grid">
          {[
            "Logi audytowe",
            "Historia zmian ocen",
            "Historia zmian szablonów",
            "Eksport i usuwanie danych",
            "Zgody na przetwarzanie",
            "Maskowanie danych demo",
          ].map((item) => (
            <div key={item}>
              <CheckCircle2 aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <SectionHeader
          description="Checklist gotowości enterprise do rozmów z większymi organizacjami."
          title="Enterprise readiness"
        />
        <div className="landing-readiness-grid">
          {enterpriseReadiness.map((item) => (
            <div key={item}>
              <CheckCircle2 aria-hidden="true" />
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <SectionHeader description="Przykładowe dashboardy managerskie i operacyjne." title="Przykładowe dashboardy" />
        <div className="landing-dashboard-grid">
          <Card><h3>Dashboard jakości</h3><strong>86%</strong><p>Średnia ocena w okresie.</p></Card>
          <Card><h3>Oceny krytyczne</h3><strong>6</strong><p>Wymagają reakcji lidera.</p></Card>
          <Card><h3>Trend jakości</h3><strong>+4.8%</strong><p>Wzrost względem poprzedniego okresu.</p></Card>
        </div>
      </section>

      <section className="landing-section landing-section--white" id="pricing">
        <SectionHeader description="Prosty model dla startu, skalowania i enterprise." title="Pricing" />
        <div className="landing-pricing-grid">
          {pricingPlans.map((plan) => (
            <Card elevated={plan.highlighted} key={plan.id}>
              <Badge tone={plan.highlighted ? "orange" : "blue"}>{plan.name}</Badge>
              <strong>{plan.price}</strong>
              <p>{plan.audience}</p>
              <p>{plan.limit}</p>
              <ul className="landing-pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="landing-cta landing-cta--primary" href="#contact">{plan.cta}</a>
            </Card>
          ))}
        </div>
        <Card className="landing-comparison-card">
          <SectionHeader description="Porównanie najważniejszych różnic między pakietami." title="Porównanie pakietów" />
          <div className="landing-comparison-table">
            <div className="landing-comparison-table__header">
              <strong>Funkcja</strong>
              <strong>Starter</strong>
              <strong>Professional</strong>
              <strong>Enterprise</strong>
            </div>
            {pricingComparisonRows.map((row) => (
              <div className="landing-comparison-table__row" key={row.feature}>
                <span>{row.feature}</span>
                <span>{row.starter}</span>
                <span>{row.professional}</span>
                <span>{row.enterprise}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="landing-section">
        <SectionHeader description="Najczęstsze pytania klientów przed demo." title="FAQ" />
        <div className="landing-faq">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="landing-final-cta" id="contact">
        <div>
          <h2>Umów demo QualityDesk</h2>
          <p>Zobacz, jak platforma może uporządkować monitoring jakości obsługi klienta w Twojej organizacji.</p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <Input label="Imię i nazwisko" name="name" placeholder="Anna Kowalska" />
          <Input label="Email służbowy" name="email" placeholder="anna@firma.pl" type="email" />
          <Textarea label="Wiadomość" name="message" placeholder="Chcę zobaczyć demo dla zespołu supportu." rows={4} />
          <Button type="submit">Umów demo</Button>
          {submitted ? <p>Formularz kontaktowy mock został wysłany.</p> : null}
        </form>
      </section>
    </main>
  );
}

function LandingCard({ icon, text, title }: { icon: ReactNode; text: string; title: string }) {
  return (
    <Card>
      <span className="landing-card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </Card>
  );
}
