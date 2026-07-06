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
  Search,
  Shield,
  Activity,
  ArrowRight,
  Plus,
  Minus,
  Mail,
  CheckCircle2,
} from "lucide-react";
import carbon from "@/assets/service-carbon-fiber.jpg";
import epoxy from "@/assets/service-epoxy.jpg";
import concrete from "@/assets/service-concrete.jpg";
import piping from "@/assets/service-piping.jpg";
import assessmentDetail from "@/assets/service-assessment-detail.png";
import rehabilitationDetail from "@/assets/service-rehabilitation-detail.png";
import protectionDetail from "@/assets/service-protection-detail.png";
import enduranceDetail from "@/assets/service-endurance-detail.png";
import steel from "@/assets/service-steel.jpg";
import jointsImg from "@/assets/service-expansion-joints.png";
import roofImg from "@/assets/service-roof-waterproofing.png";
import suppliesImg from "@/assets/service-material-supply.png";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/site/GlowCard";

type Faq = { q: string; a: string };

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Sales — SILSILAT AL-THIQA" },
      {
        name: "description",
        content:
          "Carbon fiber reinforcement, process pipe repair, concrete repair, industrial coatings, acid lining, expansion joints, waterproofing and industrial supplies.",
      },
      { property: "og:title", content: "Services & Sales — SILSILAT AL-THIQA" },
      {
        property: "og:description",
        content: "Engineered repair solutions and carbon fiber sales.",
      },
      { property: "og:image", content: carbon },
      { property: "og:url", content: "/services" },
      { name: "twitter:image", content: carbon },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can you work during a live plant shutdown?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. A large share of our CFRP and lining work is delivered inside operator turnaround (TAM) windows — including overnight and emergency mobilisations.",
              },
            },
            {
              "@type": "Question",
              name: "Do you work on pressurised process piping?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We carry out in-service leak repair and CFRP reinforcement on pressurised lines, engineered to the defect and the service conditions.",
              },
            },
            {
              "@type": "Question",
              name: "Which acids are your linings rated for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our composite carbon fiber lining systems are rated for 98% sulfuric acid and 54% phosphoric acid concentrations.",
              },
            },
            {
              "@type": "Question",
              name: "Do you only execute or also sell materials?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Both. We supply CFRP fabric (unidirectional and multi-directional, 150–900 GSM) for maintenance teams that prefer in-house execution.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { key: "assessment", Icon: Search, img: piping, secondaryImg: assessmentDetail },
  { key: "rehabilitation", Icon: Layers, img: carbon, secondaryImg: rehabilitationDetail },
  { key: "protection", Icon: Shield, img: epoxy, secondaryImg: protectionDetail },
  { key: "endurance", Icon: Activity, img: concrete, secondaryImg: enduranceDetail },
] as const;

