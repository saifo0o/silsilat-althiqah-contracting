import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, ShieldCheck, Layers, Wrench, Droplet, Gauge, FlaskConical, Package } from "lucide-react";
import hero from "@/assets/hero-refinery.jpg";
import carbon from "@/assets/service-carbon-fiber.jpg";
import epoxy from "@/assets/service-epoxy.jpg";
import concrete from "@/assets/service-concrete.jpg";
import piping from "@/assets/service-piping.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";

type ProjectItem = { title: string; client: string; location: string; period: string };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seema — Structural Rehabilitation & Industrial Services" },
      { name: "description", content: "Carbon fiber reinforcement, concrete & steel repair, process piping rehabilitation and corrosion-grade epoxy coatings for the Kingdom's industry." },
      { property: "og:title", content: "Seema — Structural Rehabilitation & Industrial Services" },
      { property: "og:description", content: "Specialised engineered services for Saudi Arabia's industrial sector." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const homeServices = [
  { key: "carbon", Icon: Layers, img: carbon },
  { key: "piping", Icon: Gauge, img: piping },
  { key: "concrete", Icon: Wrench, img: concrete },
  { key: "epoxy", Icon: Droplet, img: epoxy },
  { key: "acid", Icon: FlaskConical, img: null },
  { key: "supplies", Icon: Package, img: null },
] as const;

const projectImages = [project1, project2, project3];

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

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-36 lg:py-44">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {t("home.heroEyebrow")}
            </p>
            <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-primary-foreground/80">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/services">
                  {t("home.heroCtaPrimary")} <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">{t("home.heroCtaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.l} className="bg-background px-4 py-8 text-center md:text-start">
              <p className="font-display text-3xl md:text-4xl font-semibold text-foreground" dir="ltr">{s.v}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow={t("home.intro.eyebrow")}
            title={t("home.intro.title")}
            subtitle={t("home.intro.body")}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            {(["mission", "goal", "vision"] as const).map((k) => (
              <div key={k} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="h-9 w-9 rounded-md bg-accent/15 text-accent flex items-center justify-center">
                  {k === "mission" && <ShieldCheck className="h-5 w-5" />}
                  {k === "goal" && <Gauge className="h-5 w-5" />}
                  {k === "vision" && <Layers className="h-5 w-5" />}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{t(`values.${k}Title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`values.${k}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <SectionHeading
            eyebrow={t("home.servicesEyebrow")}
            title={t("home.servicesTitle")}
            subtitle={t("home.servicesSubtitle")}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeServices.map(({ key, Icon, img }) => (
              <article key={key} className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-elegant hover:-translate-y-1">
                {img ? (
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width={1024} height={768} />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-hero-gradient flex items-center justify-center">
                    <Icon className="h-20 w-20 text-primary-foreground/70" />
                  </div>
                )}
                <div className="p-6">
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{t(`services.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`services.items.${key}.body`)}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline">
              <Link to="/services">{t("nav.services")} <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t("home.projectsEyebrow")}
          title={t("home.projectsTitle")}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p, idx) => (
            <Link to="/projects" key={idx} className="group block overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={projectImages[idx]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width={1024} height={768} />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-accent font-semibold">
                  {p.client} · {p.location}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link to="/projects">{t("nav.projects")} <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" /></Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground px-8 py-14 md:px-14 md:py-20">
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          <div className="absolute -top-24 -end-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
              {t("home.ctaTitle")}
            </h2>
            <p className="mt-4 text-primary-foreground/80">{t("home.ctaBody")}</p>
            <Button asChild size="lg" className="mt-7 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">{t("home.ctaButton")} <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
