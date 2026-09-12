import { Clock, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PricingResult } from "@/lib/assessment/types"
import { pricingConfig } from "@/lib/assessment/pricing"

interface EstimateCardProps {
  pricing: PricingResult | null
  compact?: boolean
}

export function EstimateCard({ pricing, compact = false }: EstimateCardProps) {
  return (
    <div
      className={cn(
        "builder-card rounded-3xl",
        compact ? "px-4 py-3" : "p-6",
      )}
    >
      {compact ? (
        <EstimateCompact pricing={pricing} />
      ) : (
        <EstimateFull pricing={pricing} />
      )}
    </div>
  )
}

function EstimateCompact({ pricing }: { pricing: PricingResult | null }) {
  if (!pricing) {
    return (
      <p className="truncate font-mono text-[11px] text-slate-900">
        Complete scope &amp; access for an estimate
      </p>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-0">
        <p className="font-mono text-xs text-slate-900">Est. investment</p>
        <p className="truncate font-mono text-base font-semibold text-teal-600">
          {pricing.totalLow} – {pricing.totalHigh} {pricingConfig.currency}
        </p>
      </div>
      <div className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-slate-100 px-2.5 py-1 sm:flex">
        <Clock className="size-3 text-slate-600" />
        <span className="font-mono text-[11px] text-slate-600">
          {pricing.durationLow}–{pricing.durationHigh} days
        </span>
      </div>
    </div>
  )
}

function EstimateFull({ pricing }: { pricing: PricingResult | null }) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-teal-400" />
        </span>
        <p className="text-xs font-medium uppercase tracking-widest text-slate-600">
          Preliminary estimate
        </p>
      </div>

      {pricing ? (
        <>
          <p className="mb-5 text-xs text-slate-900">Estimated investment</p>
          <p className="font-mono text-[26px] font-semibold leading-tight tracking-tight text-transparent bg-gradient-to-r from-violet-300 via-blue-300 to-teal-300 bg-clip-text">
            {pricing.totalLow} – {pricing.totalHigh} {pricingConfig.currency}
          </p>
        </>
      ) : (
        <>
          <p className="mb-3 text-xs text-slate-900">Estimated investment</p>
          <p className="font-mono text-[26px] font-semibold leading-tight text-slate-600">
            -- -- --
          </p>
        </>
      )}

      <div className="my-5 h-px bg-slate-100" />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-900">Estimated duration</p>
          {pricing ? (
            <p className="mt-0.5 font-mono text-sm font-medium text-slate-900">
              {pricing.durationLow}–{pricing.durationHigh} business days
            </p>
          ) : (
            <p className="mt-0.5 font-mono text-sm text-slate-600">-- – --</p>
          )}
        </div>
        {pricing ? (
          <ShieldCheck className="size-5 shrink-0 text-teal-400/70" />
        ) : null}
      </div>

      {pricing ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-slate-100 px-3 py-1 text-[11px] text-slate-700">
            {pricing.selectedTestCount} security areas
          </span>
          <span className="rounded-full border border-white/10 bg-slate-100 px-3 py-1 text-[11px] text-slate-700">
            {pricing.addonCount} deliverables
          </span>
        </div>
      ) : (
        <p className="mt-5 text-xs leading-relaxed text-slate-600">
          Define your scope and access model to receive a live estimate.
        </p>
      )}

      <p className="mt-6 border-t border-slate-200 pt-4 text-[11px] leading-relaxed text-slate-900">
        Preliminary estimate — final pricing and scope are confirmed after manual
        review.
      </p>
    </div>
  )
}