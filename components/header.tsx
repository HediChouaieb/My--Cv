"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks.map((link) => link.href.slice(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Hedi Chouaieb<span className="text-foreground/40">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                activeSection === link.href.slice(1)
                  ? "text-foreground bg-secondary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Button
            asChild
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 h-9 text-sm font-medium transition-all duration-200"
          >
            <a href="#contact" className="flex items-center gap-1.5">
              Let&apos;s Talk
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground bg-secondary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-4px)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 px-4 py-3 bg-foreground text-background text-sm font-medium rounded-xl text-center transition-all duration-200"
              style={{
                transitionDelay: isMenuOpen ? `${navLinks.length * 40}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(-4px)",
              }}
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
