"use client";

import { type ReactNode, useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
}

const hiddenTransforms: Record<Direction, string> = {
  up: "translateY(30px)",
  down: "translateY(-30px)",
  left: "translateX(30px)",
  right: "translateX(-30px)",
};

/**
 * Scroll-triggered reveal that keeps server-rendered HTML fully visible.
 *
 * The raw (no-JS) HTML never hides content: the element is rendered visible
 * with a CSS transition. Only after hydration do we hide elements that are
 * still below the fold and animate them in as they enter the viewport. This
 * preserves the visual reveal for human visitors while ensuring crawlers
 * without JavaScript see all content.
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    let revealed = false;

    const show = () => {
      if (revealed) return;
      revealed = true;
      el.style.opacity = "1";
      el.style.transform = "none";
      if (once) observer.disconnect();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );

    // Elements already on screen stay visible; below-the-fold content gets
    // hidden only now, after hydration, so crawlers never see it hidden.
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inViewport) {
      el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.4, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.4, 0.25, 1)`;
      el.style.transitionDelay = `${delay}s`;
      el.style.opacity = "0";
      el.style.transform = hiddenTransforms[direction];
      observer.observe(el);
    } else {
      // Trigger the entrance animation for above-fold siblings staggered by delay.
      el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.4, 0.25, 1), transform 0.7s cubic-bezier(0.25, 0.4, 0.25, 1)`;
      el.style.transitionDelay = `${delay}s`;
      el.style.opacity = "0";
      el.style.transform = hiddenTransforms[direction];
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "none";
        })
      );
    }

    return () => observer.disconnect();
  }, [delay, direction, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
