import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, Languages, ArrowRight, MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => setOpen(false), [location.pathname]);

  const toggleLang = () => setLanguage(i18n.language === "ar" ? "en" : "ar");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top contact bar */}
      <div className="hidden md:block bg-ink text-ink-foreground/85 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              Jubail Industrial City, Kingdom of Saudi Arabia
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+966133611661" dir="ltr" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-3.5 w-3.5 text-accent" />
              +966 13 361 1661
            </a>
            <a href="mailto:info@seema.sa.com" dir="ltr" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-3.5 w-3.5 text-accent" />
              info@seema.sa.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-ink/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white/95 rounded-md p-1.5">
              <img src={logo} alt="Seema" className="h-9 w-auto" width={100} height={36} />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-ink-foreground tracking-wide">SEEMA</span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-ink-foreground/60">General Contracting & Industrial Services Co.</span>
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
                    "relative px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wider transition-colors",
                    active ? "text-accent" : "text-ink-foreground/85 hover:text-accent",
                  )}
                >
                  {t(`nav.${item.key}`)}
                  {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent rounded-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-foreground hover:bg-white/10 transition-colors"
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{t("lang.toggle")}</span>
            </button>
            <Button asChild className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 rounded-md px-5 font-semibold uppercase tracking-wider text-xs">
              <Link to="/contact">
                {t("nav.cta")}
                <ArrowRight className="h-3.5 w-3.5 ms-1 rtl:rotate-180" />
              </Link>
            </Button>
            <button className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-ink-foreground hover:bg-white/10" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 bg-ink animate-fade-in">
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-foreground hover:bg-white/10">
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md">
                <Link to="/contact">{t("nav.cta")}</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
