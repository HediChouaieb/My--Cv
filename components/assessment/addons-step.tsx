"use client"

import { Check, PackagePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { addons } from "@/lib/assessment/catalog"
import { addonIcons } from "@/lib/assessment/icons"
import { StepShell } from "./step-shell"

interface AddonsStepProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export function AddonsStep({ selectedIds, onChange }: AddonsStepProps) {
  const toggle = (id: string) =>
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((item) => item !== id)
        : [...selectedIds, id],
    )

  return (
    <StepShell
      step={4}
      title="Would you like additional deliverables?"
      subtitle="Optional add-on services are bundled into the engagement and reflected in your preliminary estimate."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {addons.map((addon) => {
          const selected = selectedIds.includes(addon.id)
          const Icon = addonIcons[addon.id] ?? PackagePlus
          return (
            <button
              key={addon.id}
              type="button"
              role="checkbox"
              aria-checked={selected}
              onClick={() => toggle(addon.id)}
              className={cn(
                "group flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                selected
                  ? "border-violet-400/50 bg-violet-500/[0.07] shadow-[0_0_0_1px_rgba(139,92,246,0.25)]"
                  : "border-slate-200 bg-slate-100 hover:border-slate-300 hover:bg-slate-100",
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
                  selected
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-950"
                    : "border-slate-200 bg-slate-100 text-slate-600 group-hover:text-slate-800",
                )}
              >
                <Icon className="size-4.5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className={cn("text-sm font-semibold", selected ? "text-violet-950" : "text-slate-900")}>
                    {addon.name}
                  </span>
                  <span className="shrink-0 font-mono text-xs font-medium text-teal-600">
                    +{Math.round(addon.factor * 100)}%
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                  {addon.description}
                </span>
              </span>

              <span
                aria-hidden
                className={cn(
                  "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                  selected
                    ? "border-violet-400 bg-violet-500 : text-white"
                    : "border-slate-300 text-transparent group-hover:border-slate-400",
                )}
              >
                <Check className="size-3" />
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-5 text-xs text-slate-900">
        {selectedIds.length > 0
          ? `${selectedIds.length} deliverable${selectedIds.length > 1 ? "s" : ""} added to this engagement.`
          : "No additional deliverables selected. A findings summary is always included."}
      </p>
    </StepShell>
  )
}