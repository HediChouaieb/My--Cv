"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, Download, FileText, Loader2, RotateCcw } from "lucide-react"
import type { Assessment, ContactDetails, PricingResult } from "@/lib/assessment/types"
import { submitAssessmentRequest } from "@/lib/assessment/submission"
import { CyberField, CyberInput, CyberTextarea } from "./field"
import { Button } from "@/components/ui/button"

interface SubmissionStepProps {
  assessment: Assessment
  pricing: PricingResult
  requestText: string
  onReset: () => void
  onBack: () => void
  onDownload: () => void
}

export function SubmissionStep({
  assessment,
  pricing,
  requestText,
  onReset,
  onBack,
  onDownload,
}: SubmissionStepProps) {
  const [contact, setContact] = useState<ContactDetails>({
    name: "",
    email: assessment.company.contactEmail,
    company: assessment.company.companyName,
    phone: "",
    message: "",
  })
  const [showErrors, setShowErrors] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const update = (patch: Partial<ContactDetails>) => setContact((current) => ({ ...current, ...patch }))

  const nameError = showErrors && contact.name.trim().length === 0
  const emailError = showErrors && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())
  const companyError = showErrors && contact.company.trim().length === 0

  const handleSubmit = async () => {
    const valid = contact.name.trim().length > 0 && contact.email.trim().length > 0 && contact.company.trim().length > 0
    if (!valid) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    setSubmitting(true)
    const result = await submitAssessmentRequest({
      request: assessment,
      pricing,
      requestText,
      contact,
    })
    setSubmitting(false)
    setReference(result.reference)
  }

  if (reference) {
    return (
      <div className="animate-step-in">
        <div className="mx-auto flex max-w-xl flex-col items-center py-8 text-center">
          <span className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10">
            <CheckCircle2 className="size-8 text-teal-600" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Assessment Request Received
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
            Thanks. Your security assessment request has been received. I will
            review the scope and contact you with a final quotation.
          </p>
          <p className="mt-5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 font-mono text-xs text-teal-600">
            Reference: {reference}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onDownload}
              className="h-11 rounded-xl border-slate-200 bg-slate-100 px-5 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:text-slate-900"
            >
              <Download className="size-4" />
              Download Scope Summary
            </Button>
            <Button
              type="button"
              onClick={onReset}
              className="h-11 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-5 text-sm font-semibold : text-white"
            >
              <RotateCcw className="size-4" />
              Start a New Assessment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-step-in">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-medium tracking-widest text-teal-600">
            FINAL STEP
          </span>
          <span aria-hidden className="h-px w-10 bg-white/10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Confirm your assessment request
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Review the structured request below, add your details, then submit. A
          final quotation follows after manual review.
        </p>
      </header>

      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3">
          <FileText className="size-4 text-slate-600" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-600">
            Security Assessment Request
          </span>
        </div>
        <pre className="max-h-96 overflow-auto whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-slate-700">
          {requestText}
        </pre>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit()
        }}
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <CyberField
            label="Your Name"
            htmlFor="lead-name"
            error={nameError ? "Your name is required." : undefined}
          >
            <CyberInput
              id="lead-name"
              value={contact.name}
              onChange={(event) => update({ name: event.target.value })}
              placeholder="Jane Doe"
              required
              aria-invalid={nameError}
            />
          </CyberField>

          <CyberField
            label="Email"
            htmlFor="lead-email"
            error={emailError ? "Enter a valid email address." : undefined}
          >
            <CyberInput
              id="lead-email"
              type="email"
              value={contact.email}
              onChange={(event) => update({ email: event.target.value })}
              placeholder="you@company.com"
              required
              aria-invalid={emailError}
            />
          </CyberField>

          <CyberField
            label="Company"
            htmlFor="lead-company"
            error={companyError ? "Company name is required." : undefined}
          >
            <CyberInput
              id="lead-company"
              value={contact.company}
              onChange={(event) => update({ company: event.target.value })}
              placeholder="Acme Technologies"
              required
              aria-invalid={companyError}
            />
          </CyberField>

          <CyberField label="Phone" htmlFor="lead-phone" hint="Optional — for scheduling a call.">
            <CyberInput
              id="lead-phone"
              type="tel"
              value={contact.phone}
              onChange={(event) => update({ phone: event.target.value })}
              placeholder="+216 00 000 000"
            />
          </CyberField>

          <CyberField
            label="Additional Message"
            htmlFor="lead-message"
            hint="Optional — context, deadlines, or specific concerns."
            className="sm:col-span-2"
          >
            <CyberTextarea
              id="lead-message"
              value={contact.message}
              onChange={(event) => update({ message: event.target.value })}
              placeholder="Tell me anything else that may be relevant to the scope."
              className="min-h-[110px]"
            />
          </CyberField>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="h-11 rounded-xl px-4 text-sm font-medium text-slate-700 hover:bg-white/5 hover:text-slate-900"
          >
            <ArrowLeft className="size-4" />
            Back to Review
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] transition-all hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Assessment Request"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}