import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  invert?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "start", invert, className }: Props) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-start items-start";
  return (
    <div className={cn("max-w-3xl flex flex-col", alignClass, className)}>
      {eyebrow && (
        <p className={cn(
          "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
          invert ? "text-accent" : "text-accent",
        )}>
          <span className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "mt-5 font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight text-balance",
        invert ? "text-primary-foreground" : "text-foreground",
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-5 text-base md:text-lg leading-relaxed text-balance",
          invert ? "text-primary-foreground/75" : "text-muted-foreground",
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
