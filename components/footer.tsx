import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import XLogoIcon from "./icons/x";
import LinkedInLogoIcon from "./icons/linkedin";
import InstagramLogoIcon from "./icons/instagram";
import YouTubeLogoIcon from "./icons/youtube";
import { contactEmail, links, socialLinks } from "@/lib/constants";
import { Logo } from "./landing/logo";

const footerLinks = [
  { href: links.repo, label: "GitHub", external: true },
  { href: links.docs, label: "Docs", external: true },
  { href: "/#faq", label: "FAQ", external: false },
  { href: "/manifesto", label: "Manifesto", external: false },
  { href: `mailto:${contactEmail}`, label: "Contact", external: false },
];

const socials = [
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: LinkedInLogoIcon },
  { href: socialLinks.x, label: "X", Icon: XLogoIcon },
  { href: socialLinks.github, label: "GitHub", Icon: GitHubLogoIcon },
  { href: socialLinks.instagram, label: "Instagram", Icon: InstagramLogoIcon },
  { href: socialLinks.youtube, label: "YouTube", Icon: YouTubeLogoIcon },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-start">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo tagline className="text-base" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Runtime dependency security. Goodman attributes kernel-level
              behavior to the exact npm package that caused it.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-border/10 pt-6 font-mono text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Heisenbug. All rights reserved.</p>
          <p>Goodman is open source under Apache-2.0.</p>
        </div>
      </div>
    </footer>
  );
};
