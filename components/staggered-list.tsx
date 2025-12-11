"use client"

import { Children, type ReactNode } from "react"
import { useIntersectionObserver } from "./use-intersection-observer"

interface StaggeredListProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggeredList({ children, className = "", staggerDelay = 100 }: StaggeredListProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })
  const childArray = Children.toArray(children)

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => (
        <div
          key={index}
          className="transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
