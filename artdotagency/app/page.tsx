import HomeContent from "./component /HomeContent";
import { HOME_TITLE, SITE_DESCRIPTION, pageMetadata } from "./lib/seo";

export const metadata = pageMetadata(HOME_TITLE, SITE_DESCRIPTION, "/");

export default function Home() {
  return <HomeContent />;
}
