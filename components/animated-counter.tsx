"use client"

import { useEffect, useState } from "react"
import { useIntersectionObserver } from "./use-intersection-observer"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, suffix = "", duration = 2000, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({ threshold: 0.5 })

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
