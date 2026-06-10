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
import jointsImg from "@/assets/service-expansion-joints.png";
import roofImg from "@/assets/service-roof-waterproofing.png";
import suppliesImg from "@/assets/service-material-supply.png";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Faq = { q: string; a: string };

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Sales — Seema" },
      {
        name: "description",
        content:
          "Carbon fiber reinforcement, process pipe repair, concrete repair, industrial coatings, acid lining, expansion joints, waterproofing and industrial supplies.",
      },
      { property: "og:title", content: "Services & Sales — Seema" },
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
  { key: "carbon", Icon: Layers, img: carbon },
  { key: "piping", Icon: Gauge, img: piping },
  { key: "concrete", Icon: Wrench, img: concrete },
  { key: "epoxy", Icon: Droplet, img: epoxy },
  { key: "acid", Icon: FlaskConical, img: steel },
  { key: "joints", Icon: Combine, img: jointsImg },
  { key: "roof", Icon: Umbrella, img: roofImg },
  { key: "supplies", Icon: Package, img: suppliesImg },
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
      case "carbon":
        return [
          { label: isAr ? "تكوين المواد" : "Material Composition", value: isAr ? "نسيج كربون أحادي الاتجاه CFRP" : "CFRP Unidirectional Carbon Fabric" },
          { label: isAr ? "قوة الشد" : "Tensile Strength", value: isAr ? "4900 ميجا باسكال (عالي المعامل)" : "4900 MPa (High Modulus)" },
          { label: isAr ? "معيار الامتثال" : "Compliance Standard", value: "ASME PCC-2 / ISO 24817" },
          { label: isAr ? "التطبيق الإنشائي" : "Structural Application", value: isAr ? "أعمدة خرسانية، كمرات، أسطح فولاذية" : "Concrete Columns, Beams, Steel Decks" },
        ];
      case "piping":
        return [
          { label: isAr ? "تطبيقات الاستخدام" : "Service Application", value: isAr ? "هيدروكربون، شبكات صرف حمضية، بخار عالي الحرارة" : "Hydrocarbon, Acid Sewers, High-Temp Steam" },
          { label: isAr ? "ضغط التشغيل" : "Operating Pressure", value: isAr ? "حتى 64 بار (إصلاح مباشر)" : "Up to 64 Bar (Live Repairs)" },
          { label: isAr ? "وقت الجفاف" : "Cure Time", value: isAr ? "24 ساعة (حرارة محيطة)" : "24 Hours (Ambient Temp)" },
          { label: isAr ? "معيار الامتثال" : "Compliance Standard", value: "ASME PCC-2 Article 4.1" },
        ];
      case "concrete":
        return [
          { label: isAr ? "أنظمة الإصلاح" : "Repair Systems", value: isAr ? "حقن الإيبوكسي، خرسانة دقيقة، جراوت" : "Epoxy Injection, Micro-Concrete, Grout" },
          { label: isAr ? "قوة الضغط" : "Compressive Strength", value: isAr ? "75 ميجا باسكال (إصلاح بالإيبوكسي)" : "75 MPa (Epoxy Repair)" },
          { label: isAr ? "مناطق التطبيق" : "Application Areas", value: isAr ? "قواعد الآلات الثقيلة، الأعمدة" : "Heavy Machine Foundations, Columns" },
          { label: isAr ? "التقنية المستخدمة" : "Technique", value: isAr ? "حقن الشقوق الهيكلية، حشو الفراغات" : "Structural Crack Injections, Void Grouting" },
        ];
      case "epoxy":
        return [
          { label: isAr ? "نوع الطلاء" : "Coating Type", value: isAr ? "إيبوكسي نقي 100%، بطانات نوفولاك" : "100% Solids Epoxy, Novolac Linings" },
          { label: isAr ? "تصنيف البيئة" : "Environment Rating", value: isAr ? "منطقة الرذاذ، غمر كامل، انسكاب الأحماض" : "Splash Zone, Full Immersion, Acid Spill" },
          { label: isAr ? "الأسطح المتوافقة" : "Substrate compatibility", value: isAr ? "الصلب الكربوني، الخرسانة، FRP" : "Carbon Steel, Concrete, FRP" },
          { label: isAr ? "سُمك الفيلم الجاف" : "Dry Film Thickness (DFT)", value: isAr ? "300 إلى 2000 ميكرون" : "300 to 2000 microns" },
        ];
      case "acid":
        return [
          { label: isAr ? "التقييم الكيميائي" : "Chemical Rating", value: isAr ? "حمض الكبريتيك 98%، حمض الفوسفوريك 54%" : "Sulfuric Acid 98%, Phosphoric Acid 54%" },
          { label: isAr ? "نظام التبطين" : "Lining System", value: isAr ? "غلاف مركب متعدد الطبقات من CFRP" : "Composite Multi-Layer CFRP Wrapper" },
          { label: isAr ? "حدود درجة الحرارة" : "Temperature Limit", value: isAr ? "حتى 120 درجة مئوية (مستمر)" : "Up to 120°C Continuous" },
          { label: isAr ? "عمر الخدمة" : "Service Life", value: isAr ? "15+ عام (للاحتواء الكيميائي)" : "15+ Years (Chemical Containment)" },
        ];
      case "joints":
        return [
          { label: isAr ? "أنظمة الفواصل" : "Joint Systems", value: isAr ? "أنظمة إيلاستومر، بولي يوريثين، أغطية معدنية" : "Elastomeric, Polyurethane, Metal Covers" },
          { label: isAr ? "قدرة الحركة" : "Movement Capability", value: isAr ? "حتى ±50% في القص والشد" : "Up to ±50% Shear & Tension" },
          { label: isAr ? "تصنيف الحريق" : "Fire Rating", value: isAr ? "حتى 4 ساعات (تصنيف UL)" : "Up to 4 Hours (UL Classified)" },
          { label: isAr ? "مناطق التطبيق" : "Application Areas", value: isAr ? "الأرضيات الصناعية، منصات الجسور" : "Industrial Floors, Bridge Decks" },
        ];
      case "roof":
        return [
          { label: isAr ? "نوع النظام" : "System Type", value: isAr ? "بولي يوريثين مطبق سائل، بيتومين" : "Liquid Applied Polyurethane, Bituminous" },
          { label: isAr ? "عمر العزل" : "Waterproofing Life", value: isAr ? "ضمان نظام لمدة 20 عاماً" : "20 Years System Warranty" },
          { label: isAr ? "انعكاس الشمس (SRI)" : "Solar Reflectance (SRI)", value: isAr ? "104 (سقف بارد موفر للطاقة)" : "104 (Energy Saving Cool Roof)" },
          { label: isAr ? "الأسطح" : "Substrates", value: isAr ? "أسطح خرسانية، ألواح معدنية متعرجة" : "Concrete Deck, Corrugated Metal Sheets" },
        ];
      case "supplies":
        return [
          { label: isAr ? "نطاق المواد" : "Material Range", value: isAr ? "أقمشة CFRP (150-900 جم/م²)، إيبوكسي لاصق" : "CFRP Fabrics (150-900 GSM), Epoxy Adhesives" },
          { label: isAr ? "طرق التوريد" : "Supply Formats", value: isAr ? "لفائف، دلاء، ألواح مسبقة التحضير" : "Rolls, Pails, Pre-preg laminates" },
          { label: isAr ? "الشركاء الدوليون" : "International partners", value: isAr ? "مصنعون معتمدون في أوروبا وأمريكا" : "Bespoke EU & US Manufacturers" },
          { label: isAr ? "وقت التسليم" : "Lead Time", value: isAr ? "متوفر في مستودع الجبيل" : "Ex-Stock Jubail Warehouse" },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -bottom-32 end-1/4 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-32">
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
                    "w-full text-start p-4 rounded-sm border transition-all duration-300 flex items-center justify-between gap-4 group",
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
            
            <div className="bg-card border border-border rounded-sm overflow-hidden flex flex-col justify-between shadow-elegant relative z-0">
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
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {t(`services.items.${services[activeService].key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {t(`services.items.${services[activeService].key}.body`)}
                </p>

                {/* Technical Specs List */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                    {i18n.language === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications'}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {getServiceSpecs(services[activeService].key).map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2 px-3 bg-secondary/50 rounded-sm border border-border/40 text-xs"
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
            </div>
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
