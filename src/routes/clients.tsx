import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Building2, Handshake, BadgeCheck, ArrowRight, Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { Button } from "@/components/ui/button";

type Vendor = { name: string; number: string };

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Approved Vendor — Seema" },
      { name: "description", content: "Seema is an approved vendor with SABIC, Saudi Aramco, SEC, Maaden, Sahara and the Saudi Irrigation Organization." },
      { property: "og:title", content: "Clients & Approved Vendor — Seema" },
      { property: "og:description", content: "Working alongside the Kingdom's leading industrial operators." },
      { property: "og:url", content: "/clients" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const { t } = useTranslation();
  const sectors = t("clients.sectors", { returnObjects: true }) as string[];
  const vendors = t("clients.vendors", { returnObjects: true }) as Vendor[];
  const logoNames = ["SABIC", "ARAMCO", "MAADEN", "SEC", "SAFCO", "S-CHEM", "SAHARA", "KJO", "BERRY GAS"];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -top-32 end-1/4 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("clients.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
              {t("clients.title")}
            </h1>
            <p className="mt-6 text-lg text-ink-foreground/75 leading-relaxed">
              {t("clients.subtitle")}
            </p>
          </div>
        </div>
        <div className="relative border-t border-white/10 py-8">
          <Marquee
            items={logoNames.map((c) => (
              <span
                key={c}
                className="font-display text-2xl md:text-3xl font-semibold tracking-[0.2em] text-ink-foreground/40"
              >
                {c}
              </span>
            ))}
          />
        </div>
      </section>

      {/* VENDORS */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">{t("clients.vendorsTitle")}</h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((v, idx) => (
            <Reveal key={v.name} delay={idx * 60}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-accent/50 hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Vendor #
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold">{v.name}</p>
                  </div>
                  <BadgeCheck className="h-5 w-5 text-accent/70 group-hover:text-accent transition-colors" />
                </div>
                <p
                  className="mt-6 font-mono text-2xl tabular-nums text-foreground"
                  dir="ltr"
                >
                  #{v.number}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">{t("clients.sectorsTitle")}</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, idx) => (
              <Reveal key={s} delay={idx * 50}>
                <div className="rounded-xl border border-border bg-card p-6 text-center hover:border-accent/50 hover:-translate-y-0.5 transition-all">
                  <p className="font-display font-medium">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                <Handshake className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">{t("clients.partnersTitle")}</h2>
            </div>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">{t("clients.partnersBody")}</p>
            <Button asChild className="mt-8 rounded-full">
              <Link to="/contact">
                {t("common.getInTouch")}
                <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-ink-foreground min-h-[280px]">
              <div className="absolute inset-0 grid-pattern opacity-[0.08] text-ink-foreground" />
              <div className="absolute -top-20 -end-20 h-64 w-64 rounded-full bg-accent/30 blur-[80px]" />
              <Globe2 className="h-10 w-10 text-accent" />
              <p className="relative mt-6 font-display text-2xl md:text-3xl font-semibold leading-snug text-balance max-w-md">
                Global technology, executed in the Kingdom.
              </p>
              <p className="relative mt-4 text-ink-foreground/70 max-w-md">
                International composite materials, structural engineering and protective coating partners — paired with on-the-ground Saudi delivery.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
