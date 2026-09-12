import React from "react"
import { ArrowLeft, ArrowRight, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface WizardNavProps {
  backDisabled?: boolean
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
}

export function WizardNav({
  backDisabled = false,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
}: WizardNavProps) {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        disabled={backDisabled}
        className="h-11 rounded-xl px-4 text-sm font-medium text-slate-700 hover:bg-white/5 hover:text-slate-900 disabled:opacity-40"
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>
      <Button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="h-11 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] transition-all hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
      >
        {nextLabel}
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

interface ReviewNavProps {
  onRequest: () => void
  onDownload: () => void
}

export function ReviewNav({ onRequest, onDownload }: ReviewNavProps) {
  return (
    <div className="mt-9 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onDownload}
        className="h-11 rounded-xl border-white/10 bg-slate-100 px-5 text-sm font-medium text-slate-800 hover:border-white/25 hover:bg-slate-100 hover:text-slate-900"
      >
        <Download className="size-4" />
        Download Scope Summary
      </Button>
      <Button
        type="button"
        onClick={onRequest}
        className="h-11 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)] transition-all hover:brightness-110"
      >
        Request Assessment
        <ArrowRight className="size-4" />
      </Button>
    </div>
  )
}

interface MobileBarProps {
  backDisabled?: boolean
  onBack: () => void
  onPrimary: () => void
  primaryLabel: string
  primaryDisabled?: boolean
  estimate?: React.ReactNode
  onDownload?: () => void
}

export function MobileBar({
  backDisabled = false,
  onBack,
  onPrimary,
  primaryLabel,
  primaryDisabled = false,
  estimate,
  onDownload,
}: MobileBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl md:hidden print:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          disabled={backDisabled}
          aria-label="Back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-100 text-slate-700 disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
        </button>

        {estimate || <div className="min-w-0 flex-1" />}

        {onDownload ? (
          <button
            type="button"
            onClick={onDownload}
            aria-label="Download scope summary"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-100 text-slate-700"
          >
            <Download className="size-4" />
          </button>
        ) : null}

        <button
          type="button"
          onClick={onPrimary}
          disabled={primaryDisabled}
          className={cn(
            "flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all disabled:opacity-40",
            primaryLabel === "Continue"
              ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.6)]"
              : "bg-white/10 text-slate-900",
          )}
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  )
}