import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import logo from "@/assets/seema-logo.png";

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-ink text-ink-foreground overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.06] text-ink-foreground" />
      <div className="absolute -top-32 -end-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative container mx-auto px-4 md:px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/95 p-2">
                <img src={logo} alt="Seema" className="h-10 w-auto" width={100} height={40} />
              </div>
              <div>
                <p className="font-display text-lg font-semibold">{t("company.name")}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-foreground/60">
                  {t("company.tagline")}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/70">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="mailto:danny@seema.sa.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-ink-foreground hover:bg-white/10 transition-colors"
                dir="ltr"
              >
                danny@seema.sa.com
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-foreground/60">
              {t("footer.explore")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {(["home", "about", "services", "projects", "clients", "contact"] as const).map(
                (k) => (
                  <li key={k}>
                    <Link
                      to={k === "home" ? "/" : `/${k}`}
                      className="text-ink-foreground/80 hover:text-accent transition-colors"
                    >
                      {t(`nav.${k}`)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="lg:col-span-5 grid gap-6 sm:grid-cols-2">
            {(["jubail", "dammam"] as const).map((office) => (
              <div key={office}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-foreground/60">
                  {t(`contact.offices.${office}Title`)}
                </h4>
                <ul className="mt-5 space-y-3 text-sm text-ink-foreground/80">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="leading-relaxed">{t(`contact.offices.${office}Address`)}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                    <span dir="ltr">{t(`contact.offices.${office}Phone`)}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                    <a
                      href={`mailto:${t("contact.offices.email")}`}
                      className="hover:text-accent transition-colors"
                      dir="ltr"
                    >
                      {t("contact.offices.email")}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ink-foreground/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {t("company.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
