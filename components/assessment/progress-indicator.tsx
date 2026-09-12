"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StepId } from "@/lib/assessment/types"
import { StepOrder } from "@/lib/assessment/defaults"
import { stepIconMeta } from "@/lib/assessment/icons"

interface ProgressIndicatorProps {
  current: StepId
  onNavigate: (step: StepId) => void
}

export function ProgressIndicator({ current, onNavigate }: ProgressIndicatorProps) {
  const currentIndex = StepOrder.indexOf(current)

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-slate-900">Progress</p>
        <p className="font-mono text-xs text-slate-600">
          Step {currentIndex + 1} of {StepOrder.length}
        </p>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {StepOrder.map((step, index) => {
          const meta = stepIconMeta[step]
          const complete = index < currentIndex
          const active = index === currentIndex
          const Icon = meta.icon

          return (
            <div key={step} className="flex flex-1 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => complete && onNavigate(step)}
                disabled={!complete}
                aria-current={active ? "step" : undefined}
                aria-label={`${meta.label}${complete ? " - completed" : ""}`}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10",
                  active
                    ? "border-violet-500 bg-violet-500 text-white ring-2 ring-violet-500/30"
                    : complete
                      ? "cursor-pointer border-violet-500 bg-violet-100 text-violet-950 hover:bg-violet-200"
                      : "border-slate-300 bg-white text-slate-600",
                )}
              >
                {complete ? <Check className="size-4" /> : <Icon className="size-4" />}
              </button>

              {index < StepOrder.length - 1 ? (
                <div
                  aria-hidden
                  className={cn(
                    "h-px flex-1 rounded-full transition-colors duration-500",
                    index < currentIndex ? "bg-slate-300" : "bg-slate-200",
                  )}
                />
              ) : null}

              <span
                className={cn(
                  "hidden w-16 truncate text-xs lg:block",
                  active ? "font-medium text-violet-950" : "text-slate-900",
                  index === StepOrder.length - 1 && "text-right",
                )}
              >
                {meta.short}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}