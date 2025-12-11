"use client"

import { useState } from "react"
import { ExternalLink, Github, Folder, Terminal } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"

const projects = [
  {
    title: "Tidy Patterns",
    description: "E-commerce platform for digital embroidery patterns with admin dashboard and Stripe integration.",
    tech: ["Next.js", "Supabase", "Stripe", "Tailwind"],
    type: "web",
    link: "https://tidydevmode.vercel.app/",
    github: "#",
  },
  {
    title: "CyberTech Exchange",
    description: "Cybersecurity learning platform with interactive courses and progress tracking.",
    tech: ["Next.js", "PostgreSQL", "ShadCN"],
    type: "web",
    link: "https://cybertechexchange.vercel.app/",
    github: "#",
  },
  {
    title: "Café Management",
    description: "Desktop application for order management, inventory tracking, and reporting.",
    tech: ["Electron", "Next.js", "SQLite"],
    type: "desktop",
    link: "#",
    github: "#",
  },

  {
    title: "Car Rental Platform",
    description: "Full-stack rental solution with real-time availability and booking system.",
    tech: ["Next.js", "Laravel", "MySQL"],
    type: "web",
    link: "#",
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
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground tracking-tight">Selected Work</h2>
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
                      {project.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 md:mb-0 md:max-w-lg">{project.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-secondary/30 text-muted-foreground rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
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

              {/* Hover indicator line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-all duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        <div
          className={`mt-8 font-mono text-sm text-muted-foreground transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent">$</span> echo "More projects on GitHub..."
        </div>
      </div>
    </section>
  )
}
