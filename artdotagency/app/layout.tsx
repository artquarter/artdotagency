

import type { Metadata } from "next";
import localFont from "next/font/local"; // Import localFont loader
import "./globals.css";
import SmoothScroll from "./component /SmoothScroll";

// 1. Configure Kamerick (The "Banging" Font)
// Make sure the file paths match exactly where you put them in /app/fonts
const kamerick = localFont({
  src: [
    {
      path: "./fonts/Kamerik105Cyrillic-Book.woff", // Adjust filename if needed
     
    },
  
  ],
  variable: "--font-kamerick", // This matches the variable in globals.css
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artdotagency | Strategic Creative Solutions",
  description: "Midlands based marketers & entrepreneurs elevating brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // 2. Inject the font variable and global background classes
        className={`${kamerick.variable} font-kamerick bg-black text-white antialiased overflow-x-hidden`}
      >
        <SmoothScroll>

        {children}
        
        </SmoothScroll>
      </body>
    </html>
  );
}