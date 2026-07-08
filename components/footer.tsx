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
  { href: "/blog", label: "Blog", external: false },
  { href: "/#faq", label: "FAQ", external: false },
  { href: "/manifesto", label: "Manifesto", external: false },
  { href: `mailto:${contactEmail}`, label: "Contact", external: false },
];

const socials = [
  {
    href: socialLinks.linkedin,
    label: "LinkedIn",
    Icon: LinkedInLogoIcon,
    hoverColor: "#0077b5",
  },
  {
    href: socialLinks.x,
    label: "X",
    Icon: XLogoIcon,
    hoverColor: "#1c9770",
  },
  {
    href: socialLinks.github,
    label: "GitHub",
    Icon: GitHubLogoIcon,
    hoverColor: "#333333",
  },
  {
    href: socialLinks.instagram,
    label: "Instagram",
    Icon: InstagramLogoIcon,
    hoverColor: "#e4405f",
  },
  {
    href: socialLinks.youtube,
    label: "YouTube",
    Icon: YouTubeLogoIcon,
    hoverColor: "#ff0000",
  },
];

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white to-[#f2eeee]/50">
      {/* Decorative gradient top border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#1c9770] to-transparent opacity-40" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:py-20">
        <div className="flex flex-col justify-between gap-12 sm:flex-row sm:items-start">
          <div className="flex max-w-sm flex-col gap-5">
            <Logo tagline className="text-base" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Runtime dependency security. Goodman attributes kernel-level
              behavior to the exact npm package that caused it.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="relative text-sm text-muted-foreground transition-all duration-300 hover:text-[#1c9770]"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gradient-to-r from-[#93cb52] to-[#1c9770] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex gap-5">
              {socials.map(({ href, label, Icon, hoverColor }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="group/social relative text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  style={
                    {
                      "--social-hover-color": hoverColor,
                    } as React.CSSProperties
                  }
                >
                  <Icon className="size-5 transition-colors duration-300 group-hover/social:[color:var(--social-hover-color)]" />
                  {/* Subtle glow behind icon on hover */}
                  <span
                    className="absolute -inset-2 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover/social:opacity-20"
                    style={{ backgroundColor: hoverColor }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-[#464646]/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1 font-mono text-xs text-muted-foreground sm:flex-row sm:gap-4">
            <p>© {new Date().getFullYear()} Heisenbug. All rights reserved.</p>
            <p>Goodman is open source under Apache-2.0.</p>
          </div>

          {/* Back to top button: pure anchor, works with CSS scroll-behavior: smooth on <html> */}
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-[#1c9770]/20 hover:bg-gradient-to-r hover:from-[#93cb52]/10 hover:to-[#1c9770]/10 hover:text-[#1c9770]"
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            <svg
              className="size-3.5 transition-transform group-hover:[animation:bounce-up_0.8s_ease-in-out_infinite]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};
