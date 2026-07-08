"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { inputVariants } from "@/components/ui/input";

const FormNewsletter = dynamic(
  () => import("@/components/form-newsletter").then((mod) => mod.FormNewsletter),
  { ssr: false }
);
import { contactEmail, links } from "@/lib/constants";
import { motion } from "framer-motion";

export const Cta = () => {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/3 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#93cb52]/10 blur-[130px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-2/3 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1c9770]/8 blur-[130px]"
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 20, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated rotating border wrapper */}
      <motion.div
        className="relative rounded-3xl p-[1px]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Rotating gradient border */}
        <div
          className="absolute inset-0 rounded-3xl animate-border-rotate"
          style={{
            background:
              "linear-gradient(135deg, #93cb52, #1c9770, #bef3e2, #93cb52)",
            backgroundSize: "300% 300%",
          }}
        />

        {/* Glassmorphic card */}
        <div className="relative flex flex-col items-center gap-6 rounded-3xl bg-white px-6 py-14 text-center sm:px-12">
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#bef3e2]/20 via-transparent to-[#93cb52]/10" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1c9770]">
              Get Started
            </p>

            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-[#464646] sm:text-4xl">
              Secure your software supply chain at runtime
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-[#464646]/80">
              Deploy Goodman across your infrastructure in minutes. Establish automated runtime behavior baselines, map system calls back to packages, and prevent zero-day package attacks before they can execute malicious code.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href={links.pilotCall}
                className={buttonVariants({ variant: "iconButton", className: "h-11 px-6 text-base w-full sm:w-auto text-center justify-center" })}
              >
                Schedule a demo call
              </Link>
              <Link href={`mailto:${contactEmail}`} className={buttonVariants({ variant: "outline-glow", className: "h-11 px-6 text-base w-full sm:w-auto text-center justify-center" })}>
                Contact Sales
              </Link>
            </div>

            {/* Social proof */}
            <p className="mt-2 max-w-md text-xs text-muted-foreground/70">
              Trusted by security teams at scale
            </p>

            <div className="mt-8 w-full max-w-md border-t border-accent/15 pt-10">
              <p className="text-sm text-muted-foreground">
                Not ready to talk? Get the supply-chain research and release notes.
              </p>
              <FormNewsletter
                input={(props) => (
                  <input
                    autoCapitalize="off"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className={`${inputVariants()} pr-14`}
                    {...props}
                  />
                )}
                submit={(props) => (
                  <button
                    className={buttonVariants({ variant: "iconButton", size: "icon-xl" })}
                    aria-label="Subscribe"
                    {...props}
                  >
                    <ArrowRightIcon className="size-4 text-current" />
                  </button>
                )}
              />
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-muted-foreground/50">
              <div className="flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-xs font-medium">Zero Code Changes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-xs font-medium">Zero Data Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span className="text-xs font-medium">Apache-2.0</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
};
