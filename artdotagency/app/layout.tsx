import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./component /SmoothScroll";
import Navbar from "./component /Navbar";
import WebGLBackground from "./component /WebGLBackground";

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

// 2. THE SEO CONFIGURATION
export const metadata: Metadata = {
  // IMPORTANT: Change this to your actual domain when you deploy!
  metadataBase: new URL('https://www.artdotagency.io'), 

  title: {
    default: "Artdotagency | Cultural Strategy & Community Engagement",
    template: "%s | Artdotagency", 
  },
  description: "We help councils, cultural organizations, and development teams shape cultural spaces, involve communities, and deliver high-impact public programmes.",
  
  keywords: ["Cultural Strategy", "Community Engagement", "Public Realm", "Placemaking", "Civic Design", "Cultural Venues", "Birmingham", "London", "Social Value"],
  
  // Developer & Author Identification
  authors: [{ name: "Artdotagency Team" }, { name: "Ashley Amaka John" }],
  creator: "Ashley Amaka John",
  publisher: "Nightburn Tech Services",

  // OPEN GRAPH (Facebook, LinkedIn, Discord, Slack)
  openGraph: {
    type: "website",
    locale: "en_GB", 
    url: "https://www.artdotagency.io",
    title: "Artdotagency | Cultural Strategy & Community Engagement",
    description: "We help councils and developers shape cultural spaces, involve communities, and deliver high-impact public programmes.",
    siteName: "Artdotagency",
  },

  // TWITTER / X
  twitter: {
    card: "summary_large_image",
    title: "Artdotagency | Cultural Strategy & Community Engagement",
    description: "We help councils and developers shape cultural spaces, involve communities, and deliver high-impact public programmes.",
    creator: "@artdotagency", 
  },

  // ICONS (Favicons)
  icons: {
    icon: "/art.png",
    shortcut: "/art.png",
    apple: "/art.png", 
  },

  // ROBOTS (Google Indexing)
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
  
  // --- JSON-LD SCHEMA ---
  // Connects the Agency to you as the Developer for Google's Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Artdotagency",
    "url": "https://www.artdotagency.io",
    "author": {
      "@type": "Person",
      "name": "Ashley Amaka John",
      "alternateName": ["Night", "Jinxx"],
      "jobTitle": "Full-stack Software Engineer",
      "brand": {
        "@type": "Brand",
        "name": "Nightburn Tech Services"
      }
    }
  };

  return (
    <html lang="en">
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
        <SmoothScroll>
          <WebGLBackground />
          <Navbar />
          {children}
        </SmoothScroll>

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
