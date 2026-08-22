"use client";

import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { links } from "@/lib/constants";
import { TerminalCard } from "./terminal-card";
import { useEffect } from "react";

/**
 * Entrance animation applied after hydration only: the server-rendered HTML
 * stays fully visible so crawlers without JavaScript read all hero content,
 * while human visitors still get the staggered fade-up on load.
 */
function useStaggeredEntrance(delayStep = 0.12) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-hero-stagger]");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      child.style.transitionDelay = `${0.1 + i * delayStep}s`;
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
    });

    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        children.forEach((child) => {
          child.style.opacity = "1";
          child.style.transform = "none";
        });
      })
    );
    return () => cancelAnimationFrame(raf);
  }, [delayStep]);
}

export const Hero = () => {
  useStaggeredEntrance();

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#93cb52]/[0.05] blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#1c9770]/[0.04] blur-[100px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[400px] rounded-full bg-[#bef3e2]/[0.3] blur-[80px]" />
      </div>

      <div
        data-hero-stagger
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-28"
      >
        <div className="flex min-w-0 flex-col items-start gap-6">
          {/* Animated badge/pill */}
          <div className="relative">
            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-[#93cb52]/30 via-[#1c9770]/20 to-[#93cb52]/30 blur-[2px]" />
            <p className="relative rounded-full border border-[#93cb52]/25 bg-white/80 px-3 py-1 font-mono text-xs text-[#464646]/70 backdrop-blur-sm">
              Open source · eBPF · Apache-2.0
            </p>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Know{" "}
            <span className="bg-gradient-to-r from-[#93cb52] to-[#1c9770] bg-clip-text text-transparent">
              which dependency
            </span>{" "}
            did it.
          </h1>

          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The kernel can tell you a process read a secret or connected to a new
            host. Goodman tells you which npm package, and which version, did
            it, and alerts the moment a dependency does something it has never
            done before.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link
              href={links.pilotCall}
              className={buttonVariants({ variant: "iconButton", className: "h-11 px-6 text-base w-full sm:w-auto text-center justify-center" })}
            >
              Book a design-partner call
            </Link>
            <Link
              href={links.repo}
              target="_blank"
              className={buttonVariants({ variant: "outline-glow", className: "h-11 px-6 text-base w-full sm:w-auto text-center justify-center" })}
            >
              <GitHubLogoIcon className="size-5" />
              Star on GitHub
            </Link>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            Runs on your cluster · Helm install in minutes · detection-first, no agents in your code
          </p>
        </div>

        <div>
          <TerminalCard />
        </div>
      </div>
    </section>
  );
};
