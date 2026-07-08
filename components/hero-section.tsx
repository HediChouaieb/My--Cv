"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Terminal, ChevronRight } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState("")

  const fullText = "Building secure & scalable applications"

  useEffect(() => {
    setIsLoaded(true)
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)
    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let currentMouseX = 0
    let currentMouseY = 0
    const spacing = 15
    const streaks: Array<{
      x: number
      y: number
      speed: number
      length: number
      brightness: number
    }> = []

    const isDark = () => document.documentElement.classList.contains("dark")
    const trailColor = () => (isDark() ? "rgba(0, 0, 0, 0.07)" : "rgba(255, 255, 255, 0.15)")

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const cols = Math.floor(canvas.width / spacing)
      streaks.length = 0
      for (let i = 0; i < cols; i++) {
        streaks.push({
          x: i * spacing + Math.random() * 10,
          y: Math.random() * -canvas.height,
          speed: 2 + Math.random() * 4,
          length: 5 + Math.floor(Math.random() * 15),
          brightness: 0.3 + Math.random() * 0.7,
        })
      }
    }

    const ease = 0.08

    const draw = () => {
      currentMouseX += (mouseRef.current.x - currentMouseX) * ease
      currentMouseY += (mouseRef.current.y - currentMouseY) * ease

      const offsetX = (currentMouseX - window.innerWidth / 2) / (window.innerWidth / 2)
      const offsetY = (currentMouseY - window.innerHeight / 2) / (window.innerHeight / 2)

      ctx.fillStyle = trailColor()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const dark = isDark()

      streaks.forEach((streak) => {
        const x = streak.x + offsetX * 40
        const dist = Math.hypot(currentMouseX - x, streak.y)
        const proximity = Math.max(0, 1 - dist / 400)
        const speed = streak.speed + proximity * 6
        const alpha = Math.min(1, streak.brightness + proximity * 0.8)

        streak.y += speed

        const startY = streak.y
        const endY = streak.y - streak.length * spacing * 0.3

        for (let j = 0; j < streak.length; j++) {
          const py = startY - j * spacing * 0.3
          const fade = 1 - j / streak.length
          const size = Math.max(0.5, 2.5 - j * 0.15)

          ctx.beginPath()
          ctx.arc(x, py, size, 0, Math.PI * 2)
          ctx.fillStyle = dark
            ? `rgba(74, 222, 128, ${alpha * fade * 0.8})`
            : `rgba(0, 0, 0, ${alpha * fade * 0.5})`
          ctx.fill()
        }

        if (streak.y > canvas.height + 100) {
          streak.y = Math.random() * -50
          streak.speed = 2 + Math.random() * 4
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    resizeCanvas()
    draw()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border border-accent/30 bg-card/80 backdrop-blur-sm mb-8 font-mono text-xs transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="w-2 h-2 bg-accent rounded-full pulse-glow" />
          <span className="text-muted-foreground">[status]</span>
          <span className="text-accent">available_for_hire</span>
        </div>

        <div
          className={`mb-4 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-accent text-lg">{">"}</span>
          <span className="font-mono text-muted-foreground text-lg ml-2">whoami</span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight mb-4 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono">Hedi Chouaieb</span>
        </h1>

        <div
          className={`flex items-center justify-center gap-3 mb-6 font-mono text-lg md:text-xl transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-accent">Full Stack Developer</span>
          <span className="text-muted-foreground">//</span>
          <span className="text-accent">Security Pentester</span>
        </div>

        <div
          className={`h-8 mb-10 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-mono text-muted-foreground">
            <span className="text-accent">$</span> {typedText}
            <span className="cursor-blink text-accent">_</span>
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MagneticButton>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono px-8 shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300"
            >
              <a href="#projects" className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                view_projects
                <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border hover:border-accent/50 hover:bg-accent/5 px-8 bg-transparent backdrop-blur-sm font-mono transition-all duration-300"
            >
              <a href="/HadiChouaieb.pdf" download className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                download_cv
              </a>
            </Button>
          </MagneticButton>
        </div>

        <a
          href="#about"
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent transition-all duration-300 group ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">scroll</span>
            <div className="w-5 h-8 rounded-full border border-current flex justify-center pt-2">
              <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
