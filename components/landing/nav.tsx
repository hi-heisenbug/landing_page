"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/manifesto", label: "Manifesto" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Close mobile menu on scroll
      setMobileOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          : "bg-white/40 backdrop-blur-xl"
      )}
    >
      {/* Subtle bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#93cb52]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1c9770]/20 to-transparent blur-sm" />

      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center text-base">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-[#1c9770]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={links.repo}
            target="_blank"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            <GitHubLogoIcon className="size-4" />
            GitHub
          </Link>
          <Link
            href={links.pilotCall}
            className={buttonVariants({ variant: "iconButton", size: "sm", className: "px-4" })}
          >
            Book a pilot
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-[#bef3e2]/40 md:hidden"
          >
            <div className="flex w-[18px] flex-col items-center justify-center gap-[5px]">
              <span
                className={cn(
                  "block h-[1.5px] w-full rounded-full bg-[#464646] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]",
                  mobileOpen && "translate-y-[6.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full rounded-full bg-[#464646] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]",
                  mobileOpen && "scale-x-0 opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full rounded-full bg-[#464646] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]",
                  mobileOpen && "-translate-y-[6.5px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden border-t border-[#93cb52]/10 bg-white/90 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="flex items-center rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#464646] transition-colors duration-200 hover:bg-[#bef3e2]/30 hover:text-[#1c9770]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-[#93cb52]/20 to-transparent" />

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * navLinks.length, duration: 0.3, ease: "easeOut" }}
              >
                <Link
                  href={links.repo}
                  target="_blank"
                  onClick={closeMobile}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#464646] transition-colors duration-200 hover:bg-[#bef3e2]/30 hover:text-[#1c9770]"
                >
                  <GitHubLogoIcon className="size-4" />
                  GitHub
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
