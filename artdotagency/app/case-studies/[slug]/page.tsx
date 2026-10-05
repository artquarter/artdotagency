import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHero from "../../component /PageHero";
import Reveal from "../../component /Reveal";
import EnquiryCTA from "../../component /home/EnquiryCTA";
import Footer from "../../component /Footer";
import { pageMetadata } from "../../lib/seo";
import { caseStudies } from "../../lib/data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return c ? pageMetadata(c.client, c.content?.brief ?? c.category, `/case-studies/${c.slug}`) : {};
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <main id="main" className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-32">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-alabaster/60 hover:text-neonlime">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All case studies
          </Link>
        </div>
        
        <PageHero 
          eyebrow={project.category}
          title={project.client} 
        />

        <section className="pb-24 md:pb-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            
            {/* MEDIA BLOCK */}
            <Reveal className="mb-20 overflow-hidden rounded-3xl border border-alabaster/10 aspect-video relative bg-alabaster/[0.02]">
              {project.video ? (
                <video src={project.video} autoPlay muted loop playsInline controls className="w-full h-full object-cover" />
              ) : project.image ? (
                <img src={project.image} alt={project.client} className="w-full h-full object-cover" />
              ) : null}
            </Reveal>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Left Column: Stats */}
              <div className="lg:col-span-4">
                <Reveal className="sticky top-32 rounded-3xl border border-alabaster/10 bg-alabaster/[0.02] p-8 md:p-10">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-neonlime mb-8">Key Results</h3>
                  <div className="flex flex-col gap-8">
                    {project.stats?.length ? (
                      project.stats.map((stat: any, i: number) => (
                        <div key={i}>
                          <span className="block font-sans font-semibold tabular-nums tracking-tight text-alabaster text-3xl md:text-4xl mb-2">{stat.value}</span>
                          <span className="block text-sm text-alabaster/60 leading-relaxed">{stat.label}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-alabaster/50 text-sm">Qualitative outcome mapping in progress.</div>
                    )}
                  </div>
                </Reveal>
              </div>

              {/* Right Column: The Story */}
              <div className="lg:col-span-8 flex flex-col gap-16">
                
                {/* The Brief */}
                <Reveal>
                  <h3 className="text-xs uppercase tracking-[0.25em] text-neonlime mb-6">The Original Brief</h3>
                  <p className="font-kamerick text-xl md:text-3xl text-alabaster leading-snug">
                    {project.content?.brief || "Detailed case study currently being updated."}
                  </p>
                </Reveal>

                {/* Role & Delivery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-alabaster/10 pt-16">
                  <Reveal>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-neonlime mb-6">Our Precise Role</h3>
                    <p className="text-alabaster/70 leading-relaxed text-lg text-pretty">
                      {project.content?.ourRole || "-"}
                    </p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-neonlime mb-6">What Actually Happened</h3>
                    <p className="text-alabaster leading-relaxed text-lg text-pretty">
                      {project.content?.workDelivered || "-"}
                    </p>
                  </Reveal>
                </div>
                
                {/* Credits */}
                <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-alabaster/10 pt-16">
                  <div>
                     <h3 className="text-xs uppercase tracking-[0.25em] text-alabaster/45 mb-3">Delivering Organisation</h3>
                     <p className="text-alabaster/80 text-base">{project.content?.deliveringOrganisation || "Artdot"}</p>
                  </div>
                  {project.content?.partners && (
                    <div>
                       <h3 className="text-xs uppercase tracking-[0.25em] text-alabaster/45 mb-3">Partners</h3>
                       <p className="text-alabaster/80 text-base">{project.content.partners}</p>
                    </div>
                  )}
                </Reveal>

              </div>
            </div>
          </div>
        </section>
        
        <EnquiryCTA />
      </main>
      <Footer />
    </>
  );
}
