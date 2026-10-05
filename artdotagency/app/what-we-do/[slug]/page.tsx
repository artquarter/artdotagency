import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PageHero from "../../component /PageHero";
import Reveal from "../../component /Reveal";
import EnquiryCTA from "../../component /home/EnquiryCTA";
import Footer from "../../component /Footer";
import { pageMetadata, SITE_URL } from "../../lib/seo";
import { capabilities } from "../../lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = capabilities.find((x) => x.slug === slug);
  return c ? pageMetadata(`${c.title} Consultancy`, c.summary, `/what-we-do/${c.slug}`) : {};
}

export default async function CapabilityPage({ params }: Params) {
  const { slug } = await params;
  const index = capabilities.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const c = capabilities[index];
  const next = capabilities[(index + 1) % capabilities.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${c.title} Consultancy`,
          description: c.summary,
          serviceType: c.title,
          url: `${SITE_URL}/what-we-do/${c.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
        }).replace(/</g, "\\u003c") }}
      />
      <main id="main" className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32">
          <Link href="/what-we-do" className="inline-flex items-center gap-2 text-sm text-alabaster/60 hover:text-neonlime">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All capabilities
          </Link>
        </div>
        <PageHero eyebrow={`Capability ${String(index + 1).padStart(2, "0")}`} title={c.title} intro={c.summary} />

        <section className="pb-24 md:pb-40">
          <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-2 md:px-10">
            <Reveal>
              <h2 className="mb-8 text-xs uppercase tracking-[0.25em] text-neonlime">When leaders call us</h2>
              <ul className="flex flex-col border-t border-alabaster/10">
                {c.questions.map((q) => (
                  <li key={q} className="border-b border-alabaster/10 py-6 font-kamerick text-xl md:text-2xl leading-snug text-alabaster">
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-8 text-xs uppercase tracking-[0.25em] text-neonlime">What you receive</h2>
              <ul className="flex flex-col border-t border-alabaster/10">
                {c.outputs.map((o) => (
                  <li key={o} className="border-b border-alabaster/10 py-6 text-lg text-alabaster/80">
                    {o}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-base leading-relaxed text-alabaster/60">
                Most organisations start with a{" "}
                <Link href="/how-we-work" className="text-neonlime underline-offset-4 hover:underline">
                  Growth and Funding Diagnostic
                </Link>{" "}
                so the work is scoped around evidence, not assumption.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Link
            href={`/what-we-do/${next.slug}`}
            className="group flex items-center justify-between border-y border-alabaster/10 py-10"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.25em] text-alabaster/45">Next capability</span>
              <span className="mt-3 block font-kamerick text-2xl md:text-4xl text-alabaster group-hover:text-neonlime transition-colors">
                {next.title}
              </span>
            </span>
            <ArrowUpRight aria-hidden className="h-8 w-8 text-alabaster/60 group-hover:text-neonlime" />
          </Link>
        </div>

        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
