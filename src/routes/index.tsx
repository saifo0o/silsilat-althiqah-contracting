import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  Wrench,
  Droplet,
  Gauge,
  FlaskConical,
  Package,
  BadgeCheck,
  HardHat,
  Zap,
  Search,
  PenTool,
  Hammer,
  FileCheck,
  MapPin,
  ChevronRight,
} from "lucide-react";
import hero from "@/assets/hero-refinery.jpg";
import ogImage from "@/assets/og-image.jpg";
import carbon from "@/assets/service-carbon-fiber.jpg";
import epoxy from "@/assets/service-epoxy.jpg";
import concrete from "@/assets/service-concrete.jpg";
import piping from "@/assets/service-piping.jpg";

import about from "@/assets/about-engineers.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { StatCounter } from "@/components/site/StatCounter";
import { Marquee } from "@/components/site/Marquee";
import { Button } from "@/components/ui/button";

type ProjectItem = { title: string; client: string; location: string; period: string };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seema — Structural Rehabilitation & Industrial Services" },
      { name: "description", content: "Carbon fiber reinforcement, concrete & steel repair, process piping rehabilitation and corrosion-grade epoxy coatings for the Kingdom's industry." },
      { property: "og:title", content: "Seema — Structural Rehabilitation & Industrial Services" },
      { property: "og:description", content: "Specialised engineered services for Saudi Arabia's industrial sector." },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const heroServices = [
  { key: "carbon", Icon: Layers, img: carbon },
  { key: "piping", Icon: Gauge, img: piping },
  { key: "epoxy", Icon: Droplet, img: epoxy },
  { key: "concrete", Icon: Wrench, img: concrete },
  { key: "acid", Icon: FlaskConical, img: null },
  { key: "supplies", Icon: Package, img: null },
] as const;

const projectImages = [project1, project2, project3];
const whyIcons = { specialist: HardHat, compliance: BadgeCheck, safety: ShieldCheck, speed: Zap };
const processIcons = [Search, PenTool, Hammer, FileCheck];

const clientLogos = ["SABIC", "ARAMCO", "MAADEN", "SEC", "SAFCO", "S-CHEM", "SAHARA", "KJO"];

