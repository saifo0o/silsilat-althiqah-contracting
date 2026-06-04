import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CheckCircle2, MapPin, Building2, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

type ProjectItem = {
  title: string;
  client: string;
  location: string;
  period: string;
};

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

  return (
    <>
      <section className="bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
          <SectionHeading eyebrow={t("nav.projects")} title={t("projects.title")} subtitle={t("projects.subtitle")} />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((p, idx) => (
            <article key={idx} className="rounded-xl border border-border bg-card p-6 hover:shadow-elegant transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="text-xs font-semibold text-muted-foreground tabular-nums">#{String(idx + 1).padStart(2, "0")}</div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent">
                  <CheckCircle2 className="h-3 w-3" />
                  {t("projects.completed")}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <dl className="mt-5 space-y-2 text-sm">
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
                  <span>{p.period}</span>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
