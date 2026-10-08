"use client";

// Adapté de « Glowing Effect » (Aceternity UI, via 21st.dev) : une lueur qui
// suit le pointeur le long de la bordure. Couleurs reprises du code couleur
// du service (--l1, --l2, --l-clair) au lieu de l'arc-en-ciel d'origine.

import { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({ blur = 0, inactiveZone = 0.01, proximity = 64, spread = 40, className, movementDuration = 2, borderWidth = 2 }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;
          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;
          if (e) lastPosition.current = { x: mouseX, y: mouseY };

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity && mouseX < left + width + proximity && mouseY > top - proximity && mouseY < top + height + proximity;
          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          animate(currentAngle, currentAngle + angleDiff, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => element.style.setProperty("--start", String(value)),
          });
        });
      },
      [inactiveZone, proximity, movementDuration],
    );

    useEffect(() => {
      // Souris uniquement : pas d'effet sur écran tactile
      if (!window.matchMedia("(hover: hover)").matches) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove]);

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient": `radial-gradient(circle, var(--l-clair) 10%, transparent 20%),
              radial-gradient(circle at 40% 40%, rgb(var(--l1)) 5%, transparent 15%),
              radial-gradient(circle at 60% 60%, rgb(var(--l2)) 10%, transparent 20%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                rgb(var(--l1)) 0%,
                var(--l-clair) calc(25% / var(--repeating-conic-gradient-times)),
                rgb(var(--l2)) calc(50% / var(--repeating-conic-gradient-times)),
                var(--l-clair) calc(75% / var(--repeating-conic-gradient-times)),
                rgb(var(--l1)) calc(100% / var(--repeating-conic-gradient-times))
              )`,
          } as React.CSSProperties
        }
        className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", blur > 0 && "blur-[var(--blur)]", className)}
      >
        <div
          className={cn(
            "rounded-[inherit]",
            'after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit] after:content-[""]',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
            "after:[mask-clip:padding-box,border-box]",
            "after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
          )}
        />
      </div>
    );
  },
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
