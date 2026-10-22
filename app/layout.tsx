import type { Metadata } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/apple-touch-icon.png",
  },
};

// The portfolio moved to Netlify on 22 Oct 2026. Every page rendered by this
// app forwards visitors there. Preserved static routes under public/ and the
// Laws of Human Nature companion are separate files and are not affected.
const newPortfolioUrl = "https://krisnguyen.netlify.app/";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  sameAs: [site.linkedin, site.bookstore],
  jobTitle: "Learning and Development Coordinator",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Economics - The University of Danang",
  },
  knowsLanguage: "English",
  hasCredential: [
    "International Tour Guide (English)",
    "Pedagogical Skills (College/University Level)",
    "School Psychological Counseling Skills - USSH HCMC",
    "IELTS 6.5",
  ].map((name) => ({
    "@type": "EducationalOccupationalCredential",
    name,
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${newPortfolioUrl}`} />
        <link rel="canonical" href={newPortfolioUrl} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Navigation />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
