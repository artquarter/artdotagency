import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteShell from "./component /SiteShell";
import { HOME_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageMetadata } from "./lib/seo";

// 1. Configure Kamerick (The "Banging" Font)
const kamerick = localFont({
  src: [
    {
      path: "./fonts/Kamerik105Cyrillic-Book.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-kamerick",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata(HOME_TITLE, SITE_DESCRIPTION, "/"),
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${HOME_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  // Canonicals belong to individual pages, not the shared layout.
  alternates: undefined,
  authors: [{ name: SITE_NAME }],
  publisher: SITE_NAME,
  icons: { icon: "/art.png", shortcut: "/art.png", apple: "/art.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// 3. VIEWPORT SETTINGS
export const viewport: Viewport = {
  themeColor: "#050505", 
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Artdot",
        url: SITE_URL,
        logo: `${SITE_URL}/art.png`,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-GB",
      },
    ],
  };

  return (
    <html lang="en-GB">
      <head>
        {/* Hidden Developer Signature in HTML Source */}
        <script
          dangerouslySetInnerHTML={{
            __html: `/* Site Developed by Ashley Amaka John (Night) | Nightburn Tech Services */`,
          }}
        />

        {/* Inject Schema for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${kamerick.variable} font-kamerick bg-void text-alabaster antialiased overflow-x-hidden`}
      >
        <SiteShell>{children}</SiteShell>

        {/* Developer Console Greeting */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log(
                "%c Crafted by Night %c Nightburn Tech Services ",
                "color: white; background: #000; padding: 5px 10px; border-radius: 4px; font-weight: bold;",
                "color: #888; background: transparent; font-weight: bold;"
              );
            `,
          }}
        />
      </body>
    </html>
  );
}
