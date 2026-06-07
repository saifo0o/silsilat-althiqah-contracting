import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, Languages, ArrowRight } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const toggleLang = () => setLanguage(i18n.language === "ar" ? "en" : "ar");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-background/40 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Seema"
            className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            width={110}
            height={44}
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-foreground">
              {t("company.name")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {t("company.tagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(`nav.${item.key}`)}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background/60 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{t("lang.toggle")}</span>
          </button>
          <Button
            asChild
            className="hidden md:inline-flex bg-foreground text-background hover:bg-foreground/90 rounded-full px-5"
          >
            <Link to="/contact">
              {t("nav.cta")}
              <ArrowRight className="h-3.5 w-3.5 ms-1 rtl:rotate-180" />
            </Link>
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
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <Link to="/contact">{t("nav.cta")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
