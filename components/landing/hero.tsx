import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { links } from "@/lib/constants";
import { TerminalCard } from "./terminal-card";

export const Hero = () => {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-32 md:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-28">
      <div className="flex flex-col items-start gap-6">
        <p className="rounded-full border border-border/15 px-3 py-1 font-mono text-xs text-muted-foreground">
          Open source · eBPF · Apache-2.0
        </p>

        <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Know <span className="text-accent">which dependency</span> did it.
        </h1>

        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          The kernel can tell you a process read a secret or connected to a new
          host. Goodman tells you which npm package — and which version — did
          it, and alerts the moment a dependency does something it has never
          done before.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={links.pilotCall}
            className={buttonVariants({ variant: "iconButton", className: "h-11 px-6 text-base" })}
          >
            Book a design-partner call
          </Link>
          <Link
            href={links.repo}
            target="_blank"
            className={buttonVariants({ className: "h-11 px-6 text-base" })}
          >
            <GitHubLogoIcon className="size-5" />
            Star on GitHub
          </Link>
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          Runs on your cluster · Helm install in minutes · detection-first, no agents in your code
        </p>
      </div>

      <TerminalCard />
    </section>
  );
};
