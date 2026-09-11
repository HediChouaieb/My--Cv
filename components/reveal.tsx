"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out will-change-transform", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}