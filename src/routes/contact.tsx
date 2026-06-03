import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Seema" },
      { name: "description", content: "Talk to Seema about a rehabilitation, coating or structural reinforcement project." },
      { property: "og:title", content: "Contact — Seema" },
      { property: "og:description", content: "Tell us what you're working on." },
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

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
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
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t("contact.form.company")}</Label>
                  <Input id="company" />
                </div>
                <div className="space-y-2">
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

          <aside className="space-y-6">
            {[
              { Icon: MapPin, title: t("contact.info.addressTitle"), body: t("contact.info.address") },
              { Icon: Phone, title: t("contact.info.phoneTitle"), body: t("contact.info.phone"), ltr: true },
              { Icon: Mail, title: t("contact.info.emailTitle"), body: t("contact.info.email") },
            ].map(({ Icon, title, body, ltr }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
                    <p className="mt-1 font-medium" {...(ltr ? { dir: "ltr" } : {})}>{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
