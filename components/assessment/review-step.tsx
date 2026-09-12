"use client"

import { Check, Pencil } from "lucide-react"
import type { Assessment, StepId } from "@/lib/assessment/types"
import {
  addons,
  authModelLabels,
  scopeSizeLabels,
  securityTests,
  testAccountLabels,
} from "@/lib/assessment/catalog"
import { StepShell } from "./step-shell"

interface ReviewStepProps {
  assessment: Assessment
  goTo: (step: StepId) => void
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-white/5 hover:text-slate-900"
    >
      <Pencil className="size-3" />
      Edit
    </button>
  )
}

function SectionCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-100 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-600">
          {title}
        </h3>
        <EditButton onClick={onEdit} />
      </div>
      {children}
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="shrink-0 text-xs text-slate-900">{label}</dt>
      <dd className="min-w-0 truncate text-right text-sm font-medium text-slate-900">{value}</dd>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-900">Nothing selected</p>
  }
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-sm text-slate-800">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-teal-600">
            <Check className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ReviewStep({ assessment, goTo }: ReviewStepProps) {
  const { company, scope, authentication, selectedTestIds, addonIds, authorization } = assessment

  const environmentLabel =
    company.environment === "Development" ? "Development / Test" : company.environment

  const selectedTests = securityTests.filter((test) => selectedTestIds.includes(test.id))
  const selectedAddons = addons.filter((addon) => addonIds.includes(addon.id))

  const scopeChip = [
    { label: "Authorization", value: "Confirmed", checked: authorization.authorized },
    { label: "Declared scope only", value: "Confirmed", checked: authorization.inScopeOnly },
    { label: "No destructive testing", value: "Confirmed", checked: authorization.noDestructive },
    { label: "Preliminary estimate", value: "Acknowledged", checked: authorization.preliminary },
  ]
  const allConfirmed = scopeChip.every((chip) => chip.checked)

  return (
    <StepShell
      step={6}
      title="Review your assessment"
      subtitle="Confirm the scope of your engagement before requesting a final quotation."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Project" onEdit={() => goTo("company")}>
          <dl>
            <Row label="Company" value={company.companyName || "Not provided"} />
            <Row label="Target" value={company.targetUrl || "Not provided"} />
            <Row label="Industry" value={company.industry || "Not provided"} />
            <Row label="Environment" value={environmentLabel} />
            <Row label="Contact" value={company.contactEmail || "Not provided"} />
          </dl>
        </SectionCard>

        <SectionCard title="Scope" onEdit={() => goTo("scope")}>
          <Row
            label="Application size"
            value={scope.size ? `${scopeSizeLabels[scope.size]} Web Application` : "Not selected"}
          />
        </SectionCard>

        <SectionCard title="Authentication & Access" onEdit={() => goTo("authentication")}>
          <Row
            label="Access model"
            value={authentication.model ? authModelLabels[authentication.model] : "Not selected"}
          />
          <Row label="Test accounts" value={testAccountLabels[authentication.testAccounts]} />
          <Row
            label="Admin test account"
            value={authentication.hasAdminAccount ? "Yes" : "No"}
          />
        </SectionCard>

        <SectionCard title="Security Areas" onEdit={() => goTo("tests")}>
          <CheckList items={selectedTests.map((test) => test.name)} />
        </SectionCard>

        <SectionCard title="Additional Services" onEdit={() => goTo("addons")}>
          <CheckList items={selectedAddons.map((addon) => addon.name)} />
        </SectionCard>

        <SectionCard title="Rules of Engagement" onEdit={() => goTo("authorization")}>
          <div className="space-y-1.5">
            {scopeChip.map((chip) => (
              <div
                key={chip.label}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
                  chip.checked ? "bg-emerald-500/[0.08]" : "bg-rose-500/[0.08]"
                }`}
              >
                <span className="text-xs text-slate-700">{chip.label}</span>
                <span
                  className={`font-mono text-[11px] ${
                    chip.checked ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {chip.checked ? "Confirmed" : "Missing"}
                </span>
              </div>
            ))}
            {!allConfirmed ? (
              <p className="pt-1 text-xs text-slate-900">
                Complete all confirmations in the Rules step before requesting.
              </p>
            ) : null}
          </div>
        </SectionCard>
      </div>
    </StepShell>
  )
}