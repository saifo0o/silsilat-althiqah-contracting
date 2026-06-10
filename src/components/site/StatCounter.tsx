import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  label: string;
}

// Parses leading numeric portion of value (e.g. "12+", "+17", "98%") and
// animates it; preserves prefix/suffix characters around the number.
export function StatCounter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const match = value.match(/(\D*)(\d+)(\D*)/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(el);
          const duration = 1400;
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, match]);

  return (
    <div ref={ref} className="px-4 py-8 text-center md:text-start">
      <p
        className="font-display text-4xl md:text-5xl font-semibold tracking-tight tabular-nums"
        dir="ltr"
      >
        {prefix}
        {match ? n : value}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}
