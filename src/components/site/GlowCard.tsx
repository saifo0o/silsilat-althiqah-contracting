import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlowCard({ children, className, ...props }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-md bg-card p-6 shadow-emil hover:shadow-emil-hover transition-[box-shadow,transform] duration-500 ease-[var(--ease-emil)] active:scale-[0.98] text-start",
        className
      )}
      {...props}
    >
      {/* Background glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.07), transparent 85%)`,
        }}
      />
      
      {/* Border glow follow effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-emerald-500/20"
        style={{
          maskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
