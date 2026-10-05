import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata(
  "Content Creator Training Programme Register",
  "View attendance and completion records for the Content Creator Programme delivered by Art Quarter with South and City College Birmingham.",
  "/reports/content-creator-training",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
