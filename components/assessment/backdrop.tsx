"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, FileDown, Loader2, RotateCcw, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { StepId } from "@/lib/assessment/types"
import { StepOrder } from "@/lib/assessment/defaults"

import type { PricingResult } from "@/lib/assessment/types"

interface EstimateBarProps {
  low: number
  high: number
  durationLow: number
  durationHigh: number
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  onReset: () => void
  backDisabled?: boolean
}

export function EstimateBar({
  low,
  high,
  durationLow,
  durationHigh,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
  onReset,
  backDisabled = false,
}: EstimateBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden print:hidden">
      {/* mobile compact estimate strip */}
      <div className="border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-900">
              Preliminary estimate
            </p>
            <p className="truncate font-mono text-sm font-semibold text-teal-600">
              {low} – {high}{" "}
              <span className="font-sans text-[11px] font-medium text-slate-600">TND</span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-900">Duration</p>
            <p className="font-mono text-sm font-semibold text-slate-800">
              {durationLow}–{durationHigh} <span className="text-[11px] font-sans text-slate-600">days</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/95 px-4 py-3 backdrop-blur-xl">
        <Button
          type="button"
          onClick={onBack}
          variant="ghost"
          disabled={backDisabled}
          className="size-12 shrink-0 rounded-xl border border-white/10 text-slate-700 hover:bg-white/5 disabled:opacity-40"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          type="button"
          onClick={onReset}
          variant="ghost"
          className="size-12 shrink-0 rounded-xl border border-white/10 text-slate-600 hover:bg-white/5 hover:text-slate-900"
          aria-label="Reset assessment"
        >
          <RotateCcw className="size-5" />
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="h-12 w-full rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-40"
        >
          {nextLabel}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export function PrintBar({ onClick }: { onClick?: () => void }) {
  return null
}


interface BackdropProps {
  fixed?: boolean
}

export function Backdrop({ fixed }: BackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none -z-10",
        fixed ? "fixed inset-0" : "absolute inset-0",
      )}
    >
      {/* gradient glow blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1122] via-[#070B16] to-[#05070E]" />
      <div className="absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/[0.13] blur-[140px]" />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[520px] rounded-full bg-teal-500/[0.07] blur-[130px]" />
      <div className="absolute -right-32 top-1/4 h-[420px] w-[540px] rounded-full bg-blue-600/[0.09] blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-[380px] w-[480px] rounded-full bg-fuchsia-600/[0.06] blur-[120px]" />

      {/* subtle grid + noise texture */}
      <div className="cyber-grid absolute inset-0 opacity-[0.5]" />
    </div>
  )
}