export type TemplateDifficulty = "Podstawowy" | "Średni" | "Zaawansowany";

export interface LibraryTemplateCriterion {
  name: string;
  type: string;
  weight: number;
  maxScore: number;
  critical?: boolean;
}

export interface LibraryTemplateSection {
  name: string;
  weight: number;
  criteria: LibraryTemplateCriterion[];
}

export interface LibraryTemplate {
  id: string;
  name: string;
  description: string;
  tags: string[];
  difficulty: TemplateDifficulty;
  recommendedTeamType: string;
  estimatedMinutes: number;
  sections: LibraryTemplateSection[];
}

export const templateLibrary: LibraryTemplate[] = [
  {
    id: "customer-service",
    name: "Obsługa klienta",
    description: "Uniwersalna karta jakości dla codziennej komunikacji z klientem.",
    tags: ["contact center", "CX", "omnichannel"],
    difficulty: "Podstawowy",
    recommendedTeamType: "Zespół obsługi klienta",
    estimatedMinutes: 8,
    sections: [
      {
        name: "Rozpoznanie potrzeby",
        weight: 35,
        criteria: [
          { name: "Poprawna identyfikacja problemu", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Empatia i ton rozmowy", type: "Skala punktowa", weight: 2, maxScore: 5 },
        ],
      },
      {
        name: "Rozwiązanie",
        weight: 65,
        criteria: [
          { name: "Skuteczne rozwiązanie sprawy", type: "Tak/Nie", weight: 3, maxScore: 5, critical: true },
          { name: "Jasne kolejne kroki", type: "Lista wyboru", weight: 1, maxScore: 5 },
        ],
      },
    ],
  },
  {
    id: "technical-helpdesk",
    name: "Helpdesk techniczny",
    description: "Ocena diagnostyki, eskalacji i komunikacji technicznej.",
    tags: ["ITSM", "SLA", "technical support"],
    difficulty: "Zaawansowany",
    recommendedTeamType: "Helpdesk L1/L2",
    estimatedMinutes: 12,
    sections: [
      {
        name: "Diagnoza",
        weight: 45,
        criteria: [
          { name: "Zebrano komplet danych technicznych", type: "Tak/Nie", weight: 2, maxScore: 5 },
          { name: "Trafność diagnozy", type: "Ocena procentowa", weight: 3, maxScore: 10 },
        ],
      },
      {
        name: "Obsługa SLA",
        weight: 55,
        criteria: [
          { name: "Prawidłowa eskalacja", type: "Tak/Nie", weight: 2, maxScore: 5, critical: true },
          { name: "Czytelny opis rozwiązania", type: "Komentarz tekstowy", weight: 1, maxScore: 0 },
        ],
      },
    ],
  },
  {
    id: "sales",
    name: "Sprzedaż",
    description: "Szablon do oceny rozmów sprzedażowych i kwalifikacji leadów.",
    tags: ["sales", "lead qualification", "B2C"],
    difficulty: "Średni",
    recommendedTeamType: "Zespół sprzedaży",
    estimatedMinutes: 10,
    sections: [
      {
        name: "Discovery",
        weight: 50,
        criteria: [
          { name: "Zbadano potrzeby klienta", type: "Skala punktowa", weight: 3, maxScore: 5 },
          { name: "Dopasowano ofertę", type: "Skala punktowa", weight: 2, maxScore: 5 },
        ],
      },
      {
        name: "Zamknięcie",
        weight: 50,
        criteria: [
          { name: "Ustalono następny krok", type: "Tak/Nie", weight: 2, maxScore: 5 },
          { name: "Zgodność z polityką sprzedaży", type: "Tak/Nie", weight: 2, maxScore: 5, critical: true },
        ],
      },
    ],
  },
  {
    id: "complaints",
    name: "Reklamacje",
    description: "Kontrola jakości rozmów reklamacyjnych i decyzji kompensacyjnych.",
    tags: ["complaints", "compliance", "retention"],
    difficulty: "Zaawansowany",
    recommendedTeamType: "Zespół reklamacji",
    estimatedMinutes: 14,
    sections: [
      {
        name: "Formalności",
        weight: 40,
        criteria: [
          { name: "Zweryfikowano tożsamość i sprawę", type: "Tak/Nie", weight: 2, maxScore: 5, critical: true },
          { name: "Zastosowano właściwą procedurę", type: "Tak/Nie", weight: 3, maxScore: 5 },
        ],
      },
      {
        name: "Komunikacja decyzji",
        weight: 60,
        criteria: [
          { name: "Wyjaśniono podstawę decyzji", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Zaproponowano adekwatne rozwiązanie", type: "Skala punktowa", weight: 3, maxScore: 5 },
        ],
      },
    ],
  },
  {
    id: "back-office",
    name: "Back office",
    description: "Ocena poprawności przetwarzania spraw bez kontaktu głosowego.",
    tags: ["operations", "back office", "accuracy"],
    difficulty: "Średni",
    recommendedTeamType: "Operacje back office",
    estimatedMinutes: 7,
    sections: [
      {
        name: "Poprawność danych",
        weight: 60,
        criteria: [
          { name: "Dane wprowadzone bez błędów", type: "Tak/Nie", weight: 3, maxScore: 5, critical: true },
          { name: "Kompletność dokumentacji", type: "Skala punktowa", weight: 2, maxScore: 5 },
        ],
      },
      {
        name: "Terminowość",
        weight: 40,
        criteria: [
          { name: "Sprawa zamknięta w SLA", type: "Tak/Nie", weight: 2, maxScore: 5 },
          { name: "Komentarz operacyjny", type: "Komentarz tekstowy", weight: 1, maxScore: 0 },
        ],
      },
    ],
  },
  {
    id: "soft-collections",
    name: "Windykacja miękka",
    description: "Ocena rozmów przypominających z naciskiem na zgodność i ton kontaktu.",
    tags: ["collections", "finance", "compliance"],
    difficulty: "Zaawansowany",
    recommendedTeamType: "Zespół windykacji miękkiej",
    estimatedMinutes: 13,
    sections: [
      {
        name: "Zgodność rozmowy",
        weight: 55,
        criteria: [
          { name: "Brak niedozwolonej presji", type: "Kryterium krytyczne", weight: 4, maxScore: 5, critical: true },
          { name: "Prawidłowe przekazanie informacji", type: "Tak/Nie", weight: 2, maxScore: 5 },
        ],
      },
      {
        name: "Ustalenia",
        weight: 45,
        criteria: [
          { name: "Uzgodniono realny termin", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Podsumowano ustalenia", type: "Tak/Nie", weight: 1, maxScore: 5 },
        ],
      },
    ],
  },
  {
    id: "customer-onboarding",
    name: "Onboarding klienta",
    description: "Szablon dla pierwszych kontaktów wdrożeniowych i aktywacji usługi.",
    tags: ["onboarding", "success", "activation"],
    difficulty: "Średni",
    recommendedTeamType: "Customer success",
    estimatedMinutes: 11,
    sections: [
      {
        name: "Przygotowanie",
        weight: 35,
        criteria: [
          { name: "Zweryfikowano cele klienta", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Ustalono plan wdrożenia", type: "Tak/Nie", weight: 2, maxScore: 5 },
        ],
      },
      {
        name: "Aktywacja",
        weight: 65,
        criteria: [
          { name: "Klient wykonał pierwszy krok", type: "Tak/Nie", weight: 3, maxScore: 5 },
          { name: "Ryzyka wdrożenia opisane", type: "Komentarz tekstowy", weight: 1, maxScore: 0 },
        ],
      },
    ],
  },
  {
    id: "b2b-account-support",
    name: "B2B account support",
    description: "Ocena wsparcia klientów B2B, właścicielstwa spraw i komunikacji statusów.",
    tags: ["B2B", "account management", "enterprise"],
    difficulty: "Zaawansowany",
    recommendedTeamType: "Account support",
    estimatedMinutes: 12,
    sections: [
      {
        name: "Właścicielstwo",
        weight: 50,
        criteria: [
          { name: "Agent przejął odpowiedzialność za sprawę", type: "Skala punktowa", weight: 3, maxScore: 5 },
          { name: "Ustalono właściciela po stronie klienta", type: "Tak/Nie", weight: 1, maxScore: 5 },
        ],
      },
      {
        name: "Komunikacja B2B",
        weight: 50,
        criteria: [
          { name: "Status był biznesowo czytelny", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Zachowano SLA komunikacyjne", type: "Tak/Nie", weight: 2, maxScore: 5, critical: true },
        ],
      },
    ],
  },
  {
    id: "ecommerce-support",
    name: "Support e-commerce",
    description: "Szablon dla pytań o zamówienia, zwroty, płatności i dostawy.",
    tags: ["e-commerce", "orders", "returns"],
    difficulty: "Podstawowy",
    recommendedTeamType: "Support sklepu internetowego",
    estimatedMinutes: 8,
    sections: [
      {
        name: "Obsługa zamówienia",
        weight: 55,
        criteria: [
          { name: "Poprawnie zweryfikowano zamówienie", type: "Tak/Nie", weight: 2, maxScore: 5 },
          { name: "Wyjaśniono status dostawy", type: "Skala punktowa", weight: 2, maxScore: 5 },
        ],
      },
      {
        name: "Doświadczenie klienta",
        weight: 45,
        criteria: [
          { name: "Ton zgodny z marką", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Zaproponowano rozwiązanie alternatywne", type: "Tak/Nie", weight: 1, maxScore: 5 },
        ],
      },
    ],
  },
  {
    id: "terminal-support",
    name: "Wsparcie terminalowe",
    description: "Ocena wsparcia urządzeń płatniczych i diagnozy terminali.",
    tags: ["payments", "terminal POS", "field support"],
    difficulty: "Zaawansowany",
    recommendedTeamType: "Wsparcie terminali płatniczych",
    estimatedMinutes: 15,
    sections: [
      {
        name: "Diagnoza urządzenia",
        weight: 60,
        criteria: [
          { name: "Zweryfikowano model i status terminala", type: "Tak/Nie", weight: 2, maxScore: 5 },
          { name: "Poprawnie wykonano troubleshooting", type: "Skala punktowa", weight: 4, maxScore: 10, critical: true },
        ],
      },
      {
        name: "Instruktaż",
        weight: 40,
        criteria: [
          { name: "Instrukcje były zrozumiałe", type: "Skala punktowa", weight: 2, maxScore: 5 },
          { name: "Potwierdzono działanie po naprawie", type: "Tak/Nie", weight: 2, maxScore: 5 },
        ],
      },
    ],
  },
];
