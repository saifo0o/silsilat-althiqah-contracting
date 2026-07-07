import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Building2,
  BadgeCheck,
  ArrowRight,
  CheckCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
  Search,
  Copy,
  Check,
  Star,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
type Testimonial = { quote: string; author: string; company: string };

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Approved Vendor — SILSILAT AL-THIQA" },
      {
        name: "description",
        content:
          "SILSILAT AL-THIQA is an approved vendor with SABIC, Saudi Aramco, SEC, Maaden, Sahara and the Saudi Irrigation Organization.",
      },
      { property: "og:title", content: "Clients & Approved Vendor — SILSILAT AL-THIQA" },
      {
        property: "og:description",
        content: "Working alongside the Kingdom's leading industrial operators.",
      },
      { property: "og:url", content: "/clients" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const { t, i18n } = useTranslation();

  const sectorsData = t("clients.sectors", { returnObjects: true });
  const sectors = Array.isArray(sectorsData) ? (sectorsData as string[]) : [];

  const vendorsData = t("clients.vendors", { returnObjects: true });
  const vendors = Array.isArray(vendorsData) ? (vendorsData as Vendor[]) : [];

  const testimonialsData = t("clients.testimonials", { returnObjects: true });
  const testimonials = Array.isArray(testimonialsData) ? (testimonialsData as Testimonial[]) : [];

  const getInitials = (author: string | undefined) => {
    if (!author || typeof author !== "string") return "SM";
    return author
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

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

  // Interactive States
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [copiedVendor, setCopiedVendor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const clients = [
    {
      Comp: AramcoLogo,
      name: "Saudi Aramco",
      category: "oil",
      sectorKey: "oil",
      hoverClass:
        "hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:bg-emerald-500/[0.02]",
    },
    {
      Comp: SabicLogo,
      name: "SABIC",
      category: "petro",
      sectorKey: "petro",
      hoverClass:
        "hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.12)] hover:bg-orange-500/[0.02]",
    },
    {
      Comp: MaadenLogo,
      name: "Ma'aden",
      category: "mining",
      sectorKey: "mining",
      hoverClass:
        "hover:border-amber-600/40 hover:shadow-[0_0_20px_rgba(217,119,6,0.12)] hover:bg-amber-600/[0.02]",
    },
    {
      Comp: SipchemLogo,
      name: "Sipchem",
      category: "petro",
      sectorKey: "petro",
      hoverClass:
        "hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] hover:bg-blue-500/[0.02]",
    },
    {
      Comp: SaharaLogo,
      name: "Sahara",
      category: "oil",
      sectorKey: "petro",
      hoverClass:
        "hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.12)] hover:bg-orange-500/[0.02]",
    },
    {
      Comp: SioLogo,
      name: "Saudi Irrigation Organization",
      category: "utilities",
      sectorKey: "utilities",
      hoverClass:
        "hover:border-sky-500/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.12)] hover:bg-sky-500/[0.02]",
    },
  ];

  const testimonialLogos = [MaadenLogo, SipchemLogo, SabicLogo];

  const tabs = [
    { id: "all", label: t("clients.tabs.all") },
    { id: "oil", label: t("clients.tabs.oil") },
    { id: "utilities", label: t("clients.tabs.utilities") },
  ];

  const filteredClients =
    activeTab === "all"
      ? clients
      : clients.filter((c) => {
          if (activeTab === "oil") return c.category === "oil" || c.category === "petro";
          if (activeTab === "utilities")
            return c.category === "utilities" || c.category === "mining";
          return c.category === activeTab;
        });

  // Filter approved vendors
  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.number.includes(searchQuery),
  );

  // Clipboard functionality
  const handleCopyVendorNumber = (v: Vendor) => {
    navigator.clipboard.writeText(v.number);
    setCopiedVendor(v.name);
    setTimeout(() => setCopiedVendor(null), 2000);
  };

  return (
    <>
      {/* HERO SECTION - SPLIT DESIGN */}
      <section className="relative bg-[#0d1527] text-white overflow-hidden border-b border-white/10">
        {/* Glowing Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(30,58,138,0.3),transparent_50%)]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

        <div className="container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-28 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Center Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("clients.eyebrow")}
              </div>
              <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-white">
                {t("clients.title")}
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                {t("clients.subtitle")}
              </p>

              {/* Trust Indicators / Badges */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                  <BadgeCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{t("clients.heroStats.certified")}</span>
                </div>
                <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                  <Building2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{t("clients.heroStats.projects")}</span>
                </div>
                <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{t("clients.heroStats.compliance")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILTERABLE LOGO SHOWCASE GRID */}
      <section className="bg-background py-10 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              {t("home.trustedTitle")}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">{t("clients.partnersSubtitle")}</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-emerald-500/30",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredClients.map((client, idx) => (
              <Reveal
                key={client.name}
                delay={idx * 40}
                className={cn(
                  "bg-card rounded-md p-8 flex flex-col items-center justify-center min-h-[150px] transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] group animate-fade-in relative overflow-hidden shadow-emil hover:shadow-emil-hover",
                  client.hoverClass,
                )}
              >
                {/* Subtle hover background ring */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/10 rounded-sm transition-all duration-300 pointer-events-none" />

                <div className="h-12 w-full text-foreground/50 hover:text-foreground transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                  <client.Comp />
                </div>
                <span className="mt-4 font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  {t(`clients.sectorNames.${client.sectorKey}`)}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VENDORS REGISTRY WITH SEARCH & CLIPBOARD */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-28 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                {t("clients.vendorsTitle")}
              </h2>
            </div>
          </Reveal>

          {/* Vendor Search Input */}
          <Reveal className="w-full md:max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("clients.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-sm border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </Reveal>
        </div>

        {/* Vendors Grid */}
        {filteredVendors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredVendors.map((v, idx) => (
              <Reveal key={v.name} delay={idx * 40}>
                <div className="group relative overflow-hidden rounded-md bg-card p-5 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] flex flex-col justify-between h-full min-h-[180px]">
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
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {t("clients.verifiedStatus")}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-4">
                    <p
                      className="font-mono text-base font-bold tracking-wider text-foreground"
                      dir="ltr"
                    >
                      #{v.number}
                    </p>

                    <button
                      onClick={() => handleCopyVendorNumber(v)}
                      className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-muted-foreground hover:text-emerald-500 transition-colors border border-border rounded-sm px-2 py-1 bg-secondary/30"
                      title={t("clients.copyButton")}
                    >
                      {copiedVendor === v.name ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500 animate-bounce" />
                          <span className="text-emerald-500">{t("clients.copiedText")}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>{t("clients.copyButton")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-sm bg-card">
            <Building2 className="h-8 w-8 text-muted-foreground mx-auto opacity-40 mb-3" />
            <p className="text-sm text-muted-foreground">{t("clients.noVendors")}</p>
          </div>
        )}
      </section>

      {/* TESTIMONIALS / FIELD ENDORSEMENTS */}
      {testimonials.length > 0 && (
        <section className="bg-background border-b border-border py-12 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.02] text-foreground pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 inline-block px-3 py-1 rounded-sm">
                {t("clients.testimonialsTitle")}
              </p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold tracking-tight">
                {i18n.language === "ar" ? "ماذا يقول مشغلو المحطات" : "What Plant Operators Say"}
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">
                {t("clients.testimonialsSubtitle")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="relative bg-card rounded-md p-8 md:p-12 shadow-emil min-h-[260px] flex flex-col justify-between">
                {/* Giant decorative quotation mark */}
                <Quote className="absolute top-6 left-6 h-12 w-12 text-emerald-500/10 pointer-events-none" />

                <div className="relative animate-fade-in text-start" key={activeTestimonial}>
                  {/* Performance Star Rating */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    ))}
                    <span className="ms-2 font-mono text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                      {t("clients.ratingLabel")}
                    </span>
                  </div>

                  <p className="font-display text-base md:text-lg italic text-foreground leading-relaxed">
                    "{testimonials[activeTestimonial]?.quote}"
                  </p>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-4">
                      {/* Visual Signature initials avatar */}
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-500 flex items-center justify-center font-bold text-xs uppercase">
                        {getInitials(testimonials[activeTestimonial]?.author)}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-foreground">
                          {testimonials[activeTestimonial]?.author}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {testimonials[activeTestimonial]?.company}
                        </p>
                      </div>
                    </div>

                    {/* Corporate client logo rendered inside card */}
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-20 text-muted-foreground/30 flex items-center justify-center filter brightness-95 opacity-55 hover:opacity-100 transition-opacity">
                        {(() => {
                          const CompLogo = testimonialLogos[activeTestimonial];
                          return CompLogo ? <CompLogo /> : null;
                        })()}
                      </div>
                      <div className="hidden sm:block text-muted-foreground/20 font-display text-xs font-semibold select-none">
                        {activeTestimonial + 1} / {testimonials.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Nav Arrows */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() =>
                    setActiveTestimonial((i) => (i === 0 ? testimonials.length - 1 : i - 1))
                  }
                  className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-colors shadow-sm"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial((i) => (i === testimonials.length - 1 ? 0 : i + 1))
                  }
                  className="h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-colors shadow-sm"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTORS GRID */}
      <section className="bg-secondary/40 border-b border-border py-12 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                {t("clients.sectorsTitle")}
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s, idx) => (
              <Reveal key={s} delay={idx * 50}>
                <div className="rounded-md bg-card p-6 text-center shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]">
                  <p className="font-display font-medium text-foreground text-sm">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
