import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const cursorSize = isHovering ? 64 : isDragging ? 48 : 16;

  const mouse = {
    x: useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 }),
    y: useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 }),
  };

  useEffect(() => {
    // Only run on desktop devices with a pointer
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    const manageMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX - cursorSize / 2);
      mouse.y.set(e.clientY - cursorSize / 2);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over links, buttons, or elements marked with data-magnetic
      const isInteractive = target.closest('a, button, [data-magnetic], input, textarea');
      const isDragZone = target.closest('.cursor-ew-resize');

      if (isDragZone) {
        setIsDragging(true);
        setIsHovering(false);
      } else if (isInteractive) {
        setIsHovering(true);
        setIsDragging(false);
      } else {
        setIsHovering(false);
        setIsDragging(false);
      }
    };

    if (isDesktop) {
      window.addEventListener("mousemove", manageMouseMove);
      document.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
      window.removeEventListener("mousemove", manageMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorSize, isDesktop, mouse.x, mouse.y]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
      style={{
        x: mouse.x,
        y: mouse.y,
        width: cursorSize,
        height: cursorSize,
        backgroundColor: "white",
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {isDragging && (
        <div className="flex gap-1 text-black items-center justify-center font-bold text-[8px] tracking-widest uppercase">
          &lt; Drag &gt;
        </div>
      )}
    </motion.div>
  );
}
