import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Syne, Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  jsonLdOrganization,
  jsonLdWebsite,
} from "@/lib/site";
import { loadContent } from "@/lib/inline-editor/content-store";
import { isAdmin } from "@/lib/inline-editor/admin-auth";
import EditorShell from "@/components/inline-editor/EditorShell";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "web design Nanaimo",
    "Nanaimo website designer",
    "Vancouver Island web design",
    "BC web design",
    "small business website",
    "custom website design",
    "portfolio website",
    "e-commerce website",
    "landing page design",
    "Next.js web design",
    "VIU student web design",
    "affordable web design Canada",
    "Van Duist Treitel",
  ],
  category: "Web Design",
  alternates: {
    canonical: "/",
  },
  // NOTE: og:image and twitter:image are emitted automatically by
  // app/opengraph-image.tsx and app/twitter-image.tsx (Next file conventions).
  // Do not duplicate images here.
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "any" },
    ],
    apple: "/icon.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await loadContent();
  const admin = await isAdmin();
  return (
    <html lang="en-CA" className={`${geist.variable} ${cormorant.variable} ${syne.variable} ${lora.variable}`}>
      <body className="antialiased">
        <EditorShell content={content} admin={admin}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </EditorShell>
        <SpeedInsights />
        {/* Structured data for local SEO (knowledge panel, rich results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </body>
    </html>
  );
}
