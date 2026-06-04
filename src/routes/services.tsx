import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layers, Wrench, Gauge, Droplet, FlaskConical, Combine, Umbrella, Package } from "lucide-react";
import carbon from "@/assets/service-carbon-fiber.jpg";
import epoxy from "@/assets/service-epoxy.jpg";
import concrete from "@/assets/service-concrete.jpg";
import piping from "@/assets/service-piping.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Sales — Seema" },
      { name: "description", content: "Carbon fiber reinforcement, process pipe repair, concrete repair, industrial coatings, acid lining, expansion joints, waterproofing and industrial supplies." },
      { property: "og:title", content: "Services & Sales — Seema" },
      { property: "og:description", content: "Engineered repair solutions and carbon fiber sales." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  { key: "carbon", Icon: Layers, img: carbon },
  { key: "piping", Icon: Gauge, img: piping },
  { key: "concrete", Icon: Wrench, img: concrete },
  { key: "epoxy", Icon: Droplet, img: epoxy },
  { key: "acid", Icon: FlaskConical, img: null },
  { key: "joints", Icon: Combine, img: null },
  { key: "roof", Icon: Umbrella, img: null },
  { key: "supplies", Icon: Package, img: null },
] as const;

function ServicesPage() {
  const { t } = useTranslation();
  return (
    <>
      <section className="bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
          <SectionHeading eyebrow={t("nav.services")} title={t("services.title")} subtitle={t("services.subtitle")} />
        </div>
      </section>

      {/* Sales callout */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-20">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Sales</p>
            <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold">{t("services.salesTitle")}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">{t("services.salesBody")}</p>
          </div>
          <div className="flex md:justify-end">
            <a href="mailto:danny@seema.sa.com" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              danny@seema.sa.com
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, Icon, img }) => (
            <article key={key} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-elegant hover:-translate-y-1">
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
      </section>
    </>
  );
}
