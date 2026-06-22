"use client"

import { Github, Linkedin, Mail, Youtube, Facebook, ArrowUp, Terminal } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"

const socialLinks = [
  { icon: Github, href: "https://github.com/Hedi-Chouaieb-git", label: "github" },
  { icon: Linkedin, href: "https://linkedin.com", label: "linkedin" },
  { icon: Youtube, href: "https://www.youtube.com/@MR.CyberNet", label: "youtube" },
  { icon: Facebook, href: "https://www.facebook.com/HadiTechLab", label: "facebook" },
  { icon: Mail, href: "mailto:hadichouaieb20@gmail.com", label: "email" },
]

export function Footer() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.3 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={ref} className="py-12 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#" className="flex items-center gap-2 font-mono text-sm text-foreground">
              <Terminal className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">~/</span>
              <span className="text-accent">hedi-chouaieb</span>
            </a>
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-accent">$</span> echo "Built with Next.js & Tailwind"
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`flex items-center gap-2 px-3 py-2 bg-card border border-border rounded font-mono text-xs text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <social.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{social.label}</span>
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded font-mono text-xs text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>top</span>
          </button>
        </div>

        <div
          className={`mt-8 pt-6 border-t border-border text-center transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-accent">//</span> © {new Date().getFullYear()} Hedi Chouaieb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
