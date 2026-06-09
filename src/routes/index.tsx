import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Building2, Wrench, Droplet, Package,
  Users, TrendingUp, Gauge, HardHat, ChevronLeft, ChevronRight, Award, Leaf, HeartHandshake,
} from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero-refinery.jpg";
import beforePipe from "@/assets/before-pipe.jpg";
import afterPipe from "@/assets/after-pipe.jpg";
import projOilGas from "@/assets/project-oilgas.jpg";
import projPetro from "@/assets/project-petrochem.jpg";
import projIndustrial from "@/assets/project-industrial.jpg";
import projPower from "@/assets/project-power.jpg";
import tileStructural from "@/assets/service-concrete.jpg";
import tilePiping from "@/assets/service-piping.jpg";
import tileCoatings from "@/assets/service-epoxy.jpg";
import tileSupply from "@/assets/service-steel.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { SabicLogo, AramcoLogo, MaadenLogo, SipchemLogo, YasrefLogo, SecLogo } from "@/components/site/ClientLogos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEEMA — Reduce Downtime. Extend Asset Life. Protect What Matters." },
      { name: "description", content: "SEEMA delivers advanced engineering solutions for structural rehabilitation, pipe repair, and industrial protection across Saudi Arabia." },
      { property: "og:title", content: "SEEMA — Engineered Industrial Services" },
      { property: "og:description", content: "Advanced engineering solutions for the Kingdom's heaviest industries." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const stats = [
  { Icon: ShieldCheck, value: "14+", label: "Years of\nExcellence" },
  { Icon: Users, value: "500+", label: "Projects\nCompleted" },
  { Icon: TrendingUp, value: "72%", label: "Average Downtime\nReduction" },
  { Icon: Gauge, value: "2M+", label: "m² Assets\nProtected" },
  { Icon: HardHat, value: "0", label: "Compromise on\nSafety" },
];

const tiles = [
  { Icon: Building2, title: "Structural Rehabilitation", body: "Strengthening and repair of concrete and steel structures using advanced composites and epoxy systems.", img: tileStructural },
  { Icon: Wrench, title: "Process Pipe Repair", body: "In-situ pipe repair and corrosion restoration solutions that eliminate shutdowns and extend life.", img: tilePiping },
  { Icon: Droplet, title: "Industrial Coatings & Protection", body: "High-performance coatings, linings and waterproofing for extreme environments.", img: tileCoatings },
  { Icon: Package, title: "Industrial Material Supply", body: "Supplying premium quality industrial materials from trusted global manufacturers.", img: tileSupply },
];

const projects = [
  { tag: "OIL & GAS", tagColor: "bg-orange-400 text-ink", title: "Pipeline Rehabilitation", location: "Khafji, KSA", img: projOilGas, k1: "Duration", v1: "7 Days", k2: "Downtime Reduced", v2: "68%" },
  { tag: "PETROCHEMICAL", tagColor: "bg-accent text-accent-foreground", title: "Concrete Strengthening", location: "SATORP, Jubail", img: projPetro, k1: "Duration", v1: "12 Days", k2: "Life Extended", v2: "20+ Years" },
  { tag: "INDUSTRIAL", tagColor: "bg-sky-400 text-ink", title: "Tank Coating Project", location: "Industrial Port, KSA", img: projIndustrial, k1: "Area Coated", v1: "25,000 m²", k2: "System", v2: "Epoxy Novolac" },
  { tag: "POWER", tagColor: "bg-yellow-400 text-ink", title: "Roof Waterproofing", location: "Power Plant, KSA", img: projPower, k1: "Area Protected", v1: "18,500 m²", k2: "System", v2: "Polyurethane" },
];

const clientLogos = [
  { Comp: AramcoLogo }, { Comp: SabicLogo }, { Comp: MaadenLogo },
  { Comp: SipchemLogo }, { Comp: YasrefLogo }, { Comp: SecLogo },
];

const certs = [
  { Icon: Award, code: "ISO 9001:2015", label: "Quality Management" },
  { Icon: Leaf, code: "ISO 14001:2015", label: "Environmental Management" },
  { Icon: ShieldCheck, code: "ISO 45001:2018", label: "Occupational Health & Safety" },
  { Icon: HeartHandshake, code: "SABIC / Aramco / Ma'aden", label: "Approved Vendor" },
];

function HomePage() {
  const { t } = useTranslation();
  const [projIdx, setProjIdx] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" width={1920} height={1080} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="relative container mx-auto px-4 md:px-6 pt-16 pb-10 md:pt-24 md:pb-16 lg:pt-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:items-start">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                Engineered Solutions. Measurable Impact.
              </p>
              <h1 className="mt-6 font-display font-bold leading-[0.98] tracking-tight text-balance text-[clamp(2.5rem,6.5vw,5.25rem)]">
                Reduce Downtime.<br />
                Extend Asset Life.<br />
                <span className="text-accent">Protect What Matters.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base md:text-lg text-ink-foreground/75 leading-relaxed">
                SEEMA delivers advanced engineering solutions for structural rehabilitation,
                pipe repair, and industrial protection to maximize reliability, safety,
                and performance.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="group rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 px-7 h-12 font-bold uppercase tracking-wider text-xs">
                  <Link to="/services">
                    Our Solutions
                    <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-sm border-white/30 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground px-7 h-12 font-bold uppercase tracking-wider text-xs">
                  <Link to="/contact">Talk to an Expert</Link>
                </Button>
              </div>
            </div>

            {/* 24/7 badge */}
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="border border-accent/60 bg-ink/40 backdrop-blur rounded-sm p-5 w-full max-w-[240px]">
                <p className="font-display text-4xl font-bold text-accent leading-none">24/7</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-foreground">Emergency<br />Response</p>
                <ArrowUpRight className="mt-4 h-4 w-4 text-accent" />
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 md:mt-16 rounded-sm border border-white/15 bg-ink/60 backdrop-blur grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-5 py-5">
                <div className="h-11 w-11 rounded-sm border border-accent/40 flex items-center justify-center shrink-0">
                  <s.Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-accent leading-none">{s.value}</p>
                  <p className="mt-1.5 text-[11px] text-ink-foreground/75 leading-tight whitespace-pre-line">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">OUR EXPERTISE</p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                Specialized Solutions for<br />Critical Assets
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-muted-foreground leading-relaxed">
                From structure to process, we help industries overcome degradation,
                corrosion, and wear — extending asset life with advanced repair
                technologies and proven execution.
              </p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground hover:text-accent-foreground hover:bg-accent transition-colors px-1 py-1">
                Explore all services <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile, idx) => (
              <Reveal key={tile.title} delay={idx * 80} as="article" className="group bg-card rounded-sm overflow-hidden border border-border hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={tile.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" width={800} height={600} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute top-3 left-3 h-10 w-10 rounded-sm bg-card/95 backdrop-blur flex items-center justify-center">
                    <tile.Icon className="h-5 w-5 text-foreground" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold leading-tight">{tile.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">{tile.body}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground bg-accent px-2 py-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.04] text-ink-foreground" />
        <div className="relative container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">PROVEN RESULTS. REAL IMPACT.</p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">
                Restoring Integrity.<br />Delivering Performance.
              </h2>
              <p className="mt-6 text-ink-foreground/75 leading-relaxed max-w-md">
                Our engineered solutions extend asset life, improve safety and deliver
                measurable value across the most demanding environments.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 px-7 h-12 font-bold uppercase tracking-wider text-xs">
                <Link to="/projects">
                  View All Case Studies
                  <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 relative">
              {[
                { img: beforePipe, label: "BEFORE", body: "Severe corrosion and wall loss risking unplanned shutdown.", color: "bg-orange-500/90" },
                { img: afterPipe, label: "AFTER", body: "Composite repair system restored integrity and extended life by 15+ Years", color: "bg-accent" },
              ].map((it) => (
                <div key={it.label} className="relative rounded-sm overflow-hidden aspect-[4/5] group">
                  <img src={it.img} alt={it.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" width={800} height={1000} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${it.color === "bg-accent" ? "text-accent-foreground" : "text-white"} ${it.color}`}>{it.label}</span>
                    <p className="mt-2 text-sm text-ink-foreground/90 leading-snug">{it.body}</p>
                  </div>
                </div>
              ))}
              {/* Center arrows */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink border border-white/20 shadow-elegant pointer-events-auto">
                  <ChevronLeft className="h-4 w-4" />
                  <ChevronRight className="h-4 w-4 -ms-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-foreground bg-accent inline-block px-2 py-1">FEATURED PROJECTS</p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">
                Delivering Complex Solutions<br />Across Critical Industries
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/projects" className="text-[11px] font-bold uppercase tracking-wider hover:text-accent-foreground hover:bg-accent transition-colors px-1 py-1">
                View All Projects →
              </Link>
              <div className="flex gap-2">
                <button onClick={() => setProjIdx((i) => Math.max(0, i - 1))} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors" aria-label="Previous">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => setProjIdx((i) => Math.min(projects.length - 4, i + 1))} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors" aria-label="Next">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 80}>
                <Link to="/projects" className="group block rounded-sm overflow-hidden bg-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" width={1280} height={960} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                    <span className={`absolute top-3 left-3 ${p.tagColor} text-[10px] font-bold uppercase tracking-wider px-2 py-1`}>{p.tag}</span>
                    <div className="absolute inset-x-0 bottom-0 p-4 text-ink-foreground">
                      <h3 className="font-display text-base font-bold leading-tight">{p.title}</h3>
                      <p className="mt-1 text-[11px] text-ink-foreground/80 flex items-center gap-1">
                        <span className="text-accent">●</span> {p.location}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-card">
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.k1}</p>
                      <p className="mt-1 font-display font-bold text-sm">{p.v1}</p>
                    </div>
                    <div className="p-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.k2}</p>
                        <p className="mt-1 font-display font-bold text-sm">{p.v2}</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors shrink-0">
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY + CERTIFICATIONS */}
      <section className="bg-ink text-ink-foreground">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink-foreground/60">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-x-10 gap-y-8">
            {clientLogos.map(({ Comp }, i) => (
              <div key={i} className="h-12 text-ink-foreground/70 hover:text-accent transition-colors">
                <Comp />
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-sm divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {certs.map((c) => (
              <div key={c.code} className="flex items-center gap-4 p-5">
                <div className="h-11 w-11 rounded-sm border border-accent/40 flex items-center justify-center shrink-0">
                  <c.Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm leading-tight">{c.code}</p>
                  <p className="text-[11px] text-ink-foreground/65 mt-0.5">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                Let's Build a More Reliable Future
              </h2>
              <p className="mt-5 text-ink-foreground/75 max-w-lg leading-relaxed">
                Partner with SEEMA for innovative engineering solutions that keep your assets performing at their best.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 px-7 h-12 font-bold uppercase tracking-wider text-xs">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-6 grid sm:grid-cols-3 gap-4">
              {[
                { Icon: HardHat, k: "LOCATION", v: "Jubail Industrial City,\nKingdom of Saudi Arabia" },
                { Icon: Gauge, k: "PHONE", v: "+966 13 361 1661" },
                { Icon: ShieldCheck, k: "EMAIL", v: "info@seema.sa.com" },
              ].map((c) => (
                <div key={c.k} className="border border-white/10 rounded-sm p-4 bg-white/[0.02]">
                  <div className="h-9 w-9 rounded-sm border border-accent/40 flex items-center justify-center mb-3">
                    <c.Icon className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{c.k}</p>
                  <p className="mt-1 text-xs text-ink-foreground/85 whitespace-pre-line leading-snug">{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* trans helper to avoid unused warning */}
      <span className="hidden">{t("home.heroEyebrow")}</span>
    </>
  );
}
