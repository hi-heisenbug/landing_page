"use client";

import { motion, type Variants } from "framer-motion";

const logoVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 0.5,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const logos = [
  {
    name: "AWS",
    icon: (
      <svg className="size-3.5 text-current shrink-0" viewBox="0 0 24 15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 2 5 Q 12 13 22 7 M 18 3 L 22 7 L 16 9" />
      </svg>
    ),
    hoverColor: "hover:text-[#ff9900]",
  },
  {
    name: "Google Cloud",
    icon: (
      <svg className="size-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    hoverColor: "hover:text-[#4285f4]",
  },
  {
    name: "Azure",
    icon: (
      <svg className="size-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16M6 16h12" />
      </svg>
    ),
    hoverColor: "hover:text-[#0078d4]",
  },
  {
    name: "Kubernetes",
    icon: (
      <svg className="size-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M12 2L3 6.5v11L12 22l9-4.5v-11L12 2z" />
        <path d="M12 5.2L18 8.2v7.6l-6 3-6-3V8.2l6-3z" />
      </svg>
    ),
    hoverColor: "hover:text-[#326ce5]",
  },
  {
    name: "Docker",
    icon: (
      <svg className="size-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.962 6.075h-2.43v2.427h2.43V6.075zm0-2.99h-2.43v2.428h2.43V3.085zm2.99 2.99h-2.43v2.427h2.43V6.075zm-5.98 0H8.54v2.427h2.431V6.075zm0-2.99H8.54v2.428h2.431V3.085zm-2.99 2.99H5.55v2.427h2.43V6.075zm5.98-5.98h-2.43v2.427h2.43V.105zm2.99 2.99h-2.43v2.427h2.43V3.095zM23.76 9.89c-.113-.393-.574-.69-1.012-.69h-4.37v2.428h2.935c-.443.914-1.286 1.488-2.62 1.488H1.42v1.442c0 2.22 1.764 4.022 3.94 4.022h11.23c2.176 0 3.94-1.802 3.94-4.022 0-.256-.03-.505-.084-.746a3.86 3.86 0 002.327-3.238 1.986 1.986 0 00.988-1.284z"/>
      </svg>
    ),
    hoverColor: "hover:text-[#2496ed]",
  },
  {
    name: "Red Hat",
    icon: (
      <svg className="size-3.5 text-current shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17c3 0 4-3 9-3s6 3 9 3M8 14c0-4 1-6 4-6s4 2 4 6" />
      </svg>
    ),
    hoverColor: "hover:text-[#ee0000]",
  },
];

export const TrustedBy = () => {
  return (
    <section className="relative w-full border-t border-[#464646]/5 bg-[#f2eeee]/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
          Trusted by developers deploying to
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              custom={i}
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ scale: 1.05, opacity: 0.95 }}
              className={`flex items-center gap-1.5 font-display font-bold text-[14px] tracking-wide text-muted-foreground/50 transition-all duration-300 ${logo.hoverColor} cursor-default`}
              aria-label={logo.name}
            >
              {logo.icon}
              <span>{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
