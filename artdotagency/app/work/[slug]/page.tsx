import { caseStudies } from "../../lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. Make the component async
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. Await the params before using them
  const { slug } = await params; 
  
  const project = caseStudies.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Back Button */}
        <Link 
          href="/#work" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFB800] transition-colors mb-12 text-sm uppercase tracking-widest font-kamerick"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Work
        </Link>

        {/* HERO HEADER */}
        <div className="flex flex-col gap-6 mb-20 border-b border-white/10 pb-12">
          <span className="text-[#FFB800] text-xs md:text-sm tracking-[0.2em] uppercase font-kamerick">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter font-kamerick text-white">
            {project.client}
          </h1>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Stats */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-[#0F0F0F] border border-white/5 p-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-6 font-kamerick">Key Results</h3>
              <div className="flex flex-col gap-8">
                {project.stats.map((stat, i) => (
                  <div key={i}>
                    <span className="block text-4xl font-bold text-white mb-1 font-kamerick">{stat.value}</span>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider font-kamerick">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Story */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Story */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#FFB800] text-xs uppercase tracking-[0.2em] font-kamerick">The Story</h3>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-kamerick">
                {project.content.story}
              </p>
            </div>

            {/* Goal & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="text-[#FFB800] text-xs uppercase tracking-[0.2em] font-kamerick">The Goal</h3>
                <p className="text-white leading-relaxed font-kamerick text-sm md:text-base">
                  {project.content.goal}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-[#FFB800] text-xs uppercase tracking-[0.2em] font-kamerick">The Solution</h3>
                <p className="text-white leading-relaxed font-kamerick text-sm md:text-base">
                  {project.content.solution}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-4 bg-[#0A0A0A] p-8 md:p-12 border-l-2 border-[#FFB800]">
              <h3 className="text-[#FFB800] text-xs uppercase tracking-[0.2em] font-kamerick">The Outcome</h3>
              <p className="text-lg md:text-xl text-white leading-relaxed font-kamerick">
                {project.content.results}
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}