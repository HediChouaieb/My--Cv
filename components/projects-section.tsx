"use client"

import { ArrowUpRight } from "lucide-react"
import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

const projects = [
  {
    title: "ProClimaTechnique",
    year: "2026",
    role: "Freelance Developer",
    type: "Business Website",
    description:
      "Business website for HVAC and event air conditioning rental services. Online reservation system integrated with WhatsApp for direct customer inquiries and bookings. Dynamic booking forms with automated data collection.",
    tech: ["Next.js", "Tailwind", "WhatsApp API"],
    link: "https://www.proclimatechnique.com/en",
    accent: "from-white to-[#EFF1F3]",
  },
  {
    title: "ApplyFlow",
    year: "2026",
    role: "Freelance Developer",
    type: "SaaS Platform",
    description:
      "Lead generation and outreach platform that helps users discover business leads, organize prospects, and create personalized outreach emails using AI. Features Google Places API integration for business discovery.",
    tech: ["Next.js", "Tailwind", "shadcn/ui", "Google Places API", "AI"],
    link: "https://applyflow.dardigital.tn/",
    accent: "from-[#FAFAFB] to-[#EDEDF0]",
  },
  {
    title: "ERP — Stock & Sales",
    year: "2026",
    role: "Product Engineer",
    type: "Enterprise System",
    description:
      "Enterprise distribution management system for stock management, product tracking, sales, and wholesale operations. Features POS, inventory, accounting, multi-language support, and real-time data.",
    tech: ["Next.js", "Supabase", "Tailwind", "shadcn/ui"],
    link: "https://erp.dardigital.tn/auth/sign-in",
    accent: "from-white to-[#F0F0F2]",
  },
  {
    title: "POD Magasin",
    year: "2026",
    role: "Product Engineer",
    type: "Store Management",
    description:
      "Grocery store management and administration application with tracking tools, inventory management, and sales monitoring. Currently in active development.",
    tech: ["Next.js", "Supabase", "Tailwind", "shadcn/ui"],
    link: "https://pod-magasin.vercel.app/login?callback=%2F",
    accent: "from-[#FAFAFA] to-[#EDEEE9]",
  },
  {
    title: "Presentini",
    year: "2026",
    role: "Freelance Developer",
    type: "Studio Platform",
    description:
      "Premium presentation studio platform for creating and managing professional presentations, pitch decks, and PFE designs. Features template browsing, contact forms, and order management.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://presentini.vercel.app/",
    accent: "from-[#FAFAFC] to-[#EEEFF4]",
  },
  {
    title: "Tasaddak",
    year: "2026",
    role: "Solo Developer",
    type: "Charity Marketplace",
    description:
      "Charity marketplace connecting donors with people in need. Users can post items they no longer use and receivers only pay for delivery. Facilitates giving and receiving everyday items like clothing.",
    tech: ["React", "Vite", "Tailwind"],
    link: "https://tasaddak.vercel.app/",
    accent: "from-[#FBFAF9] to-[#F1EEEB]",
  },
  {
    title: "Hideya",
    year: "2026",
    role: "Solo Developer",
    type: "Mobile-first App",
    description:
      "Quran reading and listening application with tafsir, audio recitation from multiple reciters, hadith search, and interactive fatwa features. Modern, responsive interface with RTL support.",
    tech: ["Next.js", "Tailwind", "PWA"],
    link: "https://hideya.vercel.app/",
    accent: "from-[#F9FAFC] to-[#EDF0F4]",
  },
  {
    title: "SortTruck",
    year: "2026",
    role: "Full Stack Engineer",
    type: "Live Tracking",
    description:
      "Real-time bus tracking application for a transport company in Sfax. Enables live vehicle localization, route monitoring, schedule management, and push notifications for passengers.",
    tech: ["Next.js", "Tailwind", "Supabase", "Leaflet", "PWA"],
    link: "https://sorttruck.vercel.app/",
    accent: "from-white to-[#EDEEF1]",
  },
]

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function ProjectPreview({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F5] p-3 sm:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#E4E4E4] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="absolute top-0 inset-x-0 z-10 h-8 bg-white border-b border-[#ECECEC] flex items-center px-3 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D8D8D8]" />
          <span className="w-2 h-2 rounded-full bg-[#D8D8D8]" />
          <span className="w-2 h-2 rounded-full bg-[#D8D8D8]" />
          <span className="ml-2 flex-1 hidden sm:block">
            <span className="block mx-auto max-w-[200px] h-4 rounded-full bg-[#F0F0F0] px-3 text-center text-[10px] leading-4 text-black/45 truncate">
              {domain(project.link)}
            </span>
          </span>
        </div>

        <div className={`absolute inset-0 top-8 bg-gradient-to-br ${project.accent}`}>
          <div className="absolute -right-10 -bottom-16 w-52 h-52 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute -left-8 -top-10 w-40 h-40 rounded-full bg-white/50 blur-3xl" />

          <span
            className="absolute bottom-2 right-5 text-[52px] font-bold tracking-tight text-black/[0.07] select-none"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute inset-x-6 top-6 bottom-5 sm:inset-x-8 sm:top-7 flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/70">
                {project.type}
              </span>
              <span className="font-mono text-[11px] font-medium text-black/50">
                {project.year}
              </span>
            </div>

            <h4 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] leading-tight max-w-[320px]">
              {project.title}
            </h4>

            <div className="mt-3 space-y-2 max-w-[260px]">
              <div className="h-2 rounded-full bg-black/15 w-full" />
              <div className="h-2 rounded-full bg-black/10 w-3/4" />
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2.5">
              <div className="rounded-lg border border-black/[0.07] bg-white/70 backdrop-blur-sm p-3">
                <div className="mb-1.5 h-5 w-14 rounded bg-black/15" />
                <div className="h-1.5 w-16 rounded-full bg-black/10" />
              </div>
              <div className="rounded-lg border border-black/[0.07] bg-white/70 backdrop-blur-sm p-3">
                <div className="mb-1.5 h-5 w-12 rounded bg-black/15" />
                <div className="h-1.5 w-14 rounded-full bg-black/10" />
              </div>
            </div>
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
        <div className="mb-20 md:mb-28">
          <SectionLabel index="02" label="Work" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <Reveal delay={80}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Selected Projects
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-muted-foreground max-w-sm">
                A collection of products and platforms I&apos;ve built — from
                enterprise systems to social-impact apps.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="space-y-24 md:space-y-36">
          {projects.map((project, index) => {
            const flip = index % 2 === 1
            return (
              <article key={project.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal y={32} className={flip ? "lg:order-2" : ""}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="group block transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className="project-image transition-all duration-500">
                      <div className="rounded-2xl shadow-soft group-hover:shadow-soft-hover transition-shadow duration-500">
                        <ProjectPreview project={project} index={index} />
                      </div>
                    </div>
                  </a>
                </Reveal>

                <div className={flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}>
                  <Reveal delay={140}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-xs font-medium text-muted-foreground/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{project.role}</p>

                    <p className="text-muted-foreground leading-relaxed max-w-md lg:text-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      View project
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}