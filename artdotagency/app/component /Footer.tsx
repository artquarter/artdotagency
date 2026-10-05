import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilityNav } from "../lib/site";

const company = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Enquire", href: "/enquire" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/privacy#cookies" },
];

const social = [
  { label: "Instagram", href: "https://www.instagram.com/artdotagency" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61578248177400" },
  { label: "TikTok", href: "https://www.tiktok.com/@artdotagency_" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-alabaster/10 bg-void">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24 pb-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 flex flex-col gap-8">
            <p className="font-kamerick text-2xl md:text-3xl leading-tight text-alabaster text-balance">
              Funding, research and impact consultancy for cultural and community organisations.
            </p>
            <Link
              href="/enquire"
              className="group inline-flex w-fit items-center gap-2 text-base text-neonlime hover:text-alabaster transition-colors"
            >
              Start an enquiry
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <nav aria-label="What we do" className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-alabaster/45 mb-6">What we do</h2>
            <ul className="flex flex-col gap-3">
              {capabilityNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-alabaster/75 hover:text-neonlime transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-alabaster/45 mb-6">Company</h2>
            <ul className="flex flex-col gap-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-alabaster/75 hover:text-neonlime transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-alabaster/45 mb-6">Contact</h2>
            <address className="not-italic flex flex-col gap-3 text-sm text-alabaster/75">
              <a href="mailto:jordan.patel@artdotquarter.io" className="hover:text-neonlime transition-colors break-all">
                jordan.patel@artdotquarter.io
              </a>
            </address>
          </div>
        </div>

        <div className="mt-24 flex flex-col-reverse gap-6 border-t border-alabaster/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-alabaster/45">© {new Date().getFullYear()} Artdot Agency</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[...legal, ...social].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-xs text-alabaster/55 hover:text-neonlime transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-kamerick leading-[0.8] text-[22vw] text-alabaster/[0.035]"
      >
        artdot.
      </p>
    </footer>
  );
}
