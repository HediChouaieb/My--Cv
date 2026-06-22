"use client"

import { useState } from "react"
import { ExternalLink, Github, Folder, Terminal } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"

const projects = [
  {
    title: "Automated SocialMedia Videos Studio",
    year: "2026",
    description:
      "AI-powered system for automated short-form video generation (TikTok / Reels / YouTube Shorts). Features Google Gemini for script generation, Murf.ai for TTS voiceover, FFmpeg-based rendering, and Playwright for visual generation via Meta AI. TikTok API integration for direct publishing.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Gemini", "Murf.ai", "FFmpeg", "Playwright"],
    link: "#",
    github: "#",
  },
  {
    title: "ProClimaTechnique",
    year: "2026",
    description:
      "Business website for HVAC and event air conditioning rental services. Online reservation system integrated with WhatsApp for direct customer inquiries and bookings. Dynamic booking forms with automated data collection.",
    tech: ["Next.js", "WhatsApp API", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    title: "Tidy Patterns",
    year: "2025",
    description:
      "Scalable e-commerce platform for digital embroidery patterns. Implemented SSR/ISR for performance and SEO optimization. Integrated Stripe payments with webhook-based order processing.",
    tech: ["Next.js", "Stripe", "Supabase", "Tailwind"],
    link: "https://tidydevmode.vercel.app/",
    github: "#",
  },
  {
    title: "Microsoft Tech Club ISET Sfax",
    year: "2024 – 2025",
    description:
      "Developed event management and recruitment platforms using Next.js and Supabase. Built CyberTech Exchange, a cybersecurity learning platform with interactive courses and progress tracking.",
    tech: ["Next.js", "Supabase", "PostgreSQL"],
    link: "https://cybertechexchange.vercel.app/",
    github: "#",
  },
]

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm text-accent">~/projects</span>
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground tracking-tight">
            Personal Projects <span className="text-accent">&</span> Freelance
          </h2>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-accent">$</span> ls -la ./projects
          </p>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-card border border-border rounded-lg p-6 transition-all duration-500 hover:border-accent/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Folder className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-mono font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-secondary/50 rounded text-xs font-mono text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 md:mb-0 md:max-w-lg">{project.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-secondary/30 text-muted-foreground rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs font-mono bg-secondary/30 text-muted-foreground rounded border border-border">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <a
                      href={project.github}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.link}
                      className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-all duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