function ServicesPage() {
  const { t, i18n } = useTranslation();
  const faqData = t("services.faq", { returnObjects: true });
  const faq = Array.isArray(faqData) ? (faqData as Faq[]) : [];

  const [open, setOpen] = useState<number | null>(0);
  const [activeService, setActiveService] = useState(0);

  const getServiceSpecs = (key: string) => {
    const isAr = i18n.language === "ar";
    switch (key) {
      case "assessment":
        return [
          { label: isAr ? "نطاق الفحص" : "Inspection Scope", value: isAr ? "تشخيص الأعطال وتقييم الحالة الإنشائية" : "Defect Diagnostics & Structural Assessment" },
          { label: isAr ? "المنهجية" : "Methodology", value: isAr ? "اختبارات غير متلفة والتحليل الهندسي" : "NDT & Engineering Analysis" },
          { label: isAr ? "معيار التقييم" : "Assessment Standard", value: "ASME PCC-2 / ACI" },
          { label: isAr ? "المخرجات" : "Deliverables", value: isAr ? "تقارير سلامة الأصول والتوصيات الهندسية" : "Asset Integrity Reports & Engineering Recommendations" },
        ];
      case "rehabilitation":
        return [
          { label: isAr ? "التقنيات المستخدمة" : "Technologies Used", value: isAr ? "ألياف الكربون (CFRP)، حقن الإيبوكسي" : "Carbon Fiber (CFRP), Epoxy Injection" },
          { label: isAr ? "الاسترداد الإنشائي" : "Structural Recovery", value: isAr ? "استعادة القدرة التحميلية للخرسانة والصلب" : "Load Capacity Restoration for Concrete & Steel" },
          { label: isAr ? "المواد" : "Materials", value: isAr ? "مركبات عالية القوة ومواد متقدمة" : "High-Strength Composites & Advanced Materials" },
          { label: isAr ? "وقت التعطل" : "Downtime", value: isAr ? "منخفض جداً، يمكن إجراؤه أثناء التشغيل" : "Minimal, Can Be Executed Live" },
        ];
      case "protection":
        return [
          { label: isAr ? "أنظمة الحماية" : "Protection Systems", value: isAr ? "طلاءات إيبوكسي، بطانات مقاومة للأحماض" : "Epoxy Coatings, Acid-Resistant Linings" },
          { label: isAr ? "المقاومة الكيميائية" : "Chemical Resistance", value: isAr ? "حمض الكبريتيك 98%، حمض الفوسفوريك 54%" : "Sulfuric Acid 98%, Phosphoric Acid 54%" },
          { label: isAr ? "البيئة" : "Environment", value: isAr ? "غمر كامل، بيئات بحرية، انسكاب كيميائي" : "Full Immersion, Marine, Chemical Spills" },
          { label: isAr ? "العمر الافتراضي" : "Lifespan", value: isAr ? "15-20+ عام للمنشآت الحرجة" : "15-20+ Years for Critical Assets" },
        ];
      case "endurance":
        return [
          { label: isAr ? "التركيز الأساسي" : "Primary Focus", value: isAr ? "استمرارية التشغيل وإطالة عمر الأصل" : "Operational Continuity & Life Extension" },
          { label: isAr ? "التدخل" : "Intervention", value: isAr ? "إدارة دورة الحياة، صيانة وقائية" : "Lifecycle Management, Preventative Maintenance" },
          { label: isAr ? "النتائج" : "Outcomes", value: isAr ? "خفض تكاليف الاستبدال، تقليل الأعطال المفاجئة" : "Reduced Replacement Costs, Fewer Unplanned Outages" },
          { label: isAr ? "الصناعات المدعومة" : "Supported Industries", value: isAr ? "بتروكيماويات، طاقة، تحلية المياه" : "Petrochemicals, Power, Desalination" },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${carbon})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -bottom-32 end-1/4 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        
        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
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
          </motion.div>
        </div>
      </section>

      {/* SALES CALLOUT */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-10">
        <Reveal>
          <div className="rounded-2xl bg-card p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center shadow-emil">
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
                <a href="mailto:info@silsilat-sa.com">
                  <Mail className="h-4 w-4 me-2" />
                  {t("services.salesCta")}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* KEY ADVANTAGES SECTION */}
      <section className="bg-secondary/20 py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading eyebrow={i18n.language === 'ar' ? 'فوائدنا' : 'Our Benefits'} title={t("services.advantages.title")} />
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const pointsData = t("services.advantages.points", { returnObjects: true });
              const points = Array.isArray(pointsData) ? pointsData : [];
              return points.map((point: string, idx: number) => (
                <Reveal key={idx} delay={idx * 50}>
                  <div className="bg-card border border-border p-6 rounded-md shadow-sm h-full flex items-start gap-4 hover:border-emerald-500/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-foreground font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                </Reveal>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* CAPABILITIES EXPLORER */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-32 text-start">
        <SectionHeading eyebrow={t("services.capabilitiesTitle")} title={t("services.title")} />

        <div className="grid gap-8 lg:grid-cols-12 mt-14 items-start relative">
          {/* Left: Tab selectors */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-2 self-start">
            {services.map(({ key, Icon }, idx) => {
              const isActive = activeService === idx;
              return (
                <button
                  key={key}
                  onClick={() => setActiveService(idx)}
                  className={cn(
                    "w-full text-start p-4 rounded-md border transition-colors duration-300 flex items-center justify-between gap-4 group",
                    isActive
                      ? "bg-slate-950 border-white/10 text-white shadow-lg shadow-black/10"
                      : "bg-card border-border text-foreground hover:border-emerald-500/25",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-sm flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-accent/10 text-accent-foreground group-hover:bg-accent group-hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-muted-foreground block" dir="ltr">
                        0{idx + 1} / 0{services.length}
                      </span>
                      <h4
                        className={cn(
                          "font-display text-xs font-bold mt-0.5",
                          isActive ? "text-white" : "text-foreground group-hover:text-emerald-500",
                        )}
                      >
                        {t(`services.items.${key}.title`)}
                      </h4>
                    </div>
                  </div>
                  <ArrowRight
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-transform",
                      isActive
                        ? "text-emerald-400 translate-x-0.5"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed presentation card */}
          <div className="lg:col-span-8 relative">
            <h3 className="font-display text-7xl md:text-[10rem] font-bold leading-none tracking-tighter text-foreground absolute -top-16 -end-8 z-10 opacity-[0.03] pointer-events-none select-none">
              {String(activeService + 1).padStart(2, '0')}
            </h3>
            
            <GlowCard className="overflow-hidden flex flex-col justify-between relative z-0">
              <div>
                {/* Asset Image */}
              <div className="relative aspect-[21/9] overflow-hidden bg-muted">
                {services[activeService]?.img && (
                  <img
                    src={services[activeService].img}
                    alt={t(`services.items.${services[activeService].key}.title`)}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 start-5 text-white flex items-center gap-2">
                  <div className="h-7 w-7 rounded-sm bg-emerald-500 text-white flex items-center justify-center">
                    {(() => {
                      const IconComp = services[activeService]?.Icon;
                      return IconComp ? <IconComp className="h-4 w-4" /> : null;
                    })()}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                    {i18n.language === 'ar' ? 'حل تأهيلي هندسي' : 'ENGINEERED REHAB SOLUTION'}
                  </span>
                </div>
              </div>

              {/* Text content & specifications dossier */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {t(`services.items.${services[activeService].key}.title`)}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                  {t(`services.items.${services[activeService].key}.body`)}
                </p>
                <div className="mt-6 prose prose-invert max-w-none text-muted-foreground text-sm leading-relaxed border-b border-border pb-6">
                  <p>{t(`services.items.${services[activeService].key}.overview`)}</p>
                </div>
                
                {/* Secondary Grid */}
                <div className="mt-8 grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                      {i18n.language === 'ar' ? 'الميزات الرئيسية' : 'Key Features'}
                    </h4>
                    <ul className="space-y-3">
                      {((t(`services.items.${services[activeService].key}.features`, { returnObjects: true }) as string[]) || []).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="h-5 w-5 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Plus className="h-3 w-3" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="relative aspect-video rounded-sm overflow-hidden border border-border/50 shadow-inner">
                      {services[activeService]?.secondaryImg && (
                        <img 
                          src={services[activeService].secondaryImg} 
                          alt={t(`services.items.${services[activeService].key}.secondaryImageCaption`)}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono text-center">
                      {t(`services.items.${services[activeService].key}.secondaryImageCaption`)}
                    </p>
                  </div>
                </div>

                {/* Technical Specs List */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    {i18n.language === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications'}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {getServiceSpecs(services[activeService].key).map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2 px-3 bg-secondary/50 rounded-sm border border-border/40 text-xs transition-colors hover:bg-secondary/80"
                      >
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-mono font-bold text-foreground" dir="ltr">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0 flex justify-end relative z-10">
                <Button
                  asChild
                  className="rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase font-bold tracking-wider"
                >
                  <Link to="/contact">
                    {i18n.language === 'ar' ? 'طلب استفسار فني' : 'Request Technical Inquiry'}{" "}
                    <ArrowRight className="h-3.5 w-3.5 ms-1.5 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="FAQ" title={t("services.faqTitle")} />
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
