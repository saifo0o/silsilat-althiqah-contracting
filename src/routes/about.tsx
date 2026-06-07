import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Gauge, Layers, BadgeCheck, ArrowRight, MapPin } from "lucide-react";
import about from "@/assets/about-engineers.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

type Vendor = { name: string; number: string };
type TimelineItem = { year: string; title: string; body: string };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Seema General Contracting & Industrial Services" },
      { name: "description", content: "Founded in 2013, Seema is a Saudi specialist in the rehabilitation of concrete, steel structures and process pipes." },
      { property: "og:title", content: "About — Seema" },
      { property: "og:description", content: "A specialist contractor for what cannot fail." },
      { property: "og:image", content: about },
      { property: "og:url", content: "/about" },
      { name: "twitter:image", content: about },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const vendors = t("clients.vendors", { returnObjects: true }) as Vendor[];
  const timeline = t("about.timeline", { returnObjects: true }) as TimelineItem[];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden">
        <img
          src={about}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          width={1600}
          height={1067}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="relative container mx-auto px-4 md:px-6 py-28 md:py-36 lg:py-44">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("about.eyebrow")}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold max-w-3xl leading-[1.05] tracking-tight text-balance">
            {t("about.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-ink-foreground/75 leading-relaxed">{t("about.lead")}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-foreground/60">
            <MapPin className="h-4 w-4 text-accent" />
            {t("about.since")}
          </p>
        </div>
      </section>

      {/* BODY — split paragraphs */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Our practice
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold leading-tight">
              Engineered repair, executed on live industrial sites.
            </h2>
          </Reveal>
          <div className="lg:col-span-7 grid gap-8 md:grid-cols-2">
            <Reveal delay={100}>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("about.body1")}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("about.body2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="grid gap-6 md:grid-cols-3">
            {([
              { k: "mission", Icon: ShieldCheck },
              { k: "goal", Icon: Gauge },
              { k: "vision", Icon: Layers },
            ] as const).map(({ k, Icon }, idx) => (
              <Reveal key={k} delay={idx * 100}>
                <div className="rounded-2xl border border-border bg-card p-8 h-full">
                  <div className="h-12 w-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{t(`values.${k}Title`)}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{t(`values.${k}Body`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Milestones"
          title={t("about.timelineTitle")}
          subtitle={t("about.timelineSubtitle")}
        />
        <div className="mt-16 relative">
          <div className="absolute start-4 md:start-1/2 top-0 bottom-0 w-px bg-border" aria-hidden />
          <ol className="space-y-10">
            {timeline.map((m, idx) => (
              <Reveal key={m.year + idx} delay={idx * 80} as="li">
                <div className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${idx % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className="absolute start-4 md:start-1/2 -translate-x-1/2 rtl:translate-x-1/2 mt-2 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
                  <div className="ps-12 md:ps-0 md:text-end md:[direction:ltr]">
                    <p className="font-display text-2xl md:text-3xl font-semibold text-accent" dir="ltr">
                      {m.year}
                    </p>
                  </div>
                  <div className="ps-12 md:ps-0 md:[direction:ltr]">
                    <h3 className="font-display text-xl font-semibold">{m.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* VENDORS */}
      <section className="bg-secondary/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">{t("about.vendorsTitle")}</h2>
          </div>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("about.vendorsBody")}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v, idx) => (
              <Reveal key={v.name} delay={idx * 60}>
                <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between gap-4 hover:border-accent/40 transition-colors">
                  <p className="font-display text-base font-semibold">{v.name}</p>
                  <p className="font-mono text-sm tabular-nums text-muted-foreground" dir="ltr">
                    #{v.number}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Button asChild className="rounded-full">
              <Link to="/contact">
                {t("common.discussProject")}
                <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
