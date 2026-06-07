import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Layers,
  Wrench,
  Gauge,
  Droplet,
  FlaskConical,
  Combine,
  Umbrella,
  Package,
  ArrowRight,
  Plus,
  Minus,
  Mail,
} from "lucide-react";
import carbon from "@/assets/service-carbon-fiber.jpg";
import epoxy from "@/assets/service-epoxy.jpg";
import concrete from "@/assets/service-concrete.jpg";
import piping from "@/assets/service-piping.jpg";
import steel from "@/assets/service-steel.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

type Faq = { q: string; a: string };

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Sales — Seema" },
      { name: "description", content: "Carbon fiber reinforcement, process pipe repair, concrete repair, industrial coatings, acid lining, expansion joints, waterproofing and industrial supplies." },
      { property: "og:title", content: "Services & Sales — Seema" },
      { property: "og:description", content: "Engineered repair solutions and carbon fiber sales." },
      { property: "og:image", content: carbon },
      { property: "og:url", content: "/services" },
      { name: "twitter:image", content: carbon },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  { key: "carbon", Icon: Layers, img: carbon },
  { key: "piping", Icon: Gauge, img: piping },
  { key: "concrete", Icon: Wrench, img: concrete },
  { key: "epoxy", Icon: Droplet, img: epoxy },
  { key: "acid", Icon: FlaskConical, img: steel },
  { key: "joints", Icon: Combine, img: null },
  { key: "roof", Icon: Umbrella, img: null },
  { key: "supplies", Icon: Package, img: null },
] as const;

function ServicesPage() {
  const { t } = useTranslation();
  const faq = t("services.faq", { returnObjects: true }) as Faq[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -bottom-32 end-1/4 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("services.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
              {t("services.title")}
            </h1>
            <p className="mt-6 text-lg text-ink-foreground/75 leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* SALES CALLOUT */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-10">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center shadow-elegant">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("services.salesEyebrow")}
              </p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold">
                {t("services.salesTitle")}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                {t("services.salesBody")}
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button asChild size="lg" className="rounded-full">
                <a href="mailto:danny@seema.sa.com">
                  <Mail className="h-4 w-4 me-2" />
                  {t("services.salesCta")}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow={t("services.capabilitiesTitle")}
          title={t("services.title")}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, Icon, img }, idx) => (
            <Reveal
              key={key}
              delay={idx * 60}
              as="article"
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-elegant hover:-translate-y-1"
            >
              {img ? (
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={1280}
                    height={960}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-hero-gradient flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-10 text-ink-foreground" />
                  <Icon className="h-20 w-20 text-ink-foreground/40 relative" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-accent/15 text-accent flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    0{idx + 1} / 0{services.length}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t(`services.items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="FAQ"
                title={t("services.faqTitle")}
              />
              <Button asChild className="mt-8 rounded-full">
                <Link to="/contact">
                  {t("common.discussProject")}
                  <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-7 space-y-3">
              {faq.map((f, idx) => {
                const isOpen = open === idx;
                return (
                  <Reveal key={idx} delay={idx * 60}>
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      <button
                        onClick={() => setOpen(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-start"
                        aria-expanded={isOpen}
                      >
                        <span className="font-display text-base md:text-lg font-semibold">
                          {f.q}
                        </span>
                        {isOpen ? (
                          <Minus className="h-4 w-4 text-accent flex-shrink-0" />
                        ) : (
                          <Plus className="h-4 w-4 text-accent flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                          {f.a}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
