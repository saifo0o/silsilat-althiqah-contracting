import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { CheckCircle2, MapPin, Building2, Calendar, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectItem = { title: string; client: string; location: string; period: string };

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Major Orders Completed — Seema" },
      { name: "description", content: "Rehabilitation, CFRP lining and structural repair work delivered for SABIC, Aramco, Maaden, SAFCO, KJO and others across Saudi Arabia." },
      { property: "og:title", content: "Major Orders Completed — Seema" },
      { property: "og:description", content: "Snapshot of completed work for refineries, petrochemical and mining clients." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true }) as ProjectItem[];
  const [filter, setFilter] = useState<string>("all");

  const clients = useMemo(() => Array.from(new Set(items.map((i) => i.client))), [items]);
  const filtered = filter === "all" ? items : items.filter((i) => i.client === filter);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("projects.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
              {t("projects.title")}
            </h1>
            <p className="mt-6 text-lg text-ink-foreground/75 leading-relaxed">
              {t("projects.subtitle")}
            </p>
            <div className="mt-8 flex gap-6 text-sm">
              <div>
                <p className="font-display text-3xl font-semibold" dir="ltr">{items.length}+</p>
                <p className="text-xs uppercase tracking-wider text-ink-foreground/60">Orders</p>
              </div>
              <div className="h-12 w-px bg-white/15" />
              <div>
                <p className="font-display text-3xl font-semibold" dir="ltr">{clients.length}</p>
                <p className="text-xs uppercase tracking-wider text-ink-foreground/60">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-b border-border bg-background sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
              filter === "all"
                ? "bg-foreground text-background"
                : "border border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {t("projects.filterAll")} ({items.length})
          </button>
          {clients.map((c) => {
            const count = items.filter((i) => i.client === c).length;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                  filter === c
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* GRID */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => (
            <Reveal
              key={`${filter}-${idx}`}
              delay={idx * 40}
              as="article"
              className="group rounded-2xl border border-border bg-card p-6 hover:border-accent/50 hover:shadow-elegant hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs font-semibold text-muted-foreground tabular-nums">
                  #{String(items.indexOf(p) + 1).padStart(2, "0")}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  <CheckCircle2 className="h-3 w-3" />
                  {t("projects.completed")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base md:text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <div className="mt-6 pt-5 border-t border-border space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="font-medium text-foreground">{p.client}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>{p.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-accent flex-shrink-0" />
                  <span dir="ltr">{p.period}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-border bg-secondary/40 p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-semibold leading-tight text-balance max-w-2xl mx-auto">
            {t("home.ctaTitle")}
          </h2>
          <Button asChild size="lg" className="mt-8 rounded-full">
            <Link to="/contact">
              {t("home.ctaButton")}
              <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
