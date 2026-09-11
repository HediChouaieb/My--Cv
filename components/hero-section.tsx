"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react"

const quickLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Hedi-Chouaieb-git" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:hadichouaieb20@gmail.com" },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,0,0,0.03), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-16">
        <div
          className={`flex justify-center mb-12 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#EEEEEE] shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm text-muted-foreground">Available for new projects</span>
          </div>
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.03em] leading-[1.04] text-foreground mb-7 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Hi, I&apos;m<br />
          <span className="text-muted-foreground/70">Hedi Chouaieb.</span>
        </h1>

        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed mb-11 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Full Stack Developer &amp; Security Pentester building secure,
          thoughtful digital experiences.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-32 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 text-sm font-medium transition-all duration-300"
          >
            <a href="#projects" className="flex items-center gap-2">
              View My Work
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-sm font-medium border-border bg-white/60 hover:bg-white transition-all duration-300"
          >
            <a href="/HadiChouaieb.pdf" download className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </Button>
        </div>

        <div
          className={`flex items-center justify-center gap-6 transition-all duration-700 delay-400 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#about"
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-all duration-300 group ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2.5">
            <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border border-current flex items-start justify-center pt-2">
              <ArrowDown className="w-3 h-3 animate-bounce" />
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}