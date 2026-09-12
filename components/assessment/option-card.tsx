import type React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface CyberOption {
  id: string
  title: string
  description?: string
  points?: string[]
  icon?: LucideIcon
  badge?: React.ReactNode
}

interface OptionCardGridProps {
  options: CyberOption[]
  value: string
  onSelect: (id: string) => void
  name: string
  columns?: "card" | "pill"
  className?: string
}

export function OptionCardGrid({
  options,
  value,
  onSelect,
  name,
  columns = "card",
  className,
}: OptionCardGridProps) {
  if (columns === "pill") {
    return (
      <div
        role="radiogroup"
        aria-label={name}
        className={cn("grid grid-cols-2 gap-2 sm:grid-cols-5", className)}
      >
        {options.map((option) => {
          const selected = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(option.id)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                selected
                  ? "border-violet-400/60 bg-violet-500/15 text-violet-950"
                  : "border-white/10 bg-slate-100 text-slate-700 hover:border-white/25 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {option.title}
            </button>
          )
        })}
      </div>
    )
  }

  const gridClass =
    options.length === 4
      ? "grid gap-3 sm:grid-cols-2"
      : options.length === 3
        ? "grid gap-3 sm:grid-cols-3"
        : "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"

  return (
    <div role="radiogroup" aria-label={name} className={cn(gridClass, className)}>
      {options.map((option) => {
        const selected = value === option.id
        const Icon = option.icon
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option.id)}
            className={cn(
              "group relative flex flex-col gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
              selected
                ? "border-violet-400/60 bg-violet-500/[0.08] shadow-[0_0_0_1px_rgba(139,92,246,0.35),0_10px_30px_-12px_rgba(139,92,246,0.4)]"
                : "border-slate-200 bg-slate-100 hover:border-white/20 hover:bg-slate-100",
            )}
          >
            {Icon ? (
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl border transition-colors",
                  selected
                    ? "border-violet-500 bg-violet-50 text-violet-950"
                    : "border-white/10 bg-slate-100 text-slate-600 group-hover:text-slate-800",
                )}
              >
                <Icon className="size-4" />
              </span>
            ) : null}

            <span className="flex items-start justify-between gap-2">
              <span className={cn("text-sm font-semibold", selected ? "text-violet-950" : "text-slate-900")}>
                {option.title}
              </span>
              <span
                aria-hidden
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                  selected
                    ? "border-violet-400 bg-violet-500 text-white"
                    : "border-slate-300 text-transparent"
                )}
              >
                <Check className="size-3" />
              </span>
            </span>

            {option.description ? (
              <span className="text-xs leading-relaxed text-slate-600">{option.description}</span>
            ) : null}

            {option.points ? (
              <span className="flex flex-wrap gap-1.5">
                {option.points.map((point) => (
                  <Badge
                    key={point}
                    variant="outline"
                    className="rounded-full border-white/10 bg-slate-100 px-2.5 py-0.5 text-[11px] font-normal text-slate-600"
                  >
                    {point}
                  </Badge>
                ))}
              </span>
            ) : null}

            {option.badge ? <span className="mt-1">{option.badge}</span> : null}
          </button>
        )
      })}
    </div>
  )
}