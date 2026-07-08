import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { links } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#open-source", label: "Open source" },
  { href: "/manifesto", label: "Manifesto" },
];

export const Nav = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/10 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center text-base">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        </div>
      </nav>
    </header>
  );
};
