"use client"

import { Check, Lightbulb, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  AuthenticationConfiguration,
  AuthModel,
} from "@/lib/assessment/types"
import { authModelOptions, testAccountOptions } from "@/lib/assessment/catalog"
import { authIcons } from "@/lib/assessment/icons"
import { StepShell } from "./step-shell"
import { OptionCardGrid } from "./option-card"
import { ErrorText } from "./field"

interface AuthenticationStepProps {
  value: AuthenticationConfiguration
  showErrors: boolean
  onChange: (patch: Partial<AuthenticationConfiguration>) => void
}

export function AuthenticationStep({
  value,
  showErrors,
  onChange,
}: AuthenticationStepProps) {
  const missingModel = showErrors && value.model === ""

  const modelOptions = authModelOptions.map((option) => ({
    id: option.id,
    title: option.title,
    description: option.description,
    icon: authIcons[option.id],
  }))

  const accountOptions = testAccountOptions.map((option) => ({
    id: option.id,
    title: option.title,
  }))

  return (
    <StepShell
      step={2}
      title="How does your application handle access?"
      subtitle="Authentication depth directly affects coverage of authorization, access control and business-logic testing."
    >
      <div className="space-y-9">
        <div>
          <h3 className="mb-3 text-sm font-medium text-slate-700">Access model</h3>
          <OptionCardGrid
            name="access-model"
            options={modelOptions}
            value={value.model}
            onSelect={(id) => onChange({ model: id as AuthModel })}
          />
          {missingModel ? (
            <ErrorText>Select an access model to continue.</ErrorText>
          ) : null}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-slate-700">
            How many test accounts can you provide?
          </h3>
          <OptionCardGrid
            name="test-accounts"
            options={accountOptions}
            value={value.testAccounts}
            onSelect={(id) =>
              onChange({ testAccounts: id as AuthenticationConfiguration["testAccounts"] })
            }
            columns="pill"
          />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-slate-700">
            Do you have an administrator test account?
          </h3>
          <div className="flex flex-wrap gap-2">
            {[true, false].map((answer) => {
              const selected = value.hasAdminAccount === answer
              return (
                <button
                  key={String(answer)}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={answer ? "Yes, I have an admin test account" : "No admin test account"}
                  onClick={() => onChange({ hasAdminAccount: answer })}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                    selected
                      ? "border-violet-400/60 bg-violet-500/15 text-violet-950"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-400 hover:bg-slate-100",
                  )}
                >
                  {answer ? <Check className="size-4" /> : <X className="size-4" />}
                  {answer ? "Yes" : "No"}
                </button>
              )
            })}
          </div>
        </div>

        <p className="flex items-start gap-2.5 rounded-xl border border-violet-400/20 bg-violet-500/[0.06] px-4 py-3">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-teal-600" />
          <span className="text-xs leading-relaxed text-slate-600">
            Authenticated testing allows deeper assessment of authorization,
            access control and business logic.
          </span>
        </p>
      </div>
    </StepShell>
  )
}