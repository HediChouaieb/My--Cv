"use client"

import { ShieldAlert } from "lucide-react"
import type { AuthorizationConfirmation } from "@/lib/assessment/types"
import { StepShell } from "./step-shell"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface AuthorizationStepProps {
  value: AuthorizationConfirmation
  onChange: (patch: Partial<AuthorizationConfirmation>) => void
}

const confirmations: Array<{
  id: keyof AuthorizationConfirmation
  label: string
  description: string
}> = [
  {
    id: "authorized",
    label: "I confirm that I am authorized to request security testing for this target.",
    description: "You own the target system or hold written authorization from the owner.",
  },
  {
    id: "inScopeOnly",
    label: "I understand that testing will only be performed against the declared scope.",
    description: "Only the URLs, applications and functionality described in the scope are eligible.",
  },
  {
    id: "noDestructive",
    label: "I understand that destructive testing will not be performed without explicit authorization.",
    description: "Any action with destructive potential requires prior written approval.",
  },
  {
    id: "preliminary",
    label: "I understand that the displayed price is a preliminary estimate and not a final quotation.",
    description: "Final pricing and scope are confirmed after manual review of the request.",
  },
]

export function AuthorizationStep({ value, onChange }: AuthorizationStepProps) {
  return (
    <StepShell
      step={5}
      title="Before we continue"
      subtitle="Rules of engagement protect both your environment and the legitimacy of the assessment."
    >
      <div className="space-y-3">
        {confirmations.map((item) => {
          const checked = value[item.id]
          return (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-4 transition-colors hover:border-slate-300"
            >
              <Checkbox
                id={`confirmation-${item.id}`}
                checked={checked}
                onCheckedChange={(next) => onChange({ [item.id]: next === true })}
                className="mt-0.5 size-5 rounded-md border-slate-300 bg-slate-100 text-slate-950 data-[state=checked]:border-violet-400 data-[state=checked]:bg-violet-500"
              />
              <Label
                htmlFor={`confirmation-${item.id}`}
                className="block cursor-pointer leading-snug text-slate-800"
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-900">
                  {item.description}
                </span>
              </Label>
            </div>
          )
        })}
      </div>

      <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-400/20 bg-rose-500/[0.06] px-4 py-3">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-rose-600" />
        <span className="text-xs leading-relaxed text-slate-600">
          Only test systems that you own or have explicit authorization to assess.
        </span>
      </p>
    </StepShell>
  )
}