function HomePage() {
  const { t } = useTranslation();
  const allProjects = t("projects.items", { returnObjects: true }) as ProjectItem[];
  const featured = allProjects.slice(0, 3);

  const stats = [
    { v: t("home.stats.yearsValue"), l: t("home.stats.yearsLabel") },
    { v: t("home.stats.projectsValue"), l: t("home.stats.projectsLabel") },
    { v: t("home.stats.partnersValue"), l: t("home.stats.partnersLabel") },
    { v: t("home.stats.sectorsValue"), l: t("home.stats.sectorsLabel") },
  ];

  const whyKeys = ["specialist", "compliance", "safety", "speed"] as const;
  const processKeys = [1, 2, 3, 4] as const;
  const sectors = t("clients.sectors", { returnObjects: true }) as string[];

  return (
    <>
      {/* HERO — cinematic full-bleed */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="absolute inset-0 grid-pattern opacity-[0.08] text-ink-foreground" />
        <div className="absolute -bottom-32 start-1/4 h-96 w-96 rounded-full bg-accent/30 blur-[120px]" />

        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-44 lg:pb-40">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-foreground/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {t("home.heroEyebrow")}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-balance">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-7 max-w-2xl text-base md:text-lg text-ink-foreground/75 leading-relaxed">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow px-6"
              >
                <Link to="/services">
                  {t("home.heroCtaPrimary")}
                  <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 text-ink-foreground hover:bg-white/10 px-6"
              >
                <Link to="/contact">{t("home.heroCtaSecondary")}</Link>
              </Button>
            </div>
            <p className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-foreground/55">
              <BadgeCheck className="h-4 w-4 text-accent" />
              {t("home.heroBadge")}
            </p>
          </div>
        </div>

        {/* Stats strip overlaying hero bottom */}
        <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {stats.map((s) => (
              <div key={s.l} className="bg-ink/95">
                <StatCounter value={s.v} label={s.l} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <section className="border-b border-border bg-background py-10">
        <p className="container mx-auto px-4 md:px-6 mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Approved vendor & trusted by
        </p>
        <Marquee
          items={clientLogos.map((c) => (
            <span
              key={c}
              className="font-display text-2xl md:text-3xl font-semibold tracking-[0.2em] text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {c}
            </span>
          ))}
        />
      </section>

      {/* INTRO — split with image */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow={t("home.intro.eyebrow")}
              title={t("home.intro.title")}
              subtitle={t("home.intro.body")}
            />
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {(["mission", "goal", "vision"] as const).map((k) => (
                <div key={k} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {t(`values.${k}Title`)}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {t(`values.${k}Body`).split(".")[0]}.
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border aspect-[4/3]">
                <img
                  src={about}
                  alt="Seema engineers reviewing drawings on a Saudi industrial site"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1067}
                />
              </div>
              <div className="absolute -bottom-6 start-6 rounded-2xl border border-border bg-background px-5 py-4 shadow-elegant">
                <p className="font-display text-3xl font-semibold" dir="ltr">2013</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Operating since
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — bento grid */}
      <section className="relative bg-secondary/50 border-y border-border overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.04] text-foreground" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={t("home.servicesEyebrow")}
              title={t("home.servicesTitle")}
              subtitle={t("home.servicesSubtitle")}
            />
            <Button asChild variant="outline" className="rounded-full shrink-0">
              <Link to="/services">
                {t("common.viewServices")}
                <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-6 lg:grid-cols-12 auto-rows-[minmax(240px,auto)]">
            {heroServices.map(({ key, Icon, img }, idx) => {
              const spans = [
                "md:col-span-3 lg:col-span-7 lg:row-span-2",
                "md:col-span-3 lg:col-span-5",
                "md:col-span-3 lg:col-span-5",
                "md:col-span-3 lg:col-span-4",
                "md:col-span-3 lg:col-span-4",
                "md:col-span-6 lg:col-span-4",
              ];
              return (
                <Reveal
                  key={key}
                  delay={idx * 80}
                  as="article"
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-elegant ${spans[idx]}`}
                >
                  {img ? (
                    <>
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        width={1280}
                        height={960}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/10" />
                      <div className="relative flex h-full flex-col justify-end p-6 md:p-8 text-ink-foreground">
                        <div className="h-10 w-10 rounded-md bg-white/10 backdrop-blur text-accent flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 font-display text-xl md:text-2xl font-semibold leading-tight">
                          {t(`services.items.${key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-ink-foreground/75 max-w-md line-clamp-3">
                          {t(`services.items.${key}.body`)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="relative flex h-full flex-col p-6 md:p-8">
                      <div className="h-10 w-10 rounded-md bg-accent/15 text-accent flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-lg md:text-xl font-semibold leading-tight">
                        {t(`services.items.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {t(`services.items.${key}.body`)}
                      </p>
                      <div className="mt-auto pt-6 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-accent">
                        {t("common.learnMore")}
                        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow={t("home.whyEyebrow")}
            title={t("home.whyTitle")}
            subtitle={t("home.whySubtitle")}
            align="center"
            className="mb-16"
          />
        </Reveal>
        <div className="grid gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {whyKeys.map((k, idx) => {
            const Icon = whyIcons[k];
            return (
              <Reveal
                key={k}
                delay={idx * 80}
                className="bg-card p-8 md:p-10 hover:bg-secondary/40 transition-colors"
              >
                <div className="grid gap-6 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-1">
                    <p className="font-mono text-xs text-accent">0{idx + 1}</p>
                  </div>
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {t(`home.why.${k}Title`)}
                    </h3>
                  </div>
                  <p className="md:col-span-8 text-muted-foreground leading-relaxed">
                    {t(`home.why.${k}Body`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROCESS — dark band */}
      <section className="relative bg-ink text-ink-foreground border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.05] text-ink-foreground" />
        <div className="absolute top-1/2 -translate-y-1/2 -start-32 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <SectionHeading
            eyebrow={t("home.processEyebrow")}
            title={t("home.processTitle")}
            invert
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processKeys.map((n, idx) => {
              const Icon = processIcons[idx];
              return (
                <Reveal
                  key={n}
                  delay={idx * 100}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur"
                >
                  <p className="font-mono text-xs text-accent">STEP 0{n}</p>
                  <div className="mt-4 h-12 w-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {t(`home.process.step${n}Title`)}
                  </h3>
                  <p className="mt-3 text-sm text-ink-foreground/70 leading-relaxed">
                    {t(`home.process.step${n}Body`)}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("home.projectsEyebrow")}
            title={t("home.projectsTitle")}
          />
          <Button asChild variant="outline" className="rounded-full shrink-0">
            <Link to="/projects">
              {t("common.viewProjects")}
              <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((p, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <Link
                to="/projects"
                className="group block overflow-hidden rounded-2xl border border-border bg-card hover:shadow-elegant transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <img
                    src={projectImages[idx]}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={1280}
                    height={960}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute top-4 start-4 rounded-full bg-background/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                    {p.client}
                  </span>
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {p.location} · <span dir="ltr">{p.period.split("–")[0]}</span>
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <Reveal>
            <SectionHeading
              eyebrow={t("home.industriesEyebrow")}
              title={t("home.industriesTitle")}
              align="center"
              className="mb-14"
            />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, idx) => (
              <Reveal key={s} delay={idx * 50}>
                <div className="group rounded-xl border border-border bg-background p-5 hover:border-accent/50 hover:bg-card hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{s}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-accent rtl:rotate-180 transition-colors" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 py-24 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink text-ink-foreground px-8 py-16 md:px-16 md:py-24">
            <img
              src={hero}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
              loading="lazy"
              width={1920}
              height={1088}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/40" />
            <div className="absolute -top-32 -end-32 h-96 w-96 rounded-full bg-accent/30 blur-[120px]" />
            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-foreground/70">
                <MapPin className="h-3 w-3 text-accent" />
                {t("home.ctaPill")}
              </div>
              <h2 className="mt-6 font-display text-3xl md:text-5xl font-semibold leading-[1.05] text-balance">
                {t("home.ctaTitle")}
              </h2>
              <p className="mt-5 text-ink-foreground/75 text-lg max-w-xl">{t("home.ctaBody")}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow px-6"
                >
                  <Link to="/contact">
                    {t("home.ctaButton")}
                    <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/25 bg-white/5 text-ink-foreground hover:bg-white/10 px-6"
                >
                  <a href="mailto:danny@seema.sa.com" dir="ltr">danny@seema.sa.com</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
