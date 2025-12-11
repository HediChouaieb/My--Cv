"use client"

import { useIntersectionObserver } from "./use-intersection-observer"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function AnimatedText({ text, className = "", delay = 0, as: Component = "span" }: AnimatedTextProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 })

  const words = text.split(" ")

  return (
    <Component ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${delay + wordIndex * 50}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  )
}
