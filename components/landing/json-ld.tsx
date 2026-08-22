import { contactEmail, links, socialLinks } from "@/lib/constants";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.heisenbug.ai/#organization",
  name: "Heisenbug",
  url: "https://www.heisenbug.ai",
  slogan: "The bug that catches every bug",
  email: contactEmail,
  logo: "https://www.heisenbug.ai/icon.svg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6th Floor, Lightbridge, Hiranandani Business Park",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400072",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: contactEmail,
    contactType: "technical support",
    availableLanguage: ["English"],
  },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.x,
    socialLinks.github,
    socialLinks.instagram,
    socialLinks.youtube,
  ],
};

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Goodman",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Linux, Kubernetes",
  description:
    "Open-source eBPF runtime dependency-security sensor that attributes security-relevant syscalls to the exact npm package that caused them and alerts on behavioral drift, built to detect npm supply-chain attacks that pass static scanners.",
  url: "https://www.heisenbug.ai",
  downloadUrl: links.repo,
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free and open source under Apache-2.0",
  },
  author: { "@id": "https://www.heisenbug.ai/#organization" },
};

export const JsonLd = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
    />
  </>
);
