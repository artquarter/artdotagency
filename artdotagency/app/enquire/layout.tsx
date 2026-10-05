import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata(
  "Enquire About Funding, Research & Strategy Support",
  "Tell Artdot about your organisation, funding challenge or growth plans. Enquire about a diagnostic, research, impact evaluation or ongoing consultancy.",
  "/enquire",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
