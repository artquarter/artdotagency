"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";
import Navbar from "./Navbar";
import WebGLBackground from "./WebGLBackground";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/portal") return <>{children}</>;

  return (
    <SmoothScroll>
      <WebGLBackground />
      <Navbar />
      {children}
    </SmoothScroll>
  );
}
