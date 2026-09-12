import type React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function CyberInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn(
        "h-11 rounded-xl border-white/10 bg-slate-100 text-slate-900 shadow-none placeholder:text-slate-900 transition-colors",
        "focus-visible:border-violet-400/60 focus-visible:ring-violet-500/25",
        "aria-invalid:border-rose-500/50 aria-invalid:ring-rose-500/20",
        className,
      )}
      {...props}
    />
  )
}

export function CyberTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      className={cn(
        "rounded-xl border-white/10 bg-slate-100 text-slate-900 shadow-none placeholder:text-slate-900 transition-colors",
        "focus-visible:border-violet-400/60 focus-visible:ring-violet-500/25",
        "aria-invalid:border-rose-500/50 aria-invalid:ring-rose-500/20",
        className,
      )}
      {...props}
    />
  )
}

export function CyberLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn("mb-2 block text-sm font-medium text-slate-800", className)} {...props} />
}

export function ErrorText({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return <p className="mt-1.5 text-xs font-medium text-rose-400">{children}</p>
}

export function HintText({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return <p className="mt-1.5 text-xs leading-relaxed text-slate-900">{children}</p>
}

interface CyberFieldProps {
  label?: string
  htmlFor?: string
  hint?: React.ReactNode
  error?: string
  className?: string
  children: React.ReactNode
}

export function CyberField({ label, htmlFor, hint, error, className, children }: CyberFieldProps) {
  return (
    <div className={className}>
      {label ? <CyberLabel htmlFor={htmlFor}>{label}</CyberLabel> : null}
      {children}
      {error ? <ErrorText>{error}</ErrorText> : hint ? <HintText>{hint}</HintText> : null}
    </div>
  )
}