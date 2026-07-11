import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Building2,
  Calendar,
  ArrowRight,
  Gauge,
  Layers,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/site/GlowCard";

import caseCompressor from "@/assets/project-compressor.png";
import caseTransformer from "@/assets/project-transformer.png";
import caseAcidSewer from "@/assets/project-acid-sewer.png";
import caseMaadenReactor from "@/assets/project-maaden-reactor.png";

import fieldTankPrep from "@/assets/field-concrete-waterproofing.jpg";
import fieldTankCfrp from "@/assets/field-defect-survey.jpg";
import fieldPipelineWrap from "@/assets/field-cfrp-pipeline-live.jpg";
import fieldCrewFrp from "@/assets/field-pipe-corrosion-before.jpg";

import {
  SabicLogo,
  AramcoLogo,
  MaadenLogo,
  SipchemLogo,
  SecLogo,
} from "@/components/site/ClientLogos";

type ProjectItem = { title: string; client: string; location: string; period: string };

type FeaturedProject = {
  title: string;
  client: string;
  location: string;
  period: string;
  system: string;
  impact: string;
  desc: string;
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Major Orders Completed — SILSILAT AL-THIQA" },
      {
        name: "description",
        content:
          "Rehabilitation, CFRP lining and structural repair work delivered for SABIC, Aramco, Maaden, SAFCO, KJO and others across Saudi Arabia.",
      },
      { property: "og:title", content: "Major Orders Completed — SILSILAT AL-THIQA" },
      {
        property: "og:description",
        content: "Snapshot of completed work for refineries, petrochemical and mining clients.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = i18n.language === "ar"
      ? "المشاريع المنجزة — سلسلة الثقة"
      : "Major Orders Completed — SILSILAT AL-THIQA";
  }, [i18n.language]);

  const items = useMemo(() => {
    const itemsData = t("projects.items", { returnObjects: true });
    return Array.isArray(itemsData) ? (itemsData as ProjectItem[]) : [];
  }, [t]);

  const [filter, setFilter] = useState<string>("all");

  const clients = useMemo(() => Array.from(new Set(items.map((i) => i.client))), [items]);
  const filtered = filter === "all" ? items : items.filter((i) => i.client === filter);

  // Dynamic Case Studies mapping AI generated images to case study items in translations
  const featuredData = t("projects.featured", { returnObjects: true });
  const featuredArray = Array.isArray(featuredData) ? (featuredData as FeaturedProject[]) : [];
  const featuredCases = featuredArray.map((c, idx) => {
    const images = [caseCompressor, caseTransformer, caseAcidSewer, caseMaadenReactor];
    const tags = ["PETROCHEMICAL", "POWER", "INDUSTRIAL", "MINING & ACID"];
    const tagColors = [
      "bg-accent text-accent-foreground",
      "bg-yellow-400 text-ink",
      "bg-sky-400 text-ink",
      "bg-orange-400 text-ink",
    ];
    return {
      ...c,
      img: images[idx] || caseCompressor,
      tag: tags[idx],
      tagColor: tagColors[idx],
    };
  });

  const getClientLogo = (clientName: string) => {
    const name = clientName.toLowerCase();
    if (name.includes("aramco") || name.includes("kjo")) return AramcoLogo;
    if (name.includes("sabic") || name.includes("safco")) return SabicLogo;
    if (name.includes("maaden")) return MaadenLogo;
    if (name.includes("sipchem")) return SipchemLogo;
    if (name.includes("sec") || name.includes("electricity")) return SecLogo;
    return null;
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground border-b border-white/10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${caseCompressor})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
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
          </motion.div>
        </div>
      </section>

      {/* FROM THE FIELD — REAL PROJECT DOCUMENTATION */}
      <section className="bg-background border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {i18n.language === "ar" ? "من الميدان" : "From the Field"}
            </div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              {i18n.language === "ar"
                ? "توثيق ميداني حقيقي لأعمال التأهيل والحماية"
                : "Real field documentation from live rehabilitation work"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {i18n.language === "ar"
                ? "لقطات مباشرة من فرقنا أثناء تنفيذ أنظمة CFRP، تبطين الخزانات، تغليف الأنابيب، والعزل المائي داخل منشآت صناعية عاملة."
                : "Direct captures of our crews executing CFRP wrapping, tank lining, pipeline reinforcement and waterproofing inside live industrial facilities."}
            </p>
          </div>

          <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                img: fieldPipelineWrap,
                tag: i18n.language === "ar" ? "تغليف أنابيب CFRP" : "CFRP Pipeline Wrap",
                caption:
                  i18n.language === "ar"
                    ? "إصلاح أنبوب عمليات أثناء التشغيل — دون لحام حار ودون إيقاف الإنتاج."
                    : "Live in-service pipeline repair — no hot work, zero production shutdown.",
              },
              {
                img: fieldCrewFrp,
                tag: i18n.language === "ar" ? "قبل الإصلاح" : "Before Repair",
                caption:
                  i18n.language === "ar"
                    ? "أنبوب عمليات متآكل قبل التدخل — يخضع للتقييم الهندسي وفق ASME PCC-2."
                    : "Corroded process pipe prior to intervention — engineered per ASME PCC-2.",
              },
              {
                img: fieldTankCfrp,
                tag: i18n.language === "ar" ? "مسح العيوب" : "Defect Survey",
                caption:
                  i18n.language === "ar"
                    ? "توثيق العيوب داخل خزانات وأنابيب صناعية قبل تصميم نظام الإصلاح."
                    : "Documenting defects inside industrial tanks & pipes before designing the repair system.",
              },
              {
                img: fieldTankPrep,
                tag: i18n.language === "ar" ? "عزل خرساني" : "Concrete Waterproofing",
                caption:
                  i18n.language === "ar"
                    ? "نظام حماية وعزل مركّب على وصلة خرسانية إنشائية."
                    : "Composite waterproofing & protection system on a structural concrete joint.",
              },
            ].map((item, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.32, 0.72, 0, 1] }}
                className="group relative overflow-hidden rounded-md bg-card shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.img}
                    alt={item.tag}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute top-3 start-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                    {item.tag}
                  </span>
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-white/90 leading-snug">
                  {item.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDIES WITH AI GENERATED IMAGES */}
      <section className="bg-secondary/20 border-b border-border py-12 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow={i18n.language === 'ar' ? 'دراسات حالة' : 'Case Studies'}
            title={i18n.language === 'ar' ? 'أبرز مشاريع التأهيل الصناعي' : 'Featured Industrial Rehabilitation Projects'}
          />

          <div className="mt-16 grid lg:grid-cols-12 gap-12 items-start relative">
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start hidden lg:block">
              <h3 className="font-display text-2xl font-bold tracking-tight mb-4 text-foreground">{i18n.language === 'ar' ? 'عمليات استثنائية' : 'Elite Operations'}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {i18n.language === 'ar' ? 'نظرة عامة على تدخلاتنا الهندسية الحرجة، حيث نقدم حلولاً مخصصة نُفذت أثناء التشغيل الحي دون الحاجة لإيقاف الإنتاج.' : 'An overview of our most critical engineering interventions, showcasing bespoke solutions applied under live conditions without halting production.'}
              </p>
              <div className="h-px w-12 bg-accent mt-8" />
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-24">
            {featuredCases.map((project, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="group flex flex-col relative"
                data-magnetic
              >
                {/* High-end typographic overlap */}
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tighter text-foreground absolute -top-8 -start-4 z-10 opacity-10 pointer-events-none group-hover:text-accent transition-colors duration-700">
                  {String(idx + 1).padStart(2, '0')}
                </h3>

                <div className="bg-card rounded-md overflow-hidden shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] relative z-0 flex flex-col h-full">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      width={800}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
                    <span
                      className={`absolute top-4 start-4 ${project.tagColor} text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm`}
                    >
                      {project.tag}
                    </span>
                    <div className="absolute bottom-6 inset-x-6 text-white flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{project.client}</p>
                        <h4 className="font-display text-2xl font-bold leading-tight mt-1">
                          {project.title}
                        </h4>
                      </div>
                      <span
                        className="text-[10px] bg-ink/80 backdrop-blur border border-white/10 px-2 py-1 rounded-sm flex items-center gap-1.5 font-mono text-white/90"
                        dir="ltr"
                      >
                        <Calendar className="h-3 w-3 text-accent" /> {project.period}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-card relative">
                    <div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.desc}</p>

                      <div className="grid sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-border">
                        <div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                            Applied System
                          </span>
                          <span className="text-sm font-semibold text-foreground mt-1.5 flex items-start gap-2">
                            <Layers className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-tight">{project.system}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                            Measured Impact
                          </span>
                          <span className="text-sm font-semibold text-foreground mt-1.5 flex items-start gap-2">
                            <Activity className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-tight">{project.impact}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 flex justify-between items-center border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                        <MapPin className="h-4 w-4 text-accent shrink-0" /> {project.location}
                      </span>
                      {getClientLogo(project.client) && (
                        <div className="h-8 w-24 text-muted-foreground/30 flex items-center justify-end">
                          {(() => {
                            const Logo = getClientLogo(project.client)!;
                            return <Logo className="h-full w-full" />;
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
            </div>
          </div>
        </div>
      </section>


      {/* GENERAL REGISTRY FILTERS */}
      <section className="border-b border-border bg-background sticky top-20 z-30 backdrop-blur-md">
        {/* Covers the 80px gap above when the main header hides on scroll */}
        <div className="absolute inset-x-0 h-20 -top-20 bg-background pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 py-4 flex overflow-x-auto no-scrollbar items-center gap-2 whitespace-nowrap">
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

      {/* PROJECT REGISTRY LIST */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => (
            <Reveal
              key={`${filter}-${idx}`}
              delay={idx * 40}
            >
              <GlowCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-xs font-semibold text-muted-foreground tabular-nums">
                      #{String(items.indexOf(p) + 1).padStart(2, "0")}
                    </p>
                    {p.period === "2026" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                        <Activity className="h-3 w-3 text-amber-500" />
                        {t("projects.ongoing")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                        <CheckCircle2 className="h-3 w-3 text-accent" />
                        {t("projects.completed")}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-base md:text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                </div>

                <div className="mt-6 pt-5 border-t border-border flex justify-between items-end">
                  <div className="space-y-2.5 text-sm">
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

                  {getClientLogo(p.client) && (
                    <div className="h-8 w-20 text-muted-foreground/30 flex items-center justify-end">
                      {(() => {
                        const Logo = getClientLogo(p.client)!;
                        return <Logo className="h-full w-full" />;
                      })()}
                    </div>
                  )}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 rounded-sm border border-border bg-secondary/40 p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-semibold leading-tight text-balance max-w-2xl mx-auto">
            {t("home.ctaTitle")}
          </h2>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-sm bg-accent text-accent-foreground hover:bg-accent/90"
          >
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
