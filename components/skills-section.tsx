"use client"

import { useIntersectionObserver } from "./use-intersection-observer"
import { Brain, Terminal, MessageCircle, Target, Puzzle, BookOpen } from "lucide-react"

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

const softSkills = [
  { name: "Communication", description: "Clear technical explanations", icon: MessageCircle },
  { name: "Leadership", description: "Team coordination & mentoring", icon: Target },
  { name: "Problem Solving", description: "Analytical thinking", icon: Puzzle },
  { name: "Coaching", description: "Knowledge transfer", icon: BookOpen },
]

export function SkillsSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm text-accent">~/skills</span>
        </div>

        <h2
          className={`text-3xl md:text-4xl font-bold font-mono text-foreground tracking-tight mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:border-accent/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + categoryIndex * 80}ms` }}
            >
              {/* Terminal header */}
              <div className="group flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-yellow-500 transition-colors" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-green-500 transition-colors" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-red-500 transition-colors" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{category.title.toLowerCase()}/</span>
              </div>

              {/* Skills list */}
              <div className="p-4 font-mono text-sm space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors cursor-default"
                    style={{ transitionDelay: `${300 + categoryIndex * 80 + skillIndex * 30}ms` }}
                  >
                    <span className="text-accent/60">-</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 font-mono text-sm text-muted-foreground transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent">{">"}</span> Continuously learning and adapting to new technologies
          <span className="cursor-blink text-accent ml-1">_</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3
              className={`text-lg font-semibold text-foreground mb-6 flex items-center gap-2 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Brain className="w-5 h-5 text-accent" />
              Soft Skills
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {softSkills.map((skill, index) => {
                const IconComponent = skill.icon
                return (
                  <div
                    key={skill.name}
                    className={`group p-5 bg-card border border-border rounded-xl transition-all duration-500 hover:border-accent/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors">
                      {skill.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{skill.description}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )}