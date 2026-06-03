import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Gauge, Layers } from "lucide-react";
import about from "@/assets/about-engineers.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Seema" },
      { name: "description", content: "Seema is a Saudi specialist in structural rehabilitation, partnering with international firms to bring engineered solutions to local industry." },
      { property: "og:title", content: "About — Seema" },
      { property: "og:description", content: "A specialist contractor for what cannot fail." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <img src={about} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" width={1600} height={1024} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t("about.eyebrow")}</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-semibold max-w-3xl leading-[1.1]">{t("about.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{t("about.lead")}</p>
          <p className="mt-4 text-sm text-primary-foreground/60">{t("about.since")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <SectionHeading eyebrow={t("home.intro.eyebrow")} title={t("home.intro.title")} subtitle={t("home.intro.body")} />
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            {([
              { k: "mission", Icon: ShieldCheck },
              { k: "goal", Icon: Gauge },
              { k: "vision", Icon: Layers },
            ] as const).map(({ k, Icon }) => (
              <div key={k} className="rounded-xl border border-border bg-card p-8">
                <div className="h-12 w-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{t(`values.${k}Title`)}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t(`values.${k}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
