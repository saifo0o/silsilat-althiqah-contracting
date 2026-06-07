import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Check, Printer, Send, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Seema" },
      { name: "description", content: "Contact Seema's offices in Jubail and Dammam for structural rehabilitation, CFRP, coatings and process piping repair." },
      { property: "og:title", content: "Contact — Seema" },
      { property: "og:description", content: "Talk to our engineering team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -top-32 start-1/3 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("contact.eyebrow")}
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
              {t("contact.title")}
            </h1>
            <p className="mt-6 text-lg text-ink-foreground/75 leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* DIRECT CHANNELS */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { Icon: Mail, label: t("contact.offices.emailTitle"), value: t("contact.offices.email"), href: `mailto:${t("contact.offices.email")}` },
            { Icon: Phone, label: t("contact.offices.jubailTitle"), value: t("contact.offices.jubailPhone"), href: `tel:${String(t("contact.offices.jubailPhone")).split("/")[0].replace(/\s/g, "")}` },
            { Icon: Phone, label: t("contact.offices.dammamTitle"), value: t("contact.offices.dammamPhone"), href: `tel:${String(t("contact.offices.dammamPhone")).replace(/\s/g, "")}` },
          ].map((c, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <a
                href={c.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 hover:border-accent/40 hover:shadow-elegant transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="mt-0.5 font-medium text-foreground text-sm md:text-base" dir="ltr">
                      {c.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OFFICES + FORM */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Offices */}
          <div className="lg:col-span-5 space-y-6">
            {(["jubail", "dammam"] as const).map((office, idx) => (
              <Reveal key={office} delay={idx * 100}>
                <div className="rounded-2xl border border-border bg-card p-7">
                  <h3 className="font-display text-xl font-semibold">
                    {t(`contact.offices.${office}Title`)}
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                      <span>{t(`contact.offices.${office}Address`)}</span>
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                      <span dir="ltr">{t(`contact.offices.${office}Phone`)}</span>
                    </li>
                    {office === "jubail" && (
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <Printer className="h-4 w-4 flex-shrink-0 text-accent" />
                        <span dir="ltr">{t("contact.offices.jubailFax")}</span>
                      </li>
                    )}
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                      <a
                        href={`mailto:${t("contact.offices.email")}`}
                        className="hover:text-foreground transition-colors"
                        dir="ltr"
                      >
                        {t("contact.offices.email")}
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal delay={150} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm h-full"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <div className="h-16 w-16 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                    <Check className="h-8 w-8" />
                  </div>
                  <p className="mt-6 font-display text-xl">{t("contact.form.sent")}</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl md:text-2xl font-semibold">
                    {t("contact.form.title")}
                  </h3>
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.form.name")}</Label>
                      <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                      <Input id="phone" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{t("contact.form.company")}</Label>
                      <Input id="company" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                      <Input id="subject" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">{t("contact.form.message")}</Label>
                      <Textarea id="message" rows={6} required />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" size="lg" className="rounded-full">
                        <Send className="h-4 w-4 me-2" />
                        {t("contact.form.submit")}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
