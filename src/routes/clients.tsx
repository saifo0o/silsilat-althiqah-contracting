import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Building2,
  Handshake,
  BadgeCheck,
  ArrowRight,
  Globe2,
  CheckCircle,
  MapPin,
  Quote,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  Copy,
  Check,
  Loader2,
  Star,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import teamEngineersImg from "@/assets/team-engineers.png";
import {
  SabicLogo,
  AramcoLogo,
  MaadenLogo,
  SipchemLogo,
  YasrefLogo,
  SecLogo,
  NeomLogo,
  RedSeaLogo,
  SaudiaLogo,
  StcLogo,
  MobilyLogo,
  ZainLogo,
  SaharaLogo,
  SioLogo,
} from "@/components/site/ClientLogos";

type Vendor = { name: string; number: string };
type Testimonial = { quote: string; author: string; company: string };
type IndustrialHub = { name: string; desc: string };

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Approved Vendor — Silsilat Al-Thiqa" },
      {
        name: "description",
        content:
          "Silsilat Al-Thiqa is an approved vendor with SABIC, Saudi Aramco, SEC, Maaden, Sahara and the Saudi Irrigation Organization.",
      },
      { property: "og:title", content: "Clients & Approved Vendor — Silsilat Al-Thiqa" },
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
    if (name.includes("neom")) return NeomLogo;
    if (name.includes("red sea")) return RedSeaLogo;
    if (name.includes("telecom") || name.includes("stc")) return StcLogo;
    if (name.includes("mobily")) return MobilyLogo;
    if (name.includes("zain")) return ZainLogo;
    if (name.includes("airlines") || name.includes("saudia")) return SaudiaLogo;
    if (name.includes("irrigation") || name.includes("sio")) return SioLogo;
    return null;
  };

  // Interactive States
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedHub, setSelectedHub] = useState<"jubail" | "yanbu" | "rasalkhair" | "khafji">(
    "jubail",
  );
  const [copiedVendor, setCopiedVendor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Capabilities Wizard States
  const [wizardState, setWizardState] = useState<"idle" | "compiling" | "success">("idle");
  const [wizardProgress, setWizardProgress] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({
    profile: true,
    cr: true,
    certificates: true,
    hse: false,
    vendorLetters: false,
    sop: false,
  });

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
      Comp: YasrefLogo,
      name: "Yasref",
      category: "oil",
      sectorKey: "oil",
      hoverClass:
        "hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(20,184,166,0.12)] hover:bg-teal-500/[0.02]",
    },
    {
      Comp: SecLogo,
      name: "SEC",
      category: "utilities",
      sectorKey: "utilities",
      hoverClass:
        "hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.12)] hover:bg-yellow-500/[0.02]",
    },
    {
      Comp: NeomLogo,
      name: "NEOM",
      category: "megaproject",
      sectorKey: "megaproject",
      hoverClass:
        "hover:border-slate-800 hover:shadow-[0_0_20px_rgba(0,0,0,0.12)] hover:bg-slate-500/[0.02]",
    },
    {
      Comp: RedSeaLogo,
      name: "Red Sea Global",
      category: "megaproject",
      sectorKey: "megaproject",
      hoverClass:
        "hover:border-cyan-600/40 hover:shadow-[0_0_20px_rgba(8,145,178,0.12)] hover:bg-cyan-600/[0.02]",
    },
    {
      Comp: SaudiaLogo,
      name: "SAUDIA",
      category: "aviation",
      sectorKey: "aviation",
      hoverClass:
        "hover:border-indigo-950/40 hover:shadow-[0_0_20px_rgba(30,58,138,0.12)] hover:bg-indigo-900/[0.02]",
    },
    {
      Comp: StcLogo,
      name: "stc",
      category: "telecom",
      sectorKey: "telecom",
      hoverClass:
        "hover:border-purple-600/40 hover:shadow-[0_0_20px_rgba(147,51,234,0.12)] hover:bg-purple-600/[0.02]",
    },
    {
      Comp: MobilyLogo,
      name: "Mobily",
      category: "telecom",
      sectorKey: "telecom",
      hoverClass:
        "hover:border-sky-500/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.12)] hover:bg-sky-500/[0.02]",
    },
    {
      Comp: ZainLogo,
      name: "Zain KSA",
      category: "telecom",
      sectorKey: "telecom",
      hoverClass:
        "hover:border-lime-500/40 hover:shadow-[0_0_20px_rgba(132,204,22,0.12)] hover:bg-lime-500/[0.02]",
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
    { id: "megaproject", label: t("clients.tabs.megaproject") },
    { id: "telecom", label: t("clients.tabs.telecom") },
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

  // Compile capabilities simulation
  const handleWizardCompile = () => {
    setWizardState("compiling");
    setWizardProgress(0);
  };

  useEffect(() => {
    if (wizardState !== "compiling") return;

    const interval = setInterval(() => {
      setWizardProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setWizardState("success");
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [wizardState]);

  const handleCheckboxChange = (key: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getWizardStepMessage = () => {
    if (wizardProgress < 30) return t("clients.preQualCompiling");
    if (wizardProgress < 75) return t("clients.preQualOptions.certificates");
    return t("clients.preQualSuccess");
  };

  // Active Map Details Panel Helper
  const hubDetailsData = t(`clients.hubDetails.${selectedHub}`, { returnObjects: true });
  const activeHubDetails =
    hubDetailsData && typeof hubDetailsData === "object" && "title" in hubDetailsData
      ? (hubDetailsData as { title: string; stats: string; description: string })
      : { title: "", stats: "", description: "" };

  return (
    <>
      {/* HERO SECTION - SPLIT DESIGN */}
      <section className="relative bg-[#0d1527] text-white overflow-hidden border-b border-white/10">
        {/* Glowing Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(30,58,138,0.3),transparent_50%)]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

        <div className="container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-28 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("clients.eyebrow")}
              </div>
              <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-white max-w-2xl">
                {t("clients.title")}
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                {t("clients.subtitle")}
              </p>

              {/* Trust Indicators / Badges */}
              <div className="mt-8 flex flex-wrap gap-3">
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
            </div>

            {/* Right Graphics/Image Panel */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Decorative border outline */}
                <div className="absolute -inset-4 rounded-sm border border-emerald-500/20 translate-x-2 translate-y-2 pointer-events-none" />

                {/* Main Image Card */}
                <div className="relative overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-slate-900 group">
                  <img
                    src={teamEngineersImg}
                    alt="SILSILAT AL-THIQA Engineering Team"
                    className="w-full h-[320px] md:h-[380px] object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                  {/* Floating Glassmorphic Overlay Badge */}
                  <div className="absolute bottom-6 start-6 end-6 backdrop-blur-md bg-slate-900/60 border border-white/10 rounded-sm p-4 text-start">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                      {t("clients.verifiedStatus")}
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-white">
                      {t("company.name")} {t("company.tagline")}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>{t("about.since")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* INDUSTRIAL FOOTPRINT (INTERACTIVE KSA MAP) */}
      <section className="bg-secondary/40 border-b border-border py-12 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 text-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 inline-block px-3 py-1 rounded-sm">
                {t("clients.hubsTitle")}
              </p>
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold tracking-tight">
                {i18n.language === "ar"
                  ? "نعمل في قلب الصناعة السعودية"
                  : "Operating Across KSA's Industrial Core"}
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                {t("clients.hubsSubtitle")}
              </p>

              {/* Interactive SVG Saudi Map Representation */}
              <div className="mt-8 relative border border-border bg-card rounded-sm p-6 overflow-hidden flex items-center justify-center shadow-elegant">
                {/* Background grid dots */}
                <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

                <svg
                  viewBox="0 0 300 200"
                  className="w-full max-w-[280px] text-muted-foreground/60 relative z-10"
                >
                  {/* Detailed KSA Silhouette Path approximation */}
                  <path
                    d="M 25 115 L 35 105 L 50 85 L 85 70 L 130 65 L 180 70 L 210 65 L 235 60 L 245 70 L 275 90 L 285 110 L 265 130 L 280 145 L 260 165 L 215 175 L 175 185 L 135 180 L 100 185 L 75 170 L 65 145 L 45 130 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground opacity-30"
                  />
                  <path
                    d="M 25 115 L 35 105 L 50 85 L 85 70 L 130 65 L 180 70 L 210 65 L 235 60 L 245 70 L 275 90 L 285 110 L 265 130 L 280 145 L 260 165 L 215 175 L 175 185 L 135 180 L 100 185 L 75 170 L 65 145 L 45 130 Z"
                    fill="currentColor"
                    className="text-muted opacity-[0.05]"
                  />

                  {/* Map Coordinate Pins */}

                  {/* Jubail */}
                  <g className="cursor-pointer" onClick={() => setSelectedHub("jubail")}>
                    {selectedHub === "jubail" && (
                      <circle
                        cx="210"
                        cy="100"
                        r="8"
                        className="animate-ping fill-emerald-500/40"
                      />
                    )}
                    <circle
                      cx="210"
                      cy="100"
                      r="4"
                      className={cn(
                        "transition-all duration-300",
                        selectedHub === "jubail"
                          ? "fill-emerald-500"
                          : "fill-muted-foreground group-hover:fill-emerald-400",
                      )}
                    />
                    <text
                      x="218"
                      y="103"
                      fontSize="8"
                      fontWeight="bold"
                      fill={
                        selectedHub === "jubail"
                          ? "var(--color-emerald-500, #10b981)"
                          : "currentColor"
                      }
                      className="pointer-events-none select-none font-mono"
                    >
                      Jubail
                    </text>
                  </g>

                  {/* Yanbu */}
                  <g className="cursor-pointer" onClick={() => setSelectedHub("yanbu")}>
                    {selectedHub === "yanbu" && (
                      <circle cx="70" cy="115" r="8" className="animate-ping fill-emerald-500/40" />
                    )}
                    <circle
                      cx="70"
                      cy="115"
                      r="4"
                      className={cn(
                        "transition-all duration-300",
                        selectedHub === "yanbu"
                          ? "fill-emerald-500"
                          : "fill-muted-foreground group-hover:fill-emerald-400",
                      )}
                    />
                    <text
                      x="78"
                      y="118"
                      fontSize="8"
                      fontWeight="bold"
                      fill={
                        selectedHub === "yanbu"
                          ? "var(--color-emerald-500, #10b981)"
                          : "currentColor"
                      }
                      className="pointer-events-none select-none font-mono"
                    >
                      Yanbu
                    </text>
                  </g>

                  {/* Ras Al Khair */}
                  <g className="cursor-pointer" onClick={() => setSelectedHub("rasalkhair")}>
                    {selectedHub === "rasalkhair" && (
                      <circle cx="195" cy="85" r="8" className="animate-ping fill-emerald-500/40" />
                    )}
                    <circle
                      cx="195"
                      cy="85"
                      r="4"
                      className={cn(
                        "transition-all duration-300",
                        selectedHub === "rasalkhair"
                          ? "fill-emerald-500"
                          : "fill-muted-foreground group-hover:fill-emerald-400",
                      )}
                    />
                    <text
                      x="145"
                      y="82"
                      fontSize="8"
                      fontWeight="bold"
                      fill={
                        selectedHub === "rasalkhair"
                          ? "var(--color-emerald-500, #10b981)"
                          : "currentColor"
                      }
                      className="pointer-events-none select-none font-mono"
                    >
                      Ras Al Khair
                    </text>
                  </g>

                  {/* Khafji */}
                  <g className="cursor-pointer" onClick={() => setSelectedHub("khafji")}>
                    {selectedHub === "khafji" && (
                      <circle cx="218" cy="74" r="8" className="animate-ping fill-emerald-500/40" />
                    )}
                    <circle
                      cx="218"
                      cy="74"
                      r="4"
                      className={cn(
                        "transition-all duration-300",
                        selectedHub === "khafji"
                          ? "fill-emerald-500"
                          : "fill-muted-foreground group-hover:fill-emerald-400",
                      )}
                    />
                    <text
                      x="226"
                      y="77"
                      fontSize="8"
                      fontWeight="bold"
                      fill={
                        selectedHub === "khafji"
                          ? "var(--color-emerald-500, #10b981)"
                          : "currentColor"
                      }
                      className="pointer-events-none select-none font-mono"
                    >
                      Khafji
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Information Display Panel */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Hub Quick Info Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {(["jubail", "yanbu", "rasalkhair", "khafji"] as const).map((hub) => (
                  <button
                    key={hub}
                    onClick={() => setSelectedHub(hub)}
                    className={cn(
                      "py-3 px-1.5 text-center rounded-sm border transition-all text-[11px] font-bold uppercase tracking-wider",
                      selectedHub === hub
                        ? "bg-card border-emerald-500/30 text-emerald-500 shadow-md"
                        : "bg-card/40 border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {hub === "rasalkhair"
                      ? i18n.language === "ar"
                        ? "رأس الخير"
                        : "Ras Al Khair"
                      : hub.charAt(0).toUpperCase() + hub.slice(1)}
                  </button>
                ))}
              </div>

              {/* Active Hub details Card */}
              <div className="bg-card rounded-md p-8 shadow-emil hover:shadow-emil-hover relative overflow-hidden transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]">
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-emerald-500/5 to-transparent pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {activeHubDetails.title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-500 uppercase tracking-wider">
                    <CheckCircle className="h-3 w-3" />
                    {activeHubDetails.stats}
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted-foreground leading-relaxed text-start min-h-[72px]">
                  {activeHubDetails.description}
                </p>

                {/* Hub Metrics Statistics Row */}
                <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="text-start">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t("clients.hubsMetrics.projectsCount")}
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-foreground">
                      {selectedHub === "jubail" && "150+"}
                      {selectedHub === "yanbu" && "85+"}
                      {selectedHub === "rasalkhair" && "45+"}
                      {selectedHub === "khafji" && "30+"}
                    </p>
                  </div>
                  <div className="text-start">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t("clients.hubsMetrics.yearsActive")}
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-foreground">
                      {selectedHub === "jubail" && "12+"}
                      {selectedHub === "yanbu" && "10+"}
                      {selectedHub === "rasalkhair" && "8+"}
                      {selectedHub === "khafji" && "7+"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      {/* PARTNERS & CUSTOM BUILDER PORTAL */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Side: Standard Compliance */}
          <Reveal className="lg:col-span-6 text-start">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Handshake className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                {t("clients.partnersTitle")}
              </h2>
            </div>
            <p className="mt-6 text-muted-foreground text-base leading-relaxed">
              {t("clients.partnersBody")}
            </p>

            {/* Standards Compliance Enrichment */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                {i18n.language === "ar"
                  ? "الأكواد الهندسية والامتثال"
                  : "Engineering Codes & Compliance"}
              </h4>
              <ul className="grid grid-cols-2 gap-3">
                {[
                  "ASME PCC-2 (Composite Repairs)",
                  "ISO 24817 (Pipeline Rehabilitation)",
                  "ACI 440.2R (FRP Concrete Rehab)",
                  "ASTM Protective Linings & Coatings",
                  "SABIC SES Standards Compliance",
                  "Aramco Engineering Standards (SAES)",
                ].map((std, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span dir="ltr">{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              className="mt-8 rounded-sm bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <Link to="/contact">
                {t("common.getInTouch")}
                <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
              </Link>
            </Button>
          </Reveal>

          {/* Right Side: Capabilities Customization Builder Widget */}
          <Reveal delay={150} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-sm bg-[#0d1527] border border-white/10 p-8 md:p-10 text-white min-h-[420px] flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 grid-pattern opacity-[0.06] text-white" />
              <div className="absolute -top-20 -end-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

              <div className="relative text-start">
                <Globe2 className="h-10 w-10 text-emerald-400" />
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                  {t("clients.preQualTitle")}
                </h3>
                <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                  {t("clients.preQualSubtitle")}
                </p>

                {/* Compilation Checklist Options */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(selectedOptions).map((key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 rounded-sm border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-300 hover:bg-white/[0.05] hover:border-emerald-500/25 transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions[key]}
                        onChange={() => handleCheckboxChange(key)}
                        className="rounded border-white/20 bg-transparent text-emerald-500 focus:ring-emerald-500/30 h-4 w-4 shrink-0"
                      />
                      <span>{t(`clients.preQualOptions.${key}`)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress and Download Action Trigger */}
              <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                {wizardState === "compiling" ? (
                  <div className="w-full flex flex-col items-start gap-2">
                    <div className="flex justify-between items-center w-full text-xs text-slate-300">
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
                        {getWizardStepMessage()}
                      </span>
                      <span className="font-mono">{wizardProgress}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                        style={{ width: `${wizardProgress}%` }}
                      />
                    </div>
                  </div>
                ) : wizardState === "success" ? (
                  <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="text-start">
                        <h5 className="font-display text-xs font-bold text-white">
                          {t("clients.preQualSuccess")}
                        </h5>
                        <p className="text-[10px] text-emerald-400 mt-0.5">
                          {i18n.language === 'ar' ? 'تم تجميع الملف بنجاح' : 'Dossier Compiled Successfully'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setWizardState("idle")}
                      size="sm"
                      className="rounded-sm bg-emerald-600 text-white hover:bg-emerald-500 text-xs uppercase tracking-wider font-bold"
                    >
                      <Download className="h-3.5 w-3.5 me-1.5" /> Recompile
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-start">
                      <FileText className="h-8 w-8 text-emerald-400 shrink-0 animate-pulse" />
                      <div>
                        <h5 className="font-display text-xs font-bold text-white">
                          {i18n.language === 'ar' ? 'ملف المؤهلات المخصص' : 'Credentials & Pre-Qual Dossier'}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {i18n.language === 'ar' ? 'تجميع سجل القدرات والمؤهلات' : 'Build custom capabilities packet'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleWizardCompile}
                      size="sm"
                      className="rounded-sm bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold w-full sm:w-auto uppercase tracking-wider"
                    >
                      <Download className="h-3.5 w-3.5 me-1.5" /> {t("clients.preQualBuildBtn")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
