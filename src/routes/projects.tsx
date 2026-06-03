import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import hero from "@/assets/hero-refinery.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Seema" },
      { name: "description", content: "Selected rehabilitation, reinforcement and protective coating projects delivered by Seema across Saudi Arabia." },
      { property: "og:title", content: "Projects — Seema" },
      { property: "og:description", content: "A snapshot of work delivered for refineries, utilities and infrastructure clients." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  { key: "p1", img: project1 },
  { key: "p2", img: project2 },
  { key: "p3", img: project3 },
  { key: "p4", img: hero },
] as const;

function ProjectsPage() {
  const { t } = useTranslation();
  return (
    <>
      <section className="bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
          <SectionHeading eyebrow={t("nav.projects")} title={t("projects.title")} subtitle={t("projects.subtitle")} />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.key} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" width={1024} height={768} />
              </div>
              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {t(`projects.items.${p.key}.category`)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{t(`projects.items.${p.key}.title`)}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t(`projects.items.${p.key}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
