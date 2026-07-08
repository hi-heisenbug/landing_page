import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/landing/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes from Heisenbug on runtime dependency security and eBPF.",
  alternates: {
    canonical: "/blog",
  },
};

const posts = [
  {
    href: "/blog/tanstack-replay-under-ebpf",
    title: "Replaying an npm supply-chain attack under eBPF",
    description:
      "What the kernel sees that your scanner doesn't: a reproducible replay of the 2026 npm supply-chain attack pattern, with syscall-level attribution to the exact package.",
    tag: "Engineering · eBPF",
  },
];

export default function BlogIndex() {
  return (
    <main className="w-full">
      <Nav />
      <section className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-36">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Engineering notes on runtime dependency security, eBPF, and what we
          learn deploying Goodman.
        </p>
        <div className="mt-12 flex flex-col divide-y divide-border/10">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col gap-2 py-6 first:pt-0"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {post.tag}
              </p>
              <h2 className="font-display text-xl font-bold tracking-tight group-hover:text-accent">
                {post.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
