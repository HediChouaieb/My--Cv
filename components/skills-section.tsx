"use client"

import { useIntersectionObserver } from "./use-intersection-observer"
import { Youtube, Facebook, Film, Users, GraduationCap } from "lucide-react"
import { SectionLabel } from "./section-label"

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "PHP", "SQL", "Python"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "ShadCN UI"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Laravel", "REST APIs", "GraphQL"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "Supabase", "MySQL", "SQLite"],
  },
  {
    title: "Security",
    skills: ["Burp Suite", "OWASP", "Kali Linux", "Nmap"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Git", "CI/CD", "Vercel"],
  },
]

export function SkillsSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div
            className={`mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <SectionLabel index="05" label="Skills" />
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tight text-foreground transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Tech Stack &amp; Tools
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-soft-hover transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + categoryIndex * 60}ms` }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                {category.title}
              </h3>
              <div className="space-y-1.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-sm text-foreground"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <div
            className={`bg-card border border-border rounded-2xl p-8 shadow-soft transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="font-semibold text-foreground mb-6">Soft Skills</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "Communication", description: "Clear technical explanations" },
                { name: "Leadership", description: "Team coordination & mentoring" },
                { name: "Problem Solving", description: "Analytical thinking" },
                { name: "Coaching", description: "Knowledge transfer" },
              ].map((skill) => (
                <div key={skill.name} className="p-4 rounded-xl bg-secondary/50">
                  <div className="font-medium text-sm text-foreground mb-1">{skill.name}</div>
                  <div className="text-xs text-muted-foreground">{skill.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`bg-card border border-border rounded-2xl p-8 shadow-soft transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="font-semibold text-foreground mb-6">Content Creation</h3>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/@MR.CyberNet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Youtube className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground mb-0.5">YouTube</div>
                  <div className="text-xs text-muted-foreground mb-1">@MR.CyberNet</div>
                  <div className="text-xs text-muted-foreground">
                    Cybersecurity content, pentesting tutorials &amp; security best practices
                  </div>
                </div>
              </a>

              <a
                href="https://www.facebook.com/HadiTechLab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Facebook className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground mb-0.5">Facebook</div>
                  <div className="text-xs text-muted-foreground mb-1">HadiTechLab</div>
                  <div className="text-xs text-muted-foreground">
                    AI, development &amp; tech insights. Sharing knowledge about modern software engineering
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
                <Film className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">Content creator in cybersecurity &amp; tech</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
                <Users className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">Building a community around secure coding</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
                <GraduationCap className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">Sharing knowledge through tutorials &amp; posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}