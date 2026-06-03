import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Building2, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Partners — Seema" },
      { name: "description", content: "Seema partners with international engineering firms and serves the Kingdom's largest industrial operators." },
      { property: "og:title", content: "Clients & Partners — Seema" },
      { property: "og:description", content: "Working alongside international specialists across Saudi Arabia's industry." },
      { property: "og:url", content: "/clients" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const { t } = useTranslation();
  const sectors = t("clients.sectors", { returnObjects: true }) as string[];
  return (
    <>
      <section className="bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
          <SectionHeading eyebrow={t("nav.clients")} title={t("clients.title")} subtitle={t("clients.subtitle")} />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
            <Building2 className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">{t("clients.sectorsTitle")}</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <div key={s} className="rounded-xl border border-border bg-card p-5 text-center">
              <p className="font-medium">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <Handshake className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">{t("clients.partnersTitle")}</h2>
            </div>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{t("clients.partnersBody")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
