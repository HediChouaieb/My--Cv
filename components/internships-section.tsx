"use client"

import { Reveal } from "./reveal"
import { SectionLabel } from "./section-label"

const experiences = [
  {
    position: "Cybersecurity & AI Engineering Intern",
    company: "Tunisian Cloud",
    year: "2026",
    description:
      "Developed an AI-Driven Vulnerability Management Platform. Designed and implemented a containerized microservices architecture with Go backend services and Python AI modules. Built a responsive Angular frontend with PostgreSQL databases. Deployed using Docker with AI-powered vulnerability analysis and remediation recommendations.",
    tech: ["Go", "Python", "Angular", "PostgreSQL", "Docker", "Microservices"],
  },
  {
    position: "Web Application Pentest Intern",
    company: "Doxso Technologies",
    year: "2026",
    description:
      "Performed full penetration testing on real-world web applications. Identified critical vulnerabilities including XSS (CVSS 8.8) and injection flaws. Delivered professional security audit reports with remediation strategies.",
    tech: ["Burp Suite", "OWASP ZAP", "Kali Linux", "Metasploit"],
  },
  {
    position: "Full Stack Developer Intern",
    company: "FlexiFleetTech",
    year: "2025",
    description:
      "Developed a vehicle reservation and fleet management web application. Built frontend with Next.js and backend services with Laravel. Designed and integrated RESTful APIs for booking, vehicle management, and user operations.",
    tech: ["Next.js", "Laravel", "MySQL", "REST APIs"],
  },
  {
    position: "WordPress Developer Intern",
    company: "Vision Software & Services",
    year: "2024",
    description:
      "Developed a custom WordPress plugin integrating AI-powered content generation capabilities. Implemented automated page content creation using AI APIs. Participated in plugin testing, debugging, and deployment.",
    tech: ["WordPress", "PHP", "AI APIs"],
  },
]

export function InternshipsSection() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-background scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <Reveal>
            <SectionLabel index="03" label="Experience" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Where I&apos;ve Worked
            </h2>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <Reveal key={exp.company} delay={index * 100}>
                <div className="flex items-start gap-6 md:gap-10">
                  <div className="relative flex-shrink-0 w-0 md:w-16 pt-6">
                    <div className="hidden md:block absolute left-0 top-7 w-3 h-3 rounded-full border-2 border-foreground bg-background" />
                  </div>

                  <div className="flex-1 py-6 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.position}
                        </h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground/60 shrink-0">
                        {exp.year}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}