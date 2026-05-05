export interface PricingPlan {
  id: string;
  name: string;
  audience: string;
  limit: string;
  price: string;
  cta: string;
  highlighted?: boolean;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "Dla małych zespołów jakości.",
    limit: "Do 10 użytkowników.",
    price: "$99/mo",
    cta: "Umów demo Starter",
    features: [
      "Podstawowe formularze ocen",
      "Dashboard",
      "Raport CSV",
      "Brak integracji API",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    audience: "Dla średnich działów obsługi.",
    limit: "Do 50 użytkowników.",
    price: "$199/mo",
    cta: "Wybierz Professional",
    highlighted: true,
    features: [
      "Kreator formularzy",
      "Kreator raportów",
      "Biblioteka szablonów",
      "Integracje CSV/XLSX",
      "Dashboardy zespołowe",
      "Wsparcie onboardingowe",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Dla dużych firm.",
    limit: "Bez limitu użytkowników według umowy.",
    price: "Wycena indywidualna",
    cta: "Poproś o wycenę",
    features: [
      "Multi tenant",
      "API",
      "Webhooki",
      "SSO",
      "Logi audytowe",
      "White label",
      "Dedykowane integracje",
      "Dedykowane szablony",
      "Wsparcie wdrożeniowe",
    ],
  },
];

export const pricingComparisonRows = [
  { feature: "Limit użytkowników", starter: "10", professional: "50", enterprise: "Według umowy" },
  { feature: "Formularze ocen", starter: "Podstawowe", professional: "Kreator", enterprise: "Dedykowane" },
  { feature: "Raporty", starter: "CSV", professional: "Kreator raportów", enterprise: "Zaawansowane" },
  { feature: "Integracje plikowe", starter: "Nie", professional: "CSV/XLSX", enterprise: "CSV/XLSX + custom" },
  { feature: "API i webhooki", starter: "Nie", professional: "Nie", enterprise: "Tak" },
  { feature: "SSO", starter: "Nie", professional: "Nie", enterprise: "Tak" },
  { feature: "Logi audytowe", starter: "Nie", professional: "Podstawowe", enterprise: "Tak" },
  { feature: "White label", starter: "Nie", professional: "Nie", enterprise: "Tak" },
  { feature: "Wsparcie", starter: "Standard", professional: "Onboarding", enterprise: "Wdrożeniowe" },
];
