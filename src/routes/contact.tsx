import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Check, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";

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
      <section className="bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-24">
          <SectionHeading eyebrow={t("nav.contact")} title={t("contact.title")} subtitle={t("contact.subtitle")} />
        </div>
      </section>

      {/* Offices */}
      <section className="container mx-auto px-4 md:px-6 pt-16 md:pt-20">
        <div className="grid gap-6 md:grid-cols-2">
          {(["jubail", "dammam"] as const).map((office) => (
            <div key={office} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display text-xl font-semibold">{t(`contact.offices.${office}Title`)}</h3>
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
                  <a href={`mailto:${t("contact.offices.email")}`} className="hover:text-foreground transition-colors" dir="ltr">
                    {t("contact.offices.email")}
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="h-14 w-14 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-5 font-display text-xl">{t("contact.form.sent")}</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
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
                <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t("contact.form.submit")}
                </Button>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
