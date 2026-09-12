"use client"

import type { ScopeConfiguration, ScopeSize } from "@/lib/assessment/types"
import { scopeOptions } from "@/lib/assessment/catalog"
import { scopeIcons } from "@/lib/assessment/icons"
import { StepShell } from "./step-shell"
import { OptionCardGrid } from "./option-card"

interface ScopeStepProps {
  value: ScopeConfiguration
  showErrors: boolean
  onChange: (patch: Partial<ScopeConfiguration>) => void
}

export function ScopeStep({ value, showErrors, onChange }: ScopeStepProps) {
  const options = scopeOptions.map((option) => ({
    id: option.id,
    title: option.title,
    points: option.points,
    icon: scopeIcons[option.id],
  }))

  return (
    <StepShell
      step={1}
      title="What are we testing?"
      subtitle="Select the size of your application. This defines how assessment time and effort are distributed across the engagement."
    >
      <OptionCardGrid
        name="application-scope"
        options={options}
        value={value.size}
        onSelect={(id) => onChange({ size: id as ScopeSize })}
      />

      {showErrors && value.size === "" ? (
        <p className="mt-3 text-xs font-medium text-rose-400">
          Select an application size to continue.
        </p>
      ) : null}
    </StepShell>
  )
}