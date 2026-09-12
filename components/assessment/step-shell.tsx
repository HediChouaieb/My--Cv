import type React from "react"

interface StepShellProps {
  step: number
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}

export function StepShell({ step, title, subtitle, children }: StepShellProps) {
  return (
    <div className="animate-step-in">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-medium tracking-widest text-teal-600">
            STEP {String(step + 1).padStart(2, "0")} / 07
          </span>
          <span aria-hidden className="h-px w-10 bg-white/10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </div>
  )
}