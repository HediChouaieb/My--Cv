"use client"

import { ArrowUp } from "lucide-react"
import { useIntersectionObserver } from "./use-intersection-observer"

export function Footer() {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.3 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={ref} className="py-12 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-sm font-medium text-foreground">
            Hedi Chouaieb
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hedi Chouaieb. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Built with Next.js
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}