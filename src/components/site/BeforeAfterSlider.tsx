import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  beforeBody: string;
  afterLabel: string;
  afterBody: string;
}

export function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeLabel,
  beforeBody,
  afterLabel,
  afterBody,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, e.currentTarget.getBoundingClientRect());
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] md:h-[400px] w-full rounded-sm overflow-hidden border border-white/10 select-none cursor-ew-resize touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={beforeImg}
          alt="Before"
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-5 right-5 z-10 text-right" dir="auto">
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white rounded-sm mb-1.5">
            {beforeLabel}
          </span>
          <p className="text-xs text-white/95 max-w-xs ml-auto">{beforeBody}</p>
        </div>
      </div>

      {/* After Image Overlay */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none transition-all duration-75"
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          style={{ width: `${containerWidth}px` }}
          className="absolute inset-y-0 left-0 h-full"
        >
          <img
            src={afterImg}
            alt="After"
            className="w-full h-full object-cover filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 z-10 text-left" dir="auto">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-sm mb-1.5">
              {afterLabel}
            </span>
            <p className="text-xs text-white/95 max-w-xs">{afterBody}</p>
          </div>
        </div>
      </div>

      {/* Slider Handle Divider Line */}
      <div
        className="absolute inset-y-0 w-0.5 bg-emerald-400 z-20 pointer-events-none transition-all duration-75"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Center Drag Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-slate-950 border border-emerald-400 shadow-elegant flex items-center justify-center text-white cursor-ew-resize pointer-events-auto">
          <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
          <ChevronRight className="h-3.5 w-3.5 -ms-1 shrink-0" />
        </div>
      </div>
    </div>
  );
}
