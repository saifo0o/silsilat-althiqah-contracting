import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, Languages, ArrowRight, MapPin, Phone, Mail, Linkedin, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import logo from "@/assets/silsilat-al-thiqa-logo.png";
import { setLanguage } from "@/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/site/Magnetic";

import tileStructural from "@/assets/service-concrete.jpg";
import tilePiping from "@/assets/service-piping.jpg";

const navItems = [
  { to: "/", key: "home" as const, hasMegaMenu: false },
  { to: "/about", key: "about" as const, hasMegaMenu: false },
  { to: "/services", key: "services" as const, hasMegaMenu: true },
  { to: "/projects", key: "projects" as const, hasMegaMenu: false },
  { to: "/clients", key: "clients" as const, hasMegaMenu: false },
  { to: "/contact", key: "contact" as const, hasMegaMenu: false },
];

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { location } = useRouterState();
  const isRtl = i18n.language === "ar";

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMegaMenuOpen(null);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setOpen(false);
    setMegaMenuOpen(null);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleLang = () => setLanguage(i18n.language === "ar" ? "en" : "ar");

  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = (key: string) => {
    clearTimeout(timeoutId);
    setMegaMenuOpen(key);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setMegaMenuOpen(null);
    }, 150);
  };

  return (
    <>
      <motion.header
        variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full"
      onMouseLeave={handleMouseLeave}
    >
      {/* Top contact bar */}
      <div className="hidden md:block bg-ink text-ink-foreground/85 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex h-10 items-center justify-between text-[11px]">
          <div className="flex items-center gap-6">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              Jubail Industrial City, Kingdom of Saudi Arabia
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+966133611661"
              dir="ltr"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              +966 13 361 1661
            </a>
            <a
              href="mailto:info@seema.sa.com"
              dir="ltr"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              info@seema.sa.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "transition-colors duration-300 border-b border-white/10",
          isScrolled ? "bg-ink/90 backdrop-blur-xl" : "bg-ink/95 backdrop-blur-md"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Magnetic>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="transition-transform group-hover:scale-105">
                <img src={logo} alt="SEEMA General Contracting" className="h-12 md:h-14 w-auto object-contain" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-display text-sm font-bold text-ink-foreground tracking-wide">
                  {t("company.name")}
                </span>
                <span className="text-[8px] uppercase tracking-[0.15em] text-ink-foreground/60">
                  {t("company.tagline")}
                </span>
              </div>
            </Link>
          </Magnetic>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <div 
                  key={item.to} 
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu ? handleMouseEnter(item.key) : handleMouseEnter('')}
                >
                  <Magnetic>
                    <Link
                      to={item.to}
                      className={cn(
                        "relative flex items-center gap-1 px-3.5 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors",
                        active || megaMenuOpen === item.key ? "text-accent" : "text-ink-foreground/85 hover:text-accent",
                      )}
                    >
                      {t(`nav.${item.key}`)}
                      {item.hasMegaMenu && (
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaMenuOpen === item.key && "rotate-180")} />
                      )}
                      {active && (
                        <motion.span 
                          layoutId="nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent rounded-full" 
                        />
                      )}
                    </Link>
                  </Magnetic>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic>
              <button
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink-foreground hover:bg-white/10 transition-colors"
                aria-label="Toggle language"
              >
                <Languages className="h-3.5 w-3.5" />
                <span>{t("lang.toggle")}</span>
              </button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 rounded-md px-6 font-bold uppercase tracking-wider text-[11px]"
              >
                <Link to="/contact">
                  {t("nav.cta")}
                  <ArrowRight className="h-3.5 w-3.5 ms-1.5 rtl:rotate-180" />
                </Link>
              </Button>
            </Magnetic>
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-ink-foreground hover:bg-white/10"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen === "services" && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 w-full overflow-hidden bg-ink border-b border-white/10 shadow-2xl origin-top"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container mx-auto px-4 md:px-6 py-10">
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">{t('home.servicesEyebrow', 'Our Services')}</p>
                    <ul className="space-y-4">
                      <li>
                        <Link to="/services" className="text-ink-foreground hover:text-accent transition-colors font-bold text-lg flex items-center group">
                          {t('services.items.assessment.title')}
                          <ArrowRight className="h-4 w-4 ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/services" className="text-ink-foreground hover:text-accent transition-colors font-bold text-lg flex items-center group">
                          {t('services.items.rehabilitation.title')}
                          <ArrowRight className="h-4 w-4 ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/services" className="text-ink-foreground hover:text-accent transition-colors font-bold text-lg flex items-center group">
                          {t('services.items.protection.title')}
                          <ArrowRight className="h-4 w-4 ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
                        </Link>
                      </li>
                      <li>
                        <Link to="/services" className="text-ink-foreground hover:text-accent transition-colors font-bold text-lg flex items-center group">
                          {t('services.items.endurance.title')}
                          <ArrowRight className="h-4 w-4 ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
                        </Link>
                      </li>
                    </ul>
                    <Button asChild variant="link" className="mt-6 p-0 text-muted-foreground hover:text-accent h-auto font-bold uppercase text-[10px] tracking-wider">
                      <Link to="/services">{t('nav.services', 'View All Services')} &rarr;</Link>
                    </Button>
                  </div>
                  
                  {/* Featured Service Spotlight */}
                  <div className="col-span-9 grid grid-cols-2 gap-6 border-s border-white/10 ps-8">
                    <div className="group relative overflow-hidden rounded-sm h-64">
                      <img src={tileStructural} alt="Structural" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 start-6 end-6">
                        <span className="text-[9px] uppercase tracking-widest text-accent font-bold">{t('nav.megaMenu.latestStandard')}</span>
                        <h4 className="text-xl font-display font-bold text-white mt-1" dir="ltr">{t('nav.megaMenu.asme')}</h4>
                      </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-sm h-64">
                      <img src={tilePiping} alt="Piping" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 start-6 end-6">
                        <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">{t('nav.megaMenu.caseStudy')}</span>
                        <h4 className="text-xl font-display font-bold text-white mt-1" dir="ltr">{t('nav.megaMenu.liveLeak')}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>

    {/* Mobile Menu */}
    <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setOpen(false)}
              />

              {/* Drawer Container */}
              <motion.div
                variants={{
                  closed: { x: isRtl ? "-100%" : "100%" },
                  open: { x: 0 },
                }}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 end-0 z-50 w-full sm:max-w-md bg-ink border-s border-white/10 shadow-2xl flex flex-col lg:hidden"
              >
                {/* Header inside drawer */}
                <div className="flex h-20 items-center justify-between px-4 border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div>
                      <img src={logo} alt="SEEMA General Contracting" className="h-10 md:h-12 w-auto object-contain" />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-display text-sm font-bold text-ink-foreground tracking-wide">
                        {t("company.name")}
                      </span>
                      <span className="text-[8px] uppercase tracking-[0.15em] text-ink-foreground/50">
                        {t("company.tagline")}
                      </span>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center justify-center rounded-md p-2 text-ink-foreground hover:bg-white/10"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Scrollable Nav List */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                      if (item.hasMegaMenu) {
                        return (
                          <div key={item.to} className="flex flex-col gap-1">
                            <button
                              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                              className="w-full flex items-center justify-between rounded-md px-3 py-3 text-base font-bold uppercase tracking-wider text-ink-foreground hover:bg-white/10 hover:text-accent transition-colors text-start"
                            >
                              <span>{t(`nav.${item.key}`)}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300",
                                  mobileServicesOpen && "rotate-180"
                                )}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {mobileServicesOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden ps-4 flex flex-col gap-1 border-s border-white/10 ms-3"
                                >
                                  <Link
                                    to="/services"
                                    hash="structural"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-ink-foreground/85 hover:text-accent transition-colors text-start"
                                  >
                                    {t("home.tiles.structural.title")}
                                  </Link>
                                  <Link
                                    to="/services"
                                    hash="piping"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-ink-foreground/85 hover:text-accent transition-colors text-start"
                                  >
                                    {t("home.tiles.piping.title")}
                                  </Link>
                                  <Link
                                    to="/services"
                                    hash="coatings"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-ink-foreground/85 hover:text-accent transition-colors text-start"
                                  >
                                    {t("home.tiles.coatings.title")}
                                  </Link>
                                  <Link
                                    to="/services"
                                    hash="supply"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-ink-foreground/85 hover:text-accent transition-colors text-start"
                                  >
                                    {t("home.tiles.supply.title")}
                                  </Link>
                                  <Link
                                    to="/services"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm font-bold text-accent hover:underline transition-colors text-start"
                                  >
                                    {t("common.viewServices")} &rarr;
                                  </Link>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-3 text-base font-bold uppercase tracking-wider text-ink-foreground hover:bg-white/10 hover:text-accent transition-colors text-start"
                        >
                          {t(`nav.${item.key}`)}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Pinned Actions */}
                <div className="p-6 border-t border-white/10 bg-black/20 shrink-0 flex flex-col gap-4">
                  <Button
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-md py-6 text-sm font-bold tracking-widest uppercase"
                  >
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      {t("nav.cta")}
                      <ArrowRight className="h-4 w-4 ms-2 rtl:rotate-180" />
                    </Link>
                  </Button>
                  
                  <div className="flex flex-col gap-3 text-xs text-ink-foreground/75 mt-2">
                    <a href="tel:+966133611661" dir="ltr" className="flex items-center gap-3 hover:text-accent transition-colors py-1">
                      <Phone className="h-4 w-4 text-accent" />
                      +966 13 361 1661
                    </a>
                    <a href="mailto:info@seema.sa.com" dir="ltr" className="flex items-center gap-3 hover:text-accent transition-colors py-1">
                      <Mail className="h-4 w-4 text-accent" />
                      info@seema.sa.com
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors py-1">
                      <Linkedin className="h-4 w-4 text-accent" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </>
  );
}
