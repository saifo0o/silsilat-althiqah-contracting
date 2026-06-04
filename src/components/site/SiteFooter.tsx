import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/seema-logo.png";

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container mx-auto px-4 md:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Seema" className="h-12 w-auto" width={120} height={48} />
              <div>
                <p className="font-display text-lg font-semibold">{t("company.name")}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t("company.tagline")}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("footer.explore")}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(["home", "about", "services", "projects", "clients", "contact"] as const).map((k) => (
                <li key={k}>
                  <Link to={k === "home" ? "/" : `/${k}`} className="hover:text-foreground transition-colors">
                    {t(`nav.${k}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("contact.offices.jubailTitle")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                <span>{t("contact.offices.jubailAddress")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                <span dir="ltr">{t("contact.offices.jubailPhone")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href={`mailto:${t("contact.offices.email")}`} className="hover:text-foreground transition-colors" dir="ltr">
                  {t("contact.offices.email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} {t("company.name")}. {t("footer.rights")}</p>
          <p>{t("footer.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
