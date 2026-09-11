"use client"

import { Code, Shield, Zap } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"
import { AnimatedCounter } from "./animated-counter"
import { SectionLabel } from "./section-label"

const stats = [
  { key: "Years", value: 3, suffix: "+" },
  { key: "Projects", value: 15, suffix: "+" },
  { key: "CVEs", value: 10, suffix: "+" },
  { key: "Delivery", value: 100, suffix: "%" },
]

const techStack = [
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "Supabase",
  "Laravel",
  "Docker",
  "Kali Linux",
]

export function AboutSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <div
              className={`mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <SectionLabel index="01" label="About" />
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Building secure software with craft and care.
            </h2>

            <p
              className={`text-lg text-muted-foreground leading-relaxed mb-4 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              I&apos;m a full stack developer who writes code that&apos;s both secure
              and scalable. With experience in penetration testing and OWASP
              methodologies, I build applications that don&apos;t just work — they&apos;re
              built to withstand real-world threats.
            </p>

            <p
              className={`text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              From production-grade Next.js applications to security audits, I
              focus on the intersection of great user experience and robust
              security — without compromising on performance or maintainability.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Code, text: "Production-grade applications with Next.js, React, Node.js" },
                { icon: Shield, text: "Security-first development with OWASP best practices" },
                { icon: Zap, text: "Performance-optimized, scalable architecture" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-muted-foreground mt-1.5 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>

            <div
              className={`flex flex-wrap gap-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${700}ms` }}
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-background border border-border rounded-full text-sm text-muted-foreground transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:pt-24">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.key}
                  className={`bg-card border border-border rounded-2xl p-6 shadow-soft transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1500} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.key}</div>
                </div>
              ))}
            </div>

            <div
              className={`mt-4 bg-card border border-border rounded-2xl p-8 shadow-soft transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Key facts</h3>
              <dl className="space-y-3">
                {[
                  { label: "Name", value: "Hedi Chouaieb" },
                  { label: "Role", value: "Full Stack Developer" },
                  { label: "Specialty", value: "Web Security & Pentesting" },
                  { label: "Focus", value: "Secure Applications" },
                ].map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-muted-foreground shrink-0">{fact.label}</dt>
                    <dd className="text-sm font-medium text-foreground text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}