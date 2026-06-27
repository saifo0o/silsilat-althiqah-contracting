import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface TimelineItem {
  year: string;
  title: string;
  body: string;
}

interface ScrollTimelineProps {
  items: TimelineItem[];
}

export function ScrollTimeline({ items }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto ps-8 md:ps-12">
      {/* Dynamic line */}
      <div className="absolute start-0 top-2 bottom-2 w-[2px] bg-border pointer-events-none">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="w-full h-full bg-emerald-500 origin-top"
        />
      </div>

      <div className="space-y-12 md:space-y-16">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: idx * 0.05 }}
            className="relative group text-start"
          >
            {/* Circle Node */}
            <div className="absolute -start-[37px] md:-start-[45px] top-1.5 h-4 w-4 rounded-full border-2 border-emerald-500 bg-background z-10 transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-card rounded-md p-6 md:p-8 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-emerald-500/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none" />
              
              <span className="font-mono text-3xl font-extrabold text-emerald-500 block mb-2" dir="ltr">
                {item.year}
              </span>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
