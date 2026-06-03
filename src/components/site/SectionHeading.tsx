import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "start" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "start" }: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-start";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-foreground">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
