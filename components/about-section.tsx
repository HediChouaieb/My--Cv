"use client"

import { Terminal, Shield, Code, Zap } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"
import { AnimatedCounter } from "./animated-counter"

const stats = [
  { key: "years_exp", value: 3, suffix: "+", label: "Years" },
  { key: "projects", value: 15, suffix: "+", label: "Projects" },
  { key: "vulns_found", value: 10, suffix: "+", label: "CVEs" },
  { key: "uptime", value: 100, suffix: "%", label: "Delivery" },
]

const techStack = [
  { name: "Next.js", type: "framework" },
  { name: "React", type: "library" },
  { name: "Node.js", type: "runtime" },
  { name: "TypeScript", type: "language" },
  { name: "Supabase", type: "database" },
  { name: "Laravel", type: "framework" },
]

export function AboutSection() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2 })

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm text-accent">~/about</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Terminal-style info card */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-2">profile.json</span>
              </div>

              <div className="p-6 font-mono text-sm space-y-2">
                <div className="text-muted-foreground">{"{"}</div>
                <div className="pl-4">
                  <span className="text-accent">"name"</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">"Hedi Chouaieb"</span>
                  <span className="text-muted-foreground">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-accent">"role"</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">"Full Stack Developer"</span>
                  <span className="text-muted-foreground">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-accent">"specialty"</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">"Web Security & Pentesting"</span>
                  <span className="text-muted-foreground">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-accent">"focus"</span>
                  <span className="text-muted-foreground">: [</span>
                </div>
                <div className="pl-8 text-foreground">"Secure Applications",</div>
                <div className="pl-8 text-foreground">"Clean Architecture",</div>
                <div className="pl-8 text-foreground">"Performance Optimization"</div>
                <div className="pl-4 text-muted-foreground">]</div>
                <div className="text-muted-foreground">{"}"}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1.5 bg-secondary/50 border border-border rounded font-mono text-xs text-foreground hover:border-accent/50 hover:text-accent transition-all duration-300 cursor-default ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 50}ms` }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stats and description */}
          <div className="space-y-8">
            <p
              className={`text-muted-foreground leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              I'm a full stack developer who writes code that's both secure and scalable. With experience in penetration
              testing and OWASP methodologies, I build applications that don't just work — they're built to withstand
              real-world threats.
            </p>

            <div
              className={`bg-card border border-border rounded-lg p-4 font-mono text-sm transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-muted-foreground mb-3">
                <span className="text-accent">$</span> cat stats.log
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.key}
                    className="flex items-baseline gap-2"
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <span className="text-muted-foreground">{stat.key}:</span>
                    <span className="text-accent text-lg font-bold">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { icon: Code, text: "Production-grade applications with Next.js, React, Node.js" },
                { icon: Shield, text: "Security-first development with OWASP best practices" },
                { icon: Zap, text: "Performance-optimized, scalable architecture" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
