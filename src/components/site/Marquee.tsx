import type { ReactNode } from "react";

interface Props {
  items: ReactNode[];
}

export function Marquee({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex animate-marquee gap-12 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        dir="ltr"
      >
        {doubled.map((it, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}
