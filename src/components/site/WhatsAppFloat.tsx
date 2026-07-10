import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { X, MessageCircle } from "lucide-react";

const CONTACTS = [
  {
    nameEn: "Yousef Al-Najem",
    nameAr: "يوسف الناجم",
    roleEn: "Oxifree TM198 Specialist",
    roleAr: "متخصص Oxifree TM198",
    phone: "+966 56 119 4438",
    wa: "966561194438",
  },
  {
    nameEn: "Abdulaziz Al-Sardi",
    nameAr: "عبدالعزيز السردي",
    roleEn: "Carbon Fiber (CFRP) Specialist",
    roleAr: "متخصص ألياف الكربون (CFRP)",
    phone: "+966 56 097 6454",
    wa: "966560976454",
  },
];

export function WhatsAppFloat() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isAr = i18n.language === "ar";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 end-5 z-[60] flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div className="w-[300px] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaWhatsapp className="h-5 w-5" />
              <div>
                <p className="text-sm font-bold leading-tight">
                  {isAr ? "تواصل معنا الآن" : "Contact us now"}
                </p>
                <p className="text-[10px] opacity-90 leading-tight">
                  {isAr ? "عادةً نرد خلال دقائق" : "We usually reply in minutes"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="h-7 w-7 rounded-full hover:bg-white/15 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-3 space-y-2 bg-secondary/30">
            {CONTACTS.map((c) => (
              <a
                key={c.wa}
                href={`https://wa.me/${c.wa}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl bg-card border border-border p-3 hover:border-emerald-500/50 hover:shadow-md transition-all group"
              >
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {isAr ? c.nameAr : c.nameEn}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {isAr ? c.roleAr : c.roleEn}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-600 mt-0.5" dir="ltr">
                    {c.phone}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={isAr ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
        className="relative h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40" />
        )}
        {open ? <X className="h-6 w-6 relative" /> : <FaWhatsapp className="h-7 w-7 relative" />}
      </button>
    </div>
  );
}
