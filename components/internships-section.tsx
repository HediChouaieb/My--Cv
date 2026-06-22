"use client"

import { useState } from "react"
import { ExternalLink, Github, Folder, Terminal, Building2 } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"

const internships = [
  {
    title: "Cybersecurity & AI Engineering Intern",
    company: "Tunisian Cloud",
    year: "2026",
    description:
      "Developed an AI-Driven Vulnerability Management Platform. Designed and implemented a containerized microservices architecture with Go backend services and Python AI modules. Built a responsive Angular frontend with PostgreSQL databases. Deployed using Docker with AI-powered vulnerability analysis and remediation recommendations.",
    tech: ["Go", "Python", "Angular", "PostgreSQL", "Docker", "Microservices"],
  },
  {
    title: "Web Application Pentest Intern",
    company: "Doxso Technologies",
    year: "2026",
    description:
      "Performed full penetration testing on real-world web applications. Identified critical vulnerabilities including XSS (CVSS 8.8) and injection flaws. Delivered professional security audit reports with remediation strategies.",
    tech: ["Burp Suite", "OWASP ZAP", "Kali Linux", "Metasploit"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "FlexiFleetTech",
    year: "2025",
    description:
      "Developed a vehicle reservation and fleet management web application. Built frontend with Next.js and backend services with Laravel. Designed and integrated RESTful APIs for booking, vehicle management, and user operations.",
    tech: ["Next.js", "Laravel", "MySQL", "REST APIs"],
  },
  {
    title: "WordPress Developer Intern",
    company: "Vision Software & Services, Sfax",
    year: "2024",
    description:
      "Developed a custom WordPress plugin integrating AI-powered content generation capabilities. Implemented automated page content creation using AI APIs. Participated in plugin testing, debugging, and deployment.",
    tech: ["WordPress", "PHP", "AI APIs"],
  },
]

export function InternshipsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="internships" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm text-accent">~/internships</span>
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-foreground tracking-tight">
            Internship <span className="text-accent">Experience</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-accent">$</span> cat internships.log
          </p>
        </div>

        <div className="space-y-4">
          {internships.map((internship, index) => (
            <div
              key={internship.title}
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
                    <Building2 className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-mono font-semibold text-foreground group-hover:text-accent transition-colors">
                      {internship.title}
                    </h3>
                    <span className="px-2 py-0.5 bg-secondary/50 rounded text-xs font-mono text-muted-foreground">
                      {internship.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-accent">@ {internship.company}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 md:mb-0 md:max-w-lg">{internship.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {internship.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-secondary/30 text-muted-foreground rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
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
