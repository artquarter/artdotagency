import { pageMetadata } from "../lib/seo";
import PageHero from "../component /PageHero";
import Capabilities from "../component /home/Capabilities";
import ProblemsSolved from "../component /home/ProblemsSolved";
import EnquiryCTA from "../component /home/EnquiryCTA";
import Footer from "../component /Footer";

export const metadata = pageMetadata(
  "Consultancy Services for Cultural & Community Organisations",
  "Funding strategy, bid development, audience research, impact evaluation, business planning and community asset support for purpose-led organisations.",
  "/what-we-do",
);

export default function WhatWeDoPage() {
  return (
    <>
      <main id="main" className="relative z-10">
        <PageHero
          eyebrow="What we do"
          title="Consultancy for culture & community."
          intro="We develop funding strategies and bids, research audiences, evaluate impact and create business plans. Our work gives chief executives, trustees and senior teams the evidence and practical support to make decisions."
        />
        <Capabilities />
        <ProblemsSolved />
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
