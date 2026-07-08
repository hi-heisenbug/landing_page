import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { V0Provider } from "@/lib/context"
import dynamic from "next/dynamic"

const V0Setup = dynamic(() => import("@/components/v0-setup"))

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heisenbug.ai"),
  title: {
    template: "%s | Heisenbug",
    default: "Heisenbug — Detect npm supply-chain attacks at runtime with eBPF",
  },
  description:
    "Goodman is an open-source eBPF sensor that attributes security-relevant syscalls to the exact npm package that caused them and alerts when a dependency's behavior drifts from its learned baseline. Runtime detection for npm supply-chain attacks that pass static scanners.",
  keywords: [
    "npm supply chain attack",
    "supply chain security",
    "eBPF security",
    "runtime security",
    "dependency security",
    "software supply chain",
    "npm malware detection",
    "behavioral drift detection",
    "open source security tool",
    "Kubernetes security",
    "SCA",
    "Goodman",
    "Heisenbug",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: "Heisenbug",
  authors: [{ name: "Heisenbug", url: "https://www.heisenbug.ai" }],
  creator: "Heisenbug",
  category: "technology",
  openGraph: {
    title: "Heisenbug — Detect npm supply-chain attacks at runtime with eBPF",
    description:
      "Know which dependency did it. Goodman attributes kernel-level behavior to the exact npm package@version and alerts on drift — open source, Apache-2.0, runs on your cluster.",
    url: "https://www.heisenbug.ai",
    siteName: "Heisenbug",
    locale: "en_US",
    images: [
      {
        url: "/dashboard.png",
        width: 1600,
        height: 900,
        alt: "Goodman dashboard showing a critical dependency drift alert attributed to an npm package",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hi_heisenbug",
    creator: "@hi_heisenbug",
    title: "Heisenbug — Detect npm supply-chain attacks at runtime with eBPF",
    description:
      "Know which dependency did it. Open-source eBPF runtime detection for npm supply-chain attacks.",
    images: ["/dashboard.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(dmSans.variable, inter.variable, geistMono.variable)}>
        <V0Provider isV0={isV0}>
          {children}
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  )
}
