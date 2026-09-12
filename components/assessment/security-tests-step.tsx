"use client"

import { Check, Sparkles, SquareCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SecurityTest, TestCategory } from "@/lib/assessment/types"
import {
  allTestIds,
  recommendedTestIds,
  securityTests,
} from "@/lib/assessment/catalog"
import { testIcons } from "@/lib/assessment/icons"
import { StepShell } from "./step-shell"
import { ErrorText } from "./field"

interface SecurityTestsStepProps {
  selectedIds: string[]
  showErrors: boolean
  onChange: (ids: string[]) => void
}

const categoryMeta: Record<TestCategory, { label: string; hint: string }> = {
  Critical: {
    label: "Critical Priority",
    hint: "Direct, high-impact weaknesses that attackers target first.",
  },
  High: {
    label: "High Priority",
    hint: "Common weaknesses that frequently lead to compromise.",
  },
  Medium: {
    label: "Medium Priority",
    hint: "Hardening and defense-in-depth improvements.",
  },
}

const categoryStyle: Record<TestCategory, string> = {
  Critical: "border-rose-500/30 bg-rose-500/10 text-rose-600",
  High: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Medium: "border-teal-400/30 bg-teal-400/10 text-teal-600",
}

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}

export function SecurityTestsStep({
  selectedIds,
  showErrors,
  onChange,
}: SecurityTestsStepProps) {
  const groups = (["Critical", "High", "Medium"] as TestCategory[]).map((category) => ({
    category,
    tests: securityTests.filter((test) => test.category === category),
  }))

  return (
    <StepShell
      step={3}
      title="Which security areas should we assess?"
      subtitle="These are assessment categories, not guaranteed vulnerabilities. Each area describes the type of testing performed during the engagement."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-slate-900">
          {selectedIds.length} of {securityTests.length} selected
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChange([...recommendedTestIds])}
            className="flex items-center gap-1.5 rounded-lg border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-950 transition-colors hover:bg-violet-500/20"
          >
            <Sparkles className="size-3.5" />
            Select recommended tests
          </button>
          <button
            type="button"
            onClick={() => onChange(selectedIds.length === allTestIds.length ? [] : [...allTestIds])}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <SquareCheck className="size-3.5" />
            {selectedIds.length === allTestIds.length ? "Clear all" : "Select all"}
          </button>
        </div>
      </div>

      {showErrors && selectedIds.length === 0 ? (
        <div className="mb-5">
          <ErrorText>Select at least one security area to continue.</ErrorText>
        </div>
      ) : null}

      <div className="space-y-8">
        {groups.map(({ category, tests }) => (
          <section key={category} aria-label={categoryMeta[category].label}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  {categoryMeta[category].label}
                  <span className="ml-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {tests.filter((test) => selectedIds.includes(test.id)).length}/
                    {tests.length}
                  </span>
                </h3>
                <p className="mt-1 text-xs text-slate-900">{categoryMeta[category].hint}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {tests.map((test) => (
                <SecurityTestRow
                  key={test.id}
                  test={test}
                  selected={selectedIds.includes(test.id)}
                  onToggle={() => onChange(toggleId(selectedIds, test.id))}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </StepShell>
  )
}

interface SecurityTestRowProps {
  test: SecurityTest
  selected: boolean
  onToggle: () => void
}

function SecurityTestRow({ test, selected, onToggle }: SecurityTestRowProps) {
  const Icon = testIcons[test.id] ?? Check
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        "group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
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
        <span className="flex flex-wrap items-center gap-2">
          <span className={cn("text-sm font-semibold", selected ? "text-violet-950" : "text-slate-900")}>
            {test.name}
          </span>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
              categoryStyle[test.category],
            )}
          >
            {test.category}
          </span>
          {test.recommended ? (
            <span className="flex items-center gap-1 rounded-full border border-violet-400/40 bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-teal-600">
              <Sparkles className="size-2.5" />
              Recommended
            </span>
          ) : null}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-slate-600">
          {test.description}
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
}