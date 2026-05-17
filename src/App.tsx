import { useEffect, useState } from "react";
import { LandingPage } from "./components/landing";
import { ProductApp } from "./ProductApp";

const appRouteTargets: Record<string, string> = {
  "/app": "dashboard",
  "/app/dashboard": "dashboard",
  "/app/evaluations": "evaluations",
  "/app/builder": "builder",
  "/app/templates": "templates",
  "/app/reports": "reports",
  "/app/teams": "administration",
  "/app/specialists": "administration",
  "/app/integrations": "integrations",
  "/app/administration": "administration",
  "/app/settings": "settings",
  "/app/billing": "billing",
  "/app/sandbox": "sandbox",
};

function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    function handleHashChange() {
      setRoute(window.location.hash || "#/");
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route.startsWith("#/app")) {
      const routePath = route.slice(1);
      const targetId = appRouteTargets[routePath] ?? "dashboard";
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [route]);

  if (route.startsWith("#/app")) {
    return <ProductApp routePath={route.slice(1)} />;
  }

  return <LandingPage />;
}

export default App;
