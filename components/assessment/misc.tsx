import React from "react"
import { cn } from "@/lib/utils"

interface CyberRowProps {
  label: string
  value?: string
  right?: React.ReactNode
}

export function CyberRow({ label, value, right }: CyberRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 last:border-0">
      <span className="text-sm text-slate-600">{label}</span>
      {right ?? (
        <span className="max-w-[60%] text-right text-sm font-medium text-slate-900">{value}</span>
      )}
    </div>
  )
}

export function CyberDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px bg-slate-100", className)} />
}
