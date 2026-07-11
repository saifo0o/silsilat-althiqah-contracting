import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  ShieldCheck,
  Gauge,
  Layers,
  BadgeCheck,
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import about from "@/assets/about-engineers.jpg";
import founderImg from "@/assets/founder-3.jpg";

import commercialRegistration from "@/assets/commercial-registration.png";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { BoardOfDirectors } from "@/components/site/BoardOfDirectors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollTimeline } from "@/components/site/ScrollTimeline";
import {
  SabicLogo,
  AramcoLogo,
  MaadenLogo,
  SipchemLogo,
  SecLogo,
  SaharaLogo,
  SioLogo,
} from "@/components/site/ClientLogos";

type Vendor = { name: string; number: string };
type TimelineItem = { year: string; title: string; body: string };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SILSILAT AL-THIQA, Engineering Solutions & Asset Protection" },
      {
        name: "description",
        content:
          "Founded in 2013, SILSILAT AL-THIQA is a Saudi specialist in the rehabilitation of concrete, steel structures and process pipes.",
      },
      { property: "og:title", content: "About — SILSILAT AL-THIQA" },
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
  const { t, i18n } = useTranslation();

  const vendorsData = t("clients.vendors", { returnObjects: true });
  const vendors = Array.isArray(vendorsData) ? (vendorsData as Vendor[]) : [];

  const timelineData = t("about.timeline", { returnObjects: true });
  const timeline = Array.isArray(timelineData) ? (timelineData as TimelineItem[]) : [];


  const getVendorLogo = (vendorName: string) => {
    const name = vendorName.toLowerCase();
    if (name.includes("aramco") || name.includes("kjo")) return AramcoLogo;
    if (name.includes("sabic")) return SabicLogo;
    if (name.includes("electricity") || name.includes("sec")) return SecLogo;
    if (name.includes("maaden") || name.includes("ma'aden")) return MaadenLogo;
    if (name.includes("sahara")) return SaharaLogo;
    if (name.includes("irrigation") || name.includes("sio")) return SioLogo;
    return null;
  };

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
        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-16 md:pt-40 md:pb-36 lg:pt-44 lg:pb-44">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t("about.eyebrow")}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold max-w-3xl leading-[1.05] tracking-tight text-balance">
            {t("about.title")}
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-ink-foreground/75 leading-relaxed">
            {t("about.lead")}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink-foreground/60">
            <MapPin className="h-4 w-4 text-accent" />
            {t("about.since")}
          </p>
        </div>
      </section>

      {/* BODY — split paragraphs */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {i18n.language === 'ar' ? 'ممارساتنا' : 'Our practice'}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold leading-tight">
              {i18n.language === 'ar' ? 'إصلاحات هندسية، تُنفّذ في المواقع الصناعية النشطة.' : 'Engineered repair, executed on live industrial sites.'}
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

      {/* FOUNDER MESSAGE */}
      <section className="bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <Reveal className="lg:col-span-4">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-2xl" />
                <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-emil">
                  <img
                    src={founderImg}
                    alt={t("about.founder.name")}
                    className="h-full w-full object-cover object-top"
                    width={480}
                    height={600}
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("about.founder.eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-tight text-balance">
                {t("about.founder.headline", { defaultValue: i18n.language === "ar" ? "نُعيد للأصول عمرها التشغيلي — لا نستبدلها." : "We extend asset life. We don't replace it." })}
              </h2>
              <blockquote className="mt-6 text-lg leading-relaxed text-muted-foreground border-s-2 border-accent/40 ps-5 rtl:pe-5 rtl:ps-0 rtl:border-e-2 rtl:border-s-0">
                {t("about.founder.message")}
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-0.5 bg-accent" />
                <div>
                  <p className="font-display text-base font-bold text-foreground">
                    {t("about.founder.name")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("about.founder.title")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-32 text-start">
          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Mission: Featured 2/3 width card */}
            <Reveal className="lg:col-span-8">
              <div className="rounded-md bg-card p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden group shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]">
                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />
                <div>
                  <div className="h-12 w-12 rounded-sm bg-accent/10 text-accent-foreground flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground">
                    {t("values.missionTitle")}
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {t("values.missionBody")}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-border flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Engineering Excellence
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Goal & Vision: Stacked 1/3 width */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {[
                { k: "goal", Icon: Gauge },
                { k: "vision", Icon: Layers },
              ].map(({ k, Icon }) => (
                <Reveal key={k} className="flex-1">
                  <div className="rounded-md bg-card p-6 h-full flex flex-col justify-between group shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]">
                    <div>
                      <div className="h-10 w-10 rounded-sm bg-accent/10 text-accent-foreground flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                        {t(`values.${k}Title`)}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {t(`values.${k}Body`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOARD OF DIRECTORS */}
      <BoardOfDirectors />



      {/* CERTIFICATIONS */}
      <section className="bg-secondary/20 py-12 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow={t("about.certificationsTitle")}
            title={t("about.certificationsTitle")}
            subtitle={t("about.certificationsSubtitle")}
          />
          <div className="mt-14 max-w-3xl mx-auto">
            <Reveal>
              <div className="rounded-md bg-card p-6 shadow-emil border border-border/50">
                <img
                  src={commercialRegistration}
                  alt="Commercial Registration Certificate"
                  className="w-full h-auto rounded-sm"
                  width={1240}
                  height={1754}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      {timeline.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-32 text-start">
          <SectionHeading
            eyebrow="Milestones"
            title={t("about.timelineTitle")}
            subtitle={t("about.timelineSubtitle")}
          />

          <div className="mt-14 max-w-4xl mx-auto">
            <ScrollTimeline items={timeline} />
          </div>
        </section>
      )}

      {/* VENDORS */}
      <section className="bg-secondary/40 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-32">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              {t("about.vendorsTitle")}
            </h2>
          </div>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("about.vendorsBody")}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v, idx) => (
              <Reveal key={v.name} delay={idx * 60}>
                <div className="group relative overflow-hidden rounded-md bg-card p-5 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] flex flex-col justify-between h-full min-h-[160px] text-start">
                  <div className="flex items-center justify-between gap-4">
                    {/* Logo container */}
                    <div className="h-8 w-20 bg-muted/30 border border-border/40 rounded-sm p-1.5 flex items-center justify-center shrink-0 select-none">
                      {(() => {
                        const LogoComp = getVendorLogo(v.name);
                        return LogoComp ? (
                          <LogoComp className="h-full w-full object-contain filter brightness-95 dark:brightness-100" />
                        ) : (
                          <Building2 className="h-4 w-4 text-muted-foreground/60" />
                        );
                      })()}
                    </div>

                    {/* Blinking approval indicator */}
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="font-display text-sm font-bold text-foreground">{v.name}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-1" dir="ltr">
                      #{v.number}
                    </p>
                  </div>
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
