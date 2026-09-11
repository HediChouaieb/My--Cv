"use client"

import type React from "react"
import { useState } from "react"
import { Github, Linkedin, Mail, Youtube, Facebook, CheckCircle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useIntersectionObserver } from "./use-intersection-observer"
import { SectionLabel } from "./section-label"

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Hedi-Chouaieb-git" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@MR.CyberNet" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/HadiTechLab" },
  { icon: Mail, label: "Email", href: "mailto:hadichouaieb20@gmail.com" },
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
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex justify-center">
            <SectionLabel index="06" label="Contact" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Let&apos;s build something great together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div
              className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-border transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                  {social.label}
                </a>
              ))}
            </div>

            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                I&apos;m always open to new opportunities and collaborations.
                Whether you have a project in mind or want to discuss security
                for your application, feel free to reach out.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Available for freelance work</span>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 relative">
                {isSubmitted && (
                  <div className="absolute inset-0 bg-card/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                    <div className="text-center">
                      <CheckCircle className="w-10 h-10 text-foreground mx-auto mb-3" />
                      <p className="font-medium text-foreground">Message sent!</p>
                      <p className="text-sm text-muted-foreground mt-1">I&apos;ll respond within 24h</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-foreground font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="h-11 rounded-xl bg-background border-border focus:border-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-11 rounded-xl bg-background border-border focus:border-foreground"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-foreground font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    className="rounded-xl bg-background border-border min-h-[120px] resize-none focus:border-foreground"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4 ml-1" />
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
