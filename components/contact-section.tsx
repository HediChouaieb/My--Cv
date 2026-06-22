"use client"

import type React from "react"
import { useState } from "react"
import { Send, Github, Linkedin, Mail, Youtube, Facebook, Terminal, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useIntersectionObserver } from "./use-intersection-observer"

const socials = [
  { icon: Github, label: "github", href: "https://github.com/Hedi-Chouaieb-git" },
  { icon: Linkedin, label: "linkedin", href: "https://linkedin.com" },
  { icon: Youtube, label: "youtube", href: "https://www.youtube.com/@MR.CyberNet" },
  { icon: Facebook, label: "facebook", href: "https://www.facebook.com/HadiTechLab" },
  { icon: Mail, label: "email", href: "mailto:hadichouaieb20@gmail.com" },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <Terminal className="w-4 h-4 text-accent" />
          <span className="font-mono text-sm text-accent">~/contact</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side */}
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold font-mono text-foreground tracking-tight mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Get In Touch
            </h2>

            <p
              className={`text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Have a project in mind or want to discuss security for your application? I'm always open to new
              opportunities and collaborations.
            </p>

            <div
              className={`bg-card border border-border rounded-lg p-4 font-mono text-sm space-y-2 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-muted-foreground">
                <span className="text-accent">$</span> cat socials.txt
              </div>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                  <span>@{social.label}</span>
                </a>
              ))}
            </div>

            <div
              className={`mt-6 flex items-center gap-3 font-mono text-sm transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-muted-foreground">
                <span className="text-accent">status:</span> available
              </span>
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                </div>
                <span className="font-mono text-xs text-muted-foreground ml-2">send_message.sh</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 relative">
                {isSubmitted && (
                  <div className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center font-mono">
                      <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
                      <p className="text-foreground">Message sent!</p>
                      <p className="text-xs text-muted-foreground">I'll respond within 24h</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-xs text-muted-foreground">
                    name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-background border-border font-mono text-sm focus:border-accent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-xs text-muted-foreground">
                    email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-background border-border font-mono text-sm focus:border-accent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono text-xs text-muted-foreground">
                    message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    className="bg-background border-border font-mono text-sm min-h-[100px] resize-none focus:border-accent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-mono text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      send_message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
