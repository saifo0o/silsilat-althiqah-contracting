import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Wrench,
  Droplet,
  Package,
  HardHat,
  ChevronLeft,
  ChevronRight,
  Leaf,
  HeartHandshake,
  Zap,
  Layers,
  Droplets,
  Landmark,
  Anchor,
  FlaskConical,
  MapPin,
  Search,
  Shield,
  Activity,
  Phone,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import hero from "@/assets/hero-refinery.jpg";
import { PromoVideo } from "@/components/site/PromoVideo";
import tileStructural from "@/assets/service-concrete.jpg";
import tilePiping from "@/assets/service-piping.jpg";
import tileCoatings from "@/assets/service-epoxy.jpg";
import tileSupply from "@/assets/service-steel.jpg";

import caseCompressor from "@/assets/project-compressor.png";
import caseTransformer from "@/assets/project-transformer.png";
import caseAcidSewer from "@/assets/project-acid-sewer.png";
import caseMaadenReactor from "@/assets/project-maaden-reactor.png";

import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import {
  SabicLogo,
  AramcoLogo,
  MaadenLogo,
  SipchemLogo,
} from "@/components/site/ClientLogos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SILSILAT AL-THIQA — Reduce Downtime. Extend Asset Life. Protect What Matters." },
      {
        name: "description",
        content:
          "SILSILAT AL-THIQA delivers advanced engineering solutions for structural rehabilitation, pipe repair, and industrial protection across Saudi Arabia.",
      },
      { property: "og:title", content: "SILSILAT AL-THIQA — Engineered Industrial Services" },
      {
        property: "og:description",
        content: "Advanced engineering solutions for the Kingdom's heaviest industries.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

type FeaturedProject = {
  title: string;
  client: string;
  location: string;
  period: string;
  system: string;
  impact: string;
  desc: string;
};

function HomePage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [activeCase, setActiveCase] = useState(0);
  const { scrollYProgress } = useScroll();

  // Carousel States
  const [servicesApi, setServicesApi] = useState<CarouselApi>();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  const [casesApi, setCasesApi] = useState<CarouselApi>();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [casesCount, setCasesCount] = useState(0);

  useEffect(() => {
    if (!servicesApi) return;
    setServicesCount(servicesApi.scrollSnapList().length);
    setCurrentServiceIndex(servicesApi.selectedScrollSnap());
    
    servicesApi.on("select", () => {
      setCurrentServiceIndex(servicesApi.selectedScrollSnap());
    });
  }, [servicesApi]);

  useEffect(() => {
    if (!casesApi) return;
    setCasesCount(casesApi.scrollSnapList().length);
    setCurrentCaseIndex(casesApi.selectedScrollSnap());
    
    casesApi.on("select", () => {
      setCurrentCaseIndex(casesApi.selectedScrollSnap());
      setActiveCase(casesApi.selectedScrollSnap());
    });
  }, [casesApi]);

  // Sync Carousel when activeCase is changed from other controls
  useEffect(() => {
    if (casesApi && casesApi.selectedScrollSnap() !== activeCase) {
      casesApi.scrollTo(activeCase);
    }
  }, [activeCase, casesApi]);



  // Dynamic lists using translation keys to avoid hardcoded text


  const tiles = [
    {
      Icon: Search,
      title: t("home.tiles.assessment.title"),
      body: t("home.tiles.assessment.body"),
      img: tilePiping,
    },
    {
      Icon: Layers,
      title: t("home.tiles.rehabilitation.title"),
      body: t("home.tiles.rehabilitation.body"),
      img: tileStructural,
    },
    {
      Icon: Shield,
      title: t("home.tiles.protection.title"),
      body: t("home.tiles.protection.body"),
      img: tileCoatings,
    },
    {
      Icon: Activity,
      title: t("home.tiles.endurance.title"),
      body: t("home.tiles.endurance.body"),
      img: tileSupply,
    },
  ];

  const whyCards = [
    {
      Icon: Building2,
      title: t("home.why.specialistTitle"),
      body: t("home.why.specialistBody"),
    },
    {
      Icon: HeartHandshake,
      title: t("home.why.complianceTitle"),
      body: t("home.why.complianceBody"),
    },
    {
      Icon: ShieldCheck,
      title: t("home.why.safetyTitle"),
      body: t("home.why.safetyBody"),
    },
    {
      Icon: Zap,
      title: t("home.why.speedTitle"),
      body: t("home.why.speedBody"),
    },
  ];

  const processSteps = [
    { num: "01", title: t("home.process.step1Title"), body: t("home.process.step1Body") },
    { num: "02", title: t("home.process.step2Title"), body: t("home.process.step2Body") },
    { num: "03", title: t("home.process.step3Title"), body: t("home.process.step3Body") },
    { num: "04", title: t("home.process.step4Title"), body: t("home.process.step4Body") },
  ];

  const industrySectors = [
    { key: "oil", label: t("clients.sectors.0", "Oil & Gas"), Icon: Droplet },
    { key: "petro", label: t("clients.sectors.1", "Petrochemical"), Icon: FlaskConical },
    { key: "power", label: t("clients.sectors.2", "Power & Utilities"), Icon: Zap },
    { key: "mining", label: t("clients.sectors.3", "Mining & Minerals"), Icon: Layers },
    { key: "water", label: t("clients.sectors.4", "Water & Irrigation"), Icon: Droplets },
    { key: "fertilizer", label: t("clients.sectors.5", "Fertilisers"), Icon: Leaf },
    { key: "marine", label: t("clients.sectors.6", "Marine & Industrial Plants"), Icon: Anchor },
    { key: "gov", label: t("clients.sectors.7", "Government"), Icon: Landmark },
  ];

  const clientLogos = [
    { Comp: AramcoLogo },
    { Comp: SabicLogo },
    { Comp: MaadenLogo },
    { Comp: SipchemLogo },
  ];



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

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-10 md:pt-40 md:pb-16 lg:pt-44">
          <div className="grid lg:grid-cols-12 gap-8 lg:items-start">
            <div className="lg:col-span-12 max-w-4xl">
              <h1 className="font-display font-bold leading-[0.98] tracking-tight text-balance text-[clamp(2.5rem,6.5vw,5.25rem)]">
                {t("home.heroEyebrow")}
              </h1>
              <p className="mt-4 font-display font-semibold leading-tight tracking-tight text-balance text-[clamp(1.25rem,2.8vw,2rem)] text-ink-foreground/90">
                {t("home.heroTitle1")} {t("home.heroTitle2")}{" "}
                <span className="text-accent">{t("home.heroTitle3")}</span>
              </p>
              <p className="mt-7 max-w-xl text-base md:text-lg text-ink-foreground/75 leading-relaxed">
                {t("home.heroSubtitle")}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 px-7 h-12 font-bold uppercase tracking-wider text-xs"
                >
                  <Link to="/services">
                    {t("home.heroCtaPrimary")}
                    <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-sm border-white/30 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground px-7 h-12 font-bold uppercase tracking-wider text-xs"
                >
                  <Link to="/contact">{t("home.heroCtaSecondary")}</Link>
                </Button>
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* PROMO VIDEO */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
              {t("home.videoEyebrow")}
            </p>
            <h2 className="mt-4 font-display text-2xl md:text-4xl font-bold tracking-tight text-balance">
              {t("home.videoTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">
              {t("home.videoSubtitle")}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <PromoVideo />
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">
                {t("home.expertiseEyebrow")}
              </p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                {t("home.expertiseTitle")}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-muted-foreground leading-relaxed">{t("home.expertiseBody")}</p>
              <Link
                to="/services"
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground hover:text-accent-foreground hover:bg-accent transition-colors px-1 py-1"
              >
                {t("home.expertiseCta")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Desktop Layout (hidden on mobile) */}
          <div className="mt-16 hidden md:grid md:grid-cols-12 gap-8 items-start">
            {tiles.map((tile, idx) => {
              const colSpans = [
                "md:col-span-5 md:mt-0", 
                "md:col-span-7 md:mt-24", 
                "md:col-span-7 md:-mt-12", 
                "md:col-span-5 md:mt-12"
              ];
              const heights = ["h-64", "h-96", "h-80", "h-72"];
              
              return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.32, 0.72, 0, 1] }}
                className={cn("group bg-card rounded-md overflow-hidden shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]", colSpans[idx])}
                data-magnetic
              >
                <div className={cn("relative overflow-hidden", heights[idx])}>
                  <img
                    src={tile.img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute top-4 left-4 h-12 w-12 rounded-sm bg-card/95 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-accent/40 transition-colors">
                    <tile.Icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold leading-tight group-hover:text-accent transition-colors">{tile.title}</h3>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {tile.body}
                  </p>
                  <Link
                    to="/services"
                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-accent-foreground bg-accent px-3 py-1.5 group-hover:gap-3 transition-[gap,background-color]"
                  >
                    {t("common.learnMore")} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </motion.article>
            )})}
          </div>

          {/* Mobile Layout (hidden on desktop) */}
          <div className="mt-12 block md:hidden">
            <Carousel setApi={setServicesApi} className="w-full" opts={{ direction: isRtl ? "rtl" : "ltr" }}>
              <CarouselContent className="-ms-4">
                {tiles.map((tile, idx) => (
                  <CarouselItem key={idx} className="ps-4 basis-[85%] sm:basis-[60%] flex">
                    <article className="bg-card rounded-md overflow-hidden shadow-emil active:scale-[0.98] transition-transform duration-300 ease-[var(--ease-emil)] flex flex-col justify-between w-full">
                      <div>
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={tile.img}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                            width={400}
                            height={300}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                          <div className="absolute top-3 left-3 h-10 w-10 rounded-sm bg-card/95 backdrop-blur-md flex items-center justify-center border border-white/10">
                            <tile.Icon className="h-5 w-5 text-accent" />
                          </div>
                        </div>
                        <div className="p-5 text-start">
                          <h3 className="font-display text-lg font-bold leading-tight text-foreground">{tile.title}</h3>
                          <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {tile.body}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 pb-5 flex justify-start">
                        <Link
                          to="/services"
                          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent-foreground bg-accent px-3 py-1.5"
                        >
                          {t("common.learnMore")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                        </Link>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: servicesCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => servicesApi?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentServiceIndex === i ? "w-5 bg-accent" : "w-1.5 bg-white/20"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SILSILAT AL-THIQA */}
      <section className="bg-background border-b border-border relative overflow-hidden py-12 md:py-28">
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">
              {t("home.whyEyebrow")}
            </p>
            <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold tracking-tight">
              {t("home.whyTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              {t("home.whySubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12 lg:grid-cols-12 text-start">
            {whyCards.map((card, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  className={cn(
                    "bg-card rounded-md p-8 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] group relative overflow-hidden",
                    isEven ? "md:col-span-7 lg:col-span-7 md:mt-12" : "md:col-span-5 lg:col-span-5",
                  )}
                  data-magnetic
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="h-14 w-14 rounded-full bg-secondary text-foreground flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 shadow-sm border border-border group-hover:border-transparent">
                    <card.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 font-display text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">{card.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* REHABILITATION PROCESS */}
      <section className="bg-secondary/40 border-b border-border py-12 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">
              {t("home.processEyebrow")}
            </p>
            <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold tracking-tight">
              {t("home.processTitle")}
            </h2>
          </div>

          <div className="relative mt-12">
            {/* Connecting lines for process steps on large viewports */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-border -translate-y-8 z-0 pointer-events-none" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {processSteps.map((step, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative bg-card p-6 rounded-md group shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-3xl font-bold text-accent/20 group-hover:text-accent transition-colors duration-300">
                      {step.num}
                    </span>
                    <div className="h-8 w-8 rounded-sm bg-secondary flex items-center justify-center border border-border text-foreground">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">
                {t("home.projectsEyebrow")}
              </p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">
                {t("home.projectsTitle")}
                <br />
                {t("home.projectsTitle2")}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/projects"
                className="text-[11px] font-bold uppercase tracking-wider hover:text-accent-foreground hover:bg-accent transition-colors px-1 py-1"
              >
                {t("common.viewProjects")} →
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCase((i) => Math.max(0, i - 1))}
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveCase((i) => Math.min(featuredCases.length - 1, i + 1))}
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Case Studies Grid (hidden on mobile) */}
          <div className="hidden lg:grid gap-8 lg:grid-cols-12 mt-12 items-stretch text-start">
            {/* Left Column: Big Spotlight Card */}
            <div className="lg:col-span-8 flex flex-col justify-between rounded-md bg-card overflow-hidden group shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {featuredCases[activeCase]?.img && (
                  <img
                    src={featuredCases[activeCase].img}
                    alt={featuredCases[activeCase].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-955/90 via-slate-950/20 to-transparent pointer-events-none" />
                <span
                  className={cn(
                    "absolute top-4 start-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm text-ink",
                    featuredCases[activeCase]?.tagColor,
                  )}
                >
                  {featuredCases[activeCase]?.tag}
                </span>

                <div className="absolute bottom-6 start-6 end-6 text-white text-start">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    Featured Rehabilitation Case
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-bold leading-tight mt-1 group-hover:text-emerald-400 transition-colors">
                    {featuredCases[activeCase]?.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />{" "}
                      {featuredCases[activeCase]?.location}
                    </span>
                    <span className="text-white/40">|</span>
                    <span>{featuredCases[activeCase]?.period}</span>
                  </div>
                </div>
              </div>

              {/* Spotlight info footer */}
              <div className="p-6 md:p-8 bg-card flex-1 flex flex-col justify-between">
                <div>
                  <div className="grid sm:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        {t("projects.headers.client")}
                      </p>
                      <p className="font-display font-bold text-sm text-foreground mt-0.5">
                        {featuredCases[activeCase]?.client}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                        REHAB SYSTEM
                      </p>
                      <p className="font-display font-bold text-sm text-foreground mt-0.5">
                        {featuredCases[activeCase]?.system}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-emerald-500 font-bold">
                        OPERATIONAL IMPACT
                      </p>
                      <p className="font-display font-bold text-sm text-emerald-500 mt-0.5">
                        {featuredCases[activeCase]?.impact}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {featuredCases[activeCase]?.desc}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase font-bold tracking-wider"
                  >
                    <Link to="/projects">
                      View Full Log <ArrowRight className="h-3.5 w-3.5 ms-1.5 rtl:rotate-180" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Case Studies Selection List */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {featuredCases.map((p, idx) => {
                const isActive = activeCase === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCase(idx)}
                    className={cn(
                      "w-full text-start p-5 rounded-sm border transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer",
                      isActive
                        ? "bg-slate-950 border-white/10 text-white shadow-lg shadow-black/10"
                        : "bg-card border-border text-foreground hover:border-accent/40",
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isActive
                              ? "bg-emerald-400"
                              : "bg-muted-foreground/30 group-hover:bg-accent",
                          )}
                        />
                        <p
                          className={cn(
                            "font-mono text-[9px] uppercase tracking-wider",
                            isActive ? "text-emerald-400" : "text-muted-foreground",
                          )}
                        >
                          {p.client}
                        </p>
                      </div>
                      <h4
                        className={cn(
                          "font-display text-xs font-bold leading-snug mt-1.5 truncate",
                          isActive ? "text-white" : "text-foreground group-hover:text-accent",
                        )}
                      >
                        {p.title}
                      </h4>
                    </div>
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-secondary text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground",
                      )}
                    >
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Case Studies Carousel (hidden on desktop) */}
          <div className="block lg:hidden mt-8">
            <Carousel setApi={setCasesApi} className="w-full" opts={{ direction: isRtl ? "rtl" : "ltr", startIndex: activeCase }}>
              <CarouselContent className="-ms-4">
                {featuredCases.map((c, idx) => (
                  <CarouselItem key={idx} className="ps-4 basis-[90%] sm:basis-[70%] flex">
                    <div className="flex flex-col rounded-sm border border-border bg-card overflow-hidden h-full w-full">
                      {/* Image header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        {c.img && (
                          <img
                            src={c.img}
                            alt={c.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-955/90 via-slate-950/20 to-transparent pointer-events-none" />
                        <span
                          className={cn(
                            "absolute top-3 start-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm text-ink",
                            c.tagColor,
                          )}
                        >
                          {c.tag}
                        </span>

                        <div className="absolute bottom-4 start-4 end-4 text-white text-start">
                          <p className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                            Featured Rehabilitation Case
                          </p>
                          <h3 className="font-display text-sm font-bold leading-tight mt-0.5 text-white">
                            {c.title}
                          </h3>
                        </div>
                      </div>

                      {/* Detail body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="grid grid-cols-2 gap-4 mb-4 text-start">
                            <div>
                              <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                                {t("projects.headers.client")}
                              </p>
                              <p className="font-display font-bold text-xs text-foreground mt-0.5">
                                {c.client}
                              </p>
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                                REHAB SYSTEM
                              </p>
                              <p className="font-display font-bold text-xs text-foreground mt-0.5">
                                {c.system}
                              </p>
                            </div>
                          </div>
                          
                          <div className="border-t border-white/5 pt-3 mt-3 text-start">
                            <p className="text-[8px] uppercase tracking-wider text-emerald-500 font-bold">
                              OPERATIONAL IMPACT
                            </p>
                            <p className="font-display font-bold text-xs text-emerald-500 mt-0.5">
                              {c.impact}
                            </p>
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed mt-3 text-start line-clamp-3">
                            {c.desc}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-border flex justify-end">
                          <Button
                            asChild
                            size="sm"
                            className="w-full sm:w-auto rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider py-4"
                          >
                            <Link to="/projects">
                              View Full Log <ArrowRight className="h-3 w-3 ms-1.5 rtl:rotate-180" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: casesCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => casesApi?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentCaseIndex === i ? "w-5 bg-emerald-500" : "w-1.5 bg-white/20"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section className="bg-secondary/30 border-b border-border py-12 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">
              {t("home.industriesEyebrow")}
            </p>
            <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold tracking-tight">
              {t("home.industriesTitle")}
            </h2>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {industrySectors.map((sector, idx) => (
              <Reveal
                key={sector.key}
                delay={idx * 50}
                className="bg-card rounded-md p-6 flex items-center gap-4 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] group"
              >
                <div className="h-10 w-10 rounded-sm bg-accent/15 text-accent-foreground flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <sector.Icon className="h-5 w-5" />
                </div>
                <p className="font-display font-bold text-sm text-foreground group-hover:text-accent transition-colors">
                  {sector.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY + CERTIFICATIONS */}
      <section className="bg-ink text-ink-foreground border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-foreground/60 text-center lg:text-start">
            {t("home.trustedTitle")}
          </p>

          {/* Enriched 12-logo dynamic responsive grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center gap-x-8 gap-y-10">
            {clientLogos.map(({ Comp }, i) => (
              <div key={i} className="h-12 flex items-center justify-center p-1">
                <Comp className="h-full w-full object-contain brightness-0 invert opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300" />
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                {t("home.ctaTitle")}
              </h2>
              <p className="mt-5 text-ink-foreground/75 max-w-lg leading-relaxed">
                {t("home.ctaBody")}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 px-7 h-12 font-bold uppercase tracking-wider text-xs"
              >
                <Link to="/contact">
                  {t("home.ctaButton")}
                  <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-6 grid sm:grid-cols-3 gap-4">
              {[
                {
                  Icon: HardHat,
                  k: t("contact.channelsTitle"),
                  v: i18n.language === "ar" ? "الجبيل الصناعية،\nالمملكة العربية السعودية" : "Jubail Industrial City,\nKingdom of Saudi Arabia",
                },
                { 
                  Icon: Phone, 
                  k: t("contact.form.phone"), 
                  v: i18n.language === "ar" 
                    ? "يوسف الناجم:\n+966 56 119 4438\n\nعبدالعزيز السردي:\n+966 56 097 6454"
                    : "Yousef Al-Najem:\n+966 56 119 4438\n\nAbdulaziz Al-Sardi:\n+966 56 097 6454",
                  ltr: true
                },
                { 
                  Icon: ShieldCheck, 
                  k: t("contact.form.email"), 
                  v: "info@silsilat-sa.com",
                  ltr: true 
                },
              ].map((c, idx) => (
                <div key={idx} className="border border-white/10 rounded-sm p-4 bg-white/[0.02]">
                  <div className="h-9 w-9 rounded-sm border border-accent/40 flex items-center justify-center mb-3">
                    <c.Icon className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    {c.k}
                  </p>
                  <p 
                    className="mt-1 text-xs text-ink-foreground/85 whitespace-pre-line leading-snug"
                    dir={c.ltr ? "ltr" : undefined}
                  >
                    {c.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
