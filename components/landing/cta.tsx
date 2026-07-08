"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { inputVariants } from "@/components/ui/input";
import { FormNewsletter } from "@/components/form-newsletter";
import { contactEmail, links } from "@/lib/constants";

export const Cta = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-accent/25 bg-[#bef3e2]/30 px-6 py-14 text-center sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Design partners
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          We are taking <span className="text-accent">three</span> design partners
        </h2>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          We deploy Goodman on your cluster, tune the rules, and walk you
          through a dependency-behavior report every week. You get the runtime
          layer done for you — we get your criticism.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={links.pilotCall}
            className={buttonVariants({ variant: "iconButton", className: "h-11 px-6 text-base" })}
          >
            Book a design-partner call
          </Link>
          <Link href={`mailto:${contactEmail}`} className={buttonVariants({ className: "h-11 px-6 text-base" })}>
            {contactEmail}
          </Link>
        </div>

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
                className={inputVariants()}
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
      </div>
    </section>
  );
};
