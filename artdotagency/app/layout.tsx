import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./component /SmoothScroll";

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
    default: "Artdotagency | Strategic Creative Solutions",
    template: "%s | Artdotagency", // Allows sub-pages to look like: "Work | Artdotagency"
  },
  description: "Midlands based marketers & entrepreneurs elevating brands. We bridge the gap between brands and the generation that drives them.",
  
  keywords: ["Creative Agency", "Brand Strategy", "Gen Z Marketing", "Web Design", "Birmingham", "London", "Digital Culture"],
  
  authors: [{ name: "Artdotagency Team" }],
  creator: "Artdotagency",
  publisher: "Artdotagency",

  // OPEN GRAPH (Facebook, LinkedIn, Discord, Slack)
  // Note: We removed the 'images' array because Next.js automatically uses opengraph-image.tsx
  openGraph: {
    type: "website",
    locale: "en_GB", // UK English
    url: "https://www.artdotagency.io",
    title: "Artdotagency | Strategic Creative Solutions",
    description: "Strategic creative solutions bridging the gap between brands and culture.",
    siteName: "Artdotagency",
  },

  // TWITTER / X
  // Note: We removed the 'images' array here too
  twitter: {
    card: "summary_large_image",
    title: "Artdotagency | Strategic Creative Solutions",
    description: "Strategic creative solutions bridging the gap between brands and culture.",
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
  themeColor: "#050505", // Matches your black background
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kamerick.variable} font-kamerick bg-black text-white antialiased overflow-x-hidden`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}