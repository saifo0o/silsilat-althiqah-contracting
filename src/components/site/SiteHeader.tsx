import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/seema-logo.png";
import { setLanguage } from "@/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "home" as const },
  { to: "/about", key: "about" as const },
  { to: "/services", key: "services" as const },
  { to: "/projects", key: "projects" as const },
  { to: "/clients", key: "clients" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  const toggleLang = () => setLanguage(i18n.language === "ar" ? "en" : "ar");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Seema" className="h-12 w-auto" width={120} height={48} />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-foreground">{t("company.name")}</span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("company.tagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span>{t("lang.toggle")}</span>
          </button>
          <Button asChild className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/contact">{t("nav.cta")}</Link>
          </Button>
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact" onClick={() => setOpen(false)}>{t("nav.cta")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
