"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const LINE_DELAY = 0.15;
const TOTAL_LINES = 9;

export const TerminalCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * LINE_DELAY,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  const cursorVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: TOTAL_LINES * LINE_DELAY + 0.35,
        duration: 0.01,
      },
    },
  };

  return (
    <div className="relative w-full">
      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#93cb52]/12 via-[#1c9770]/8 to-transparent blur-xl" />

      {/* Gradient border wrapper */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#93cb52]/25 via-[#1c9770]/15 to-[#464646]/10 p-px">
        <div className="overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-[0_24px_80px_-24px_rgba(70,70,70,0.2)]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#141420] px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,0.4)]" />
            <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[0_0_4px_rgba(254,188,46,0.4)]" />
            <span className="size-2.5 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.4)]" />
            <span className="ml-3 font-mono text-xs text-neutral-500">
              goodmanctl - alerts tail
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={ref}
            className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm"
          >
            <motion.p
              className="text-neutral-500"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
            >
              $ goodmanctl alerts tail
            </motion.p>

            <motion.p
              className="mt-3"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
            >
              <span className="rounded bg-red-500/20 px-1.5 py-0.5 font-semibold text-red-400">
                CRITICAL
              </span>
              <span className="text-neutral-200"> dependency behavior drift</span>
            </motion.p>

            <motion.p
              className="mt-2 text-neutral-200"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
            >
              service <span className="text-neutral-600">·</span> checkout-api
            </motion.p>

            <motion.p
              className="text-neutral-200"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
            >
              package <span className="text-neutral-600">·</span>{" "}
              <span className="font-semibold text-white">tanstack-query@1.169.5</span>
            </motion.p>

            <motion.p
              className="mt-2 text-[#febc2e]"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={4}
            >
              + NEW CONNECT 169.254.169.254:80
            </motion.p>

            <motion.p
              className="text-[#febc2e]"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={5}
            >
              + NEW POST git-tanstack.com/collect
            </motion.p>

            <motion.p
              className="mt-2 text-neutral-500"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={6}
            >
              baseline 1.169.4 · learned over 41 days · 0 prior anomalies
            </motion.p>

            <motion.p
              className="mt-3 text-[#93cb52]"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={7}
            >
              → attributed to package in 2m 41s. your scanner is still green.
            </motion.p>

            {/* Blinking cursor — appears after all lines have animated */}
            <motion.span
              className="mt-3 inline-block h-[1.1em] w-[2px] translate-y-[1px] animate-pulse bg-[#93cb52]"
              variants={cursorVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
