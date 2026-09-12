"use client"

import { ArrowUpRight } from "lucide-react"
import { Reveal } from "./reveal"

const projects = [
  {
    title: "ProClimaTechnique",
    year: "2026",
    role: "Freelance Developer",
    description:
      "Business website for HVAC and event air conditioning rental services. Online reservation system integrated with WhatsApp for direct customer inquiries and bookings. Dynamic booking forms with automated data collection.",
    tech: ["Next.js", "Tailwind", "WhatsApp API"],
    link: "https://www.proclimatechnique.com/en",
    accent: "from-slate-100 to-slate-200",
  },
  {
    title: "ApplyFlow",
    year: "2026",
    role: "Freelance Developer",
    description:
      "Lead generation and outreach platform that helps users discover business leads, organize prospects, and create personalized outreach emails using AI. Features Google Places API integration for business discovery.",
    tech: ["Next.js", "Tailwind", "shadcn/ui", "Google Places API", "AI"],
    link: "https://applyflow.dardigital.tn/",
    accent: "from-slate-100 to-zinc-200",
  },
  {
    title: "ERP — Stock & Sales",
    year: "2026",
    role: "Product Engineer",
    description:
      "Enterprise distribution management system for stock management, product tracking, sales, and wholesale operations. Features POS, inventory, accounting, multi-language support, and real-time data.",
    tech: ["Next.js", "Supabase", "Tailwind", "shadcn/ui"],
    link: "https://erp.dardigital.tn/auth/sign-in",
    accent: "from-zinc-100 to-slate-200",
  },
  {
    title: "POD Magasin",
    year: "2026",
    role: "Product Engineer",
    description:
      "Grocery store management and administration application with tracking tools, inventory management, and sales monitoring. Currently in active development.",
    tech: ["Next.js", "Supabase", "Tailwind", "shadcn/ui"],
    link: "https://pod-magasin.vercel.app/login?callback=%2F",
    accent: "from-slate-50 to-slate-200",
  },
  {
    title: "Presentini",
    year: "2026",
    role: "Freelance Developer",
    description:
      "Premium presentation studio platform for creating and managing professional presentations, pitch decks, and PFE designs. Features template browsing, contact forms, and order management.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://presentini.vercel.app/",
    accent: "from-neutral-100 to-slate-200",
  },
  {
    title: "Tasaddak",
    year: "2026",
    role: "Solo Developer",
    description:
      "Charity marketplace connecting donors with people in need. Users can post items they no longer use and receivers only pay for delivery. Facilitates giving and receiving everyday items like clothing.",
    tech: ["React", "Vite", "Tailwind"],
    link: "https://tasaddak.vercel.app/",
    accent: "from-slate-100 to-neutral-200",
  },
  {
    title: "Hideya",
    year: "2026",
    role: "Solo Developer",
    description:
      "Quran reading and listening application with tafsir, audio recitation from multiple reciters, hadith search, and interactive fatwa features. Modern, responsive interface with RTL support.",
    tech: ["Next.js", "Tailwind", "PWA"],
    link: "https://hideya.vercel.app/",
    accent: "from-neutral-100 to-slate-100",
  },
  {
    title: "SortTruck",
    year: "2026",
    role: "Full Stack Engineer",
    description:
      "Real-time bus tracking application for a transport company in Sfax. Enables live vehicle localization, route monitoring, schedule management, and push notifications for passengers.",
    tech: ["Next.js", "Tailwind", "Supabase", "Leaflet", "PWA"],
    link: "https://sorttruck.vercel.app/",
    accent: "from-slate-50 to-zinc-200",
  },
]

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  return (
    <div
      className={`relative aspect-[16/10] bg-gradient-to-br ${project.accent} overflow-hidden`}
    >
      <div className="absolute top-0 left-0 right-0 h-9 bg-white/80 backdrop-blur border-b border-black/5 flex items-center px-4 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="max-w-xs">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black/70 leading-tight mb-3">
            {project.title}
          </div>
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-black/10 w-3/4" />
            <div className="h-2 rounded-full bg-black/10 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-background scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <Reveal>
              <span className="text-sm font-medium text-muted-foreground mb-4 block">
                Work
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Selected Projects
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="text-muted-foreground max-w-sm">
              A collection of products and platforms I&apos;ve built — from
              enterprise systems to social-impact apps.
            </p>
          </Reveal>
        </div>

        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index % 2 === 0 ? 0 : 120}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
                className="group block bg-card border border-[#EEEEEE] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-soft-hover hover:-translate-y-1 hover:border-[#E2E2E2]"
              >
                <div className="overflow-hidden">
                  <div className="project-image transition-transform duration-500 ease-out">
                    <ProjectPreview project={project} />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-black/70 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <span className="text-sm text-muted-foreground/60">
                          {project.year}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {project.role}
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-full border border-[#EEEEEE] flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-secondary shrink-0 transition-all duration-300 group-hover:scale-110">
                      <ArrowUpRight className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}