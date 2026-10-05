import type { Metadata } from "next";

export const SITE_URL = "https://www.artdotagency.io";
export const SITE_NAME = "Artdot Agency";
export const HOME_TITLE = "Funding, Research & Impact Consultancy";
export const SITE_DESCRIPTION =
  "Artdot helps cultural organisations, charities and community groups develop funding bids, research audiences, measure impact and plan sustainable growth.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
