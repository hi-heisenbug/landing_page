import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Homepage", desc: "Product overview of Goodman and Heisenbug" },
  { href: "/llms.txt", label: "llms.txt", desc: "Machine-readable site guide for AI agents" },
  { href: "/sitemap.xml", label: "Sitemap", desc: "All public pages on this site" },
  { href: "/blog", label: "Blog", desc: "Engineering notes on runtime dependency security" },
  { href: "https://docs.heisenbug.ai", label: "Documentation", desc: "Goodman installation and reference docs" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-6 py-24 font-sans text-foreground">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        404: Page not found
      </h1>
      <p className="leading-relaxed text-muted-foreground">
        The path you requested does not exist on heisenbug.ai. This response
        has HTTP status 404; the URL should not be retried. Here is where to
        look instead:
      </p>
      <ul className="list-disc space-y-3 pl-6 leading-relaxed">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="font-semibold text-accent underline underline-offset-2">
              {l.label}
            </Link>
            {" — "}
            {l.desc}
          </li>
        ))}
      </ul>
      <p className="leading-relaxed text-muted-foreground">
        Questions? Email{" "}
        <a href="mailto:hi@heisenbug.ai" className="text-accent underline underline-offset-2">hi@heisenbug.ai</a>.
      </p>
    </main>
  );
}
