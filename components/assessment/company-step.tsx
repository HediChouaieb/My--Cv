"use client"

import { AlertTriangle, Globe, Mail } from "lucide-react"
import type { CompanyInfo, Environment, Industry } from "@/lib/assessment/types"
import { environmentOptions, industries } from "@/lib/assessment/catalog"
import { environmentIcons } from "@/lib/assessment/icons"
import { isValidEmail, isValidUrl } from "@/lib/assessment/validation"
import { StepShell } from "./step-shell"
import { OptionCardGrid } from "./option-card"
import { CyberField, CyberInput } from "./field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CompanyStepProps {
  value: CompanyInfo
  showErrors: boolean
  onChange: (patch: Partial<CompanyInfo>) => void
}

export function CompanyStep({ value, showErrors, onChange }: CompanyStepProps) {
  const companyNameError = showErrors && value.companyName.trim().length === 0
  const targetError = showErrors && !isValidUrl(value.targetUrl)
  const industryError = showErrors && value.industry === ""
  const environmentError = showErrors && value.environment === ""
  const emailError = showErrors && !isValidEmail(value.contactEmail)

  const envOptions = environmentOptions.map((option) => ({
    id: option.id,
    title: option.title,
    description: option.description,
    icon: environmentIcons[option.id],
  }))

  return (
    <StepShell
      step={0}
      title="Tell us about your project"
      subtitle="Start by defining the target and organization this security assessment will cover."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <CyberField
          label="Company Name"
          htmlFor="company-name"
          error={companyNameError ? "Company name is required." : undefined}
          hint={companyNameError ? undefined : "The organization requesting the assessment."}
          className="sm:col-span-2"
        >
          <CyberInput
            id="company-name"
            value={value.companyName}
            onChange={(event) => onChange({ companyName: event.target.value })}
            placeholder="e.g. Acme Technologies"
            required
            aria-invalid={companyNameError}
          />
        </CyberField>

        <CyberField
          label="Website / Application URL"
          htmlFor="target-url"
          error={targetError ? "Enter a valid http:// or https:// URL." : undefined}
          hint="The primary target URL you want assessed."
        >
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-900" />
            <CyberInput
              id="target-url"
              type="url"
              value={value.targetUrl}
              onChange={(event) => onChange({ targetUrl: event.target.value })}
              placeholder="https://example.com"
              className="pl-10 font-mono text-[13px]"
              required
              aria-invalid={targetError}
            />
          </div>
        </CyberField>

        <CyberField
          label="Industry"
          htmlFor="industry"
          error={industryError ? "Select an industry." : undefined}
        >
          <Select
            value={value.industry}
            onValueChange={(next) => onChange({ industry: next as Industry })}
          >
            <SelectTrigger
              id="industry"
              aria-label="Industry"
              aria-invalid={industryError}
              className="h-11 w-full rounded-xl border-slate-200 bg-slate-100 text-left text-slate-900 [&_svg]:size-4 [&_svg]:text-slate-900"
            >
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white  shadow-xl">
              {industries.map((industry) => (
                <SelectItem
                  key={industry}
                  value={industry}
                  className="rounded-lg "
                >
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CyberField>

        <CyberField
          label="Deployment Environment"
          error={environmentError ? "Select an environment." : undefined}
          className="sm:col-span-2"
        >
          <OptionCardGrid
            name="deployment-environment"
            options={envOptions}
            value={value.environment}
            onSelect={(id) => onChange({ environment: id as Environment })}
            columns="card"
          />
          {value.environment === "Production" ? (
            <p className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-4 py-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" />
              <span className="text-xs leading-relaxed text-amber-200/90">
                Testing production systems requires additional care and explicit
                authorization.
              </span>
            </p>
          ) : null}
        </CyberField>

        <CyberField
          label="Contact Email"
          htmlFor="contact-email"
          error={emailError ? "Enter a valid email address." : undefined}
          hint="Scope confirmation and the final quotation are sent to this address."
          className="sm:col-span-2"
        >
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-900" />
            <CyberInput
              id="contact-email"
              type="email"
              value={value.contactEmail}
              onChange={(event) => onChange({ contactEmail: event.target.value })}
              placeholder="you@company.com"
              className="pl-10"
              required
              aria-invalid={emailError}
            />
          </div>
        </CyberField>
      </div>
    </StepShell>
  )
}