import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Check, Printer, Send, ArrowUpRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Invalid email").max(320),
  phone: z.string().trim().min(3, "Phone is required").max(50),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  subject: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SILSILAT AL-THIQA" },
      {
        name: "description",
        content:
          "Contact SILSILAT AL-THIQA's offices in Jubail and Dammam for structural rehabilitation, CFRP, coatings and process piping repair.",
      },
      { property: "og:title", content: "Contact — SILSILAT AL-THIQA" },
      { property: "og:description", content: "Talk to our engineering team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Silsilat Althiqah for Engineering Solutions & Asset Protection",
          url: "https://silsilat-sa.com/contact",
          email: "info@silsilat-sa.com",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
              opens: "08:00",
              closes: "17:00",
            },
          ],
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "Jubail Industrial City",
              addressLocality: "Jubail",
              addressCountry: "SA",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Dammam",
              addressLocality: "Dammam",
              addressCountry: "SA",
            },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company || null,
      subject: parsed.data.subject || null,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } else {
      setSent(true);
      toast.success("Message sent successfully!");
      form.reset();
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-ink-foreground border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
        <div className="absolute -top-32 start-1/3 h-96 w-96 rounded-full bg-accent/25 blur-[120px] animate-pulse" />
        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-12 md:pt-40 md:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
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
          </motion.div>
        </div>
      </section>

      {/* DIRECT CHANNELS */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              Icon: Mail,
              label: t("contact.offices.emailTitle"),
              value: t("contact.offices.email"),
              href: `mailto:${t("contact.offices.email")}`,
            },
            {
              Icon: Phone,
              label: t("contact.offices.jubailTitle"),
              value: t("contact.offices.jubailPhone"),
              href: `tel:${String(t("contact.offices.jubailPhone")).split("/")[0].replace(/\s/g, "")}`,
            },
            {
              Icon: Phone,
              label: t("contact.offices.dammamTitle"),
              value: t("contact.offices.dammamPhone"),
              href: `tel:${String(t("contact.offices.dammamPhone")).replace(/\s/g, "")}`,
            },
          ].map((c, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <a
                href={c.href}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {c.label}
                    </p>
                    <p
                      className="mt-0.5 font-medium text-foreground text-sm md:text-base"
                      dir="ltr"
                    >
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
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-28 text-start">
        <div className="grid gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Offices Directory & Timezone */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {(["jubail", "dammam"] as const).map((office, idx) => (
                <Reveal key={office} delay={idx * 100}>
                  <div className="rounded-md bg-card p-6 md:p-7 relative overflow-hidden group shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98]">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {t(`contact.offices.${office}Title`)}
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                        <span className="leading-relaxed">
                          {t(`contact.offices.${office}Address`)}
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                        <span dir="ltr">{t(`contact.offices.${office}Phone`)}</span>
                      </li>
                      {office === "jubail" && (
                        <li className="flex items-center gap-2.5">
                          <Printer className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                          <span dir="ltr">{t("contact.offices.jubailFax")}</span>
                        </li>
                      )}
                      <li className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                        <a
                          href={`mailto:${t("contact.offices.email")}`}
                          className="hover:text-emerald-500 transition-colors"
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

            {/* Timezone Status Card */}
            <Reveal delay={200}>
              <div className="rounded-sm border border-border bg-[#0b0f19] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                      SUPPORT ACTIVE
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500">AST UTC+3</span>
                </div>

                <div className="mt-4">
                  <h4 className="font-display text-sm font-bold text-white">
                    Arabia Standard Time (AST)
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    Our engineering and estimating office in Jubail operates Sunday to Thursday,
                    from 08:00 AM to 05:00 PM.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Inquiry Board Form */}
          <Reveal delay={150} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-md bg-card p-8 md:p-10 shadow-emil h-full flex flex-col justify-between"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-20 my-auto">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center animate-bounce">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="mt-6 font-display text-xl font-bold text-foreground">
                    {t("contact.form.sent")}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
                    Your inquiry has been logged in our system. A project engineer will contact you
                    shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      {t("contact.form.title")}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Submit technical details, dimensions, and specifications to receive an
                      engineered rehabilitation proposal.
                    </p>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-bold text-foreground">
                          {t("contact.form.name")}
                        </Label>
                        <Input
                          id="name"
                          required
                          className="rounded-sm border-border bg-secondary/35 focus-visible:ring-emerald-500 text-base md:text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-bold text-foreground">
                          {t("contact.form.phone")}
                        </Label>
                        <Input
                          id="phone"
                          required
                          className="rounded-sm border-border bg-secondary/35 focus-visible:ring-emerald-500 text-base md:text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold text-foreground">
                          {t("contact.form.email")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          className="rounded-sm border-border bg-secondary/35 focus-visible:ring-emerald-500 text-base md:text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-xs font-bold text-foreground">
                          {t("contact.form.company")}
                        </Label>
                        <Input
                          id="company"
                          className="rounded-sm border-border bg-secondary/35 focus-visible:ring-emerald-500 text-base md:text-xs"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="subject" className="text-xs font-bold text-foreground">
                          {t("contact.form.subject")}
                        </Label>
                        <Input
                          id="subject"
                          className="rounded-sm border-border bg-secondary/35 focus-visible:ring-emerald-500 text-base md:text-xs"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="message" className="text-xs font-bold text-foreground">
                          {t("contact.form.message")}
                        </Label>
                        <Textarea
                          id="message"
                          rows={5}
                          required
                          className="rounded-sm border-border bg-secondary/35 focus-visible:ring-emerald-500 text-base md:text-xs resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5"
                    >
                      {submitting ? (
                        <Loader2 className="h-3.5 w-3.5 me-2 animate-spin" />
                      ) : (
                        <Send className="h-3.5 w-3.5 me-2" />
                      )}
                      {t("contact.form.submit")}
                    </Button>
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
