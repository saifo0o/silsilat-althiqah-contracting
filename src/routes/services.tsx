import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Layers, Wrench, HardHat, Gauge, Droplet, ShieldCheck } from "lucide-react";
import carbon from "@/assets/service-carbon-fiber.jpg";
import epoxy from "@/assets/service-epoxy.jpg";
import steel from "@/assets/service-steel.jpg";
import concrete from "@/assets/service-concrete.jpg";
import piping from "@/assets/service-piping.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Seema" },
      { name: "description", content: "Carbon fiber reinforcement, concrete and steel repair, process piping rehabilitation, epoxy coatings and structural inspection." },
      { property: "og:title", content: "Services — Seema" },
      { property: "og:description", content: "Six disciplines, one specialised team." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  { key: "carbon", Icon: Layers, img: carbon },
  { key: "concrete", Icon: Wrench, img: concrete },
  { key: "steel", Icon: HardHat, img: steel },
  { key: "piping", Icon: Gauge, img: piping },
  { key: "epoxy", Icon: Droplet, img: epoxy },
  { key: "inspection", Icon: ShieldCheck, img: null },
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

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="space-y-16 md:space-y-24">
          {services.map(({ key, Icon, img }, i) => (
            <div key={key} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className="lg:[direction:ltr] rtl:lg:[direction:rtl]">
                {img ? (
                  <div className="overflow-hidden rounded-xl border border-border bg-muted">
                    <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" width={1024} height={768} />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-hero-gradient flex items-center justify-center">
                    <Icon className="h-24 w-24 text-primary-foreground/70" />
                  </div>
                )}
              </div>
              <div className="lg:[direction:ltr] rtl:lg:[direction:rtl]">
                <div className="h-12 w-12 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-3xl md:text-4xl font-semibold">{t(`services.items.${key}.title`)}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">{t(`services.items.${key}.body`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
