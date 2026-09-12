"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { BookOpen, ChevronRight, FileText, RotateCcw, ShieldCheck } from "lucide-react"
import type {
  Assessment,
  ContactDetails,
  PricingResult,
  StepId,
  WizardState,
  WizardStepId,
} from "@/lib/assessment/types"
import { StepOrder, emptyWizardState } from "@/lib/assessment/defaults"
import { calculatePricing } from "@/lib/assessment/pricing"
import { generateStructuredRequest } from "@/lib/assessment/submission"
import {
  loadWizardState,
  saveWizardState,
  clearWizardState,
} from "@/lib/assessment/storage"

import { ProgressIndicator } from "./progress-indicator"
import { StepShell } from "./step-shell"
import { EstimateCard } from "./estimate-card"
import { Backdrop } from "./backdrop"
import { WizardNav, ReviewNav, MobileBar } from "./wizard-nav"

import { PrintSummary } from "./print-summary"

import { CompanyStep } from "./company-step"
import { ScopeStep } from "./scope-step"
import { AuthenticationStep } from "./authentication-step"
import { SecurityTestsStep } from "./security-tests-step"
import { AddonsStep } from "./addons-step"
import { AuthorizationStep } from "./authorization-step"
import { ReviewStep } from "./review-step"
import { SubmissionStep } from "./submission-step"

function nextStepId(step: StepId): StepId | null {
  const index = StepOrder.indexOf(step)
  return index >= 0 && index < StepOrder.length - 1 ? StepOrder[index + 1] : null
}

function previousStepId(step: StepId): StepId | null {
  const index = StepOrder.indexOf(step)
  return index > 0 ? StepOrder[index - 1] : null
}

const STEP_TITLES: Record<StepId, string> = {
  company: "Company Details",
  scope: "Scope & Environment",
  authentication: "Authentication",
  tests: "Security Tests",
  addons: "Additional Services",
  authorization: "Authorization",
  review: "Review Request",
}

const FIRST_STEP = StepOrder[0]
const LAST_STEP = StepOrder[StepOrder.length - 1]

export function AssessmentBuilder() {
  const [wizard, setWizard] = useState<WizardState>(emptyWizardState)

  useEffect(() => {
    const saved = loadWizardState()
    if (saved) setWizard(saved)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "assessment-wizard-state") setWizard(loadWizardState() ?? emptyWizardState())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])
  const [showErrors, setShowErrors] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    saveWizardState(wizard)
  }, [wizard])

  const pricing = useMemo(() => calculatePricing(wizard), [wizard])
  const requestText = useMemo(
    () => (pricing ? generateStructuredRequest(wizard, pricing) : ""),
    [wizard, pricing],
  )

  const currentStep = wizard.currentStep
  const isSubmissionStep = currentStep === "submission"
  const isReviewStep = currentStep === "review"

  const updateWizard = useCallback((patch: Partial<WizardState>) => {
    setWizard((state) => ({ ...state, ...patch }))
  }, [])

  const navigate = useCallback((step: WizardStepId) => {
    updateWizard({ currentStep: step })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [updateWizard])

  const handleNext = useCallback(() => {
    if (isReviewStep) {
      navigate("submission")
      return
    }
    const next = nextStepId(currentStep as StepId)
    if (next) navigate(next)
  }, [currentStep, isReviewStep, navigate])

  const handleBack = useCallback(() => {
    if (isSubmissionStep) {
      navigate("review")
      return
    }
    const previous = previousStepId(currentStep as StepId)
    if (previous) navigate(previous)
  }, [currentStep, isSubmissionStep, navigate])

  const goTo = useCallback((step: StepId) => {
    navigate(step)
  }, [navigate])

  const handleReset = useCallback(() => {
    clearWizardState()
    setWizard(emptyWizardState())
    setShowErrors(false)
    navigate(StepOrder[0])
  }, [navigate])

  const handleDownload = useCallback(() => {
    
    window.print()
  }, [requestText])

  const renderStep = () => {
    switch (currentStep) {
      case "company":
        return (
          <CompanyStep
            value={wizard.company}
            showErrors={showErrors}
            onChange={(patch) =>
              updateWizard({ company: { ...wizard.company, ...patch } })
            }
          />
        )
      case "scope":
        return (
          <ScopeStep
            value={wizard.scope}
            showErrors={showErrors}
            onChange={(patch) => updateWizard({ scope: { ...wizard.scope, ...patch } })}
          />
        )
      case "authentication":
        return (
          <AuthenticationStep
            value={wizard.authentication}
            showErrors={showErrors}
            onChange={(patch) =>
              updateWizard({ authentication: { ...wizard.authentication, ...patch } })
            }
          />
        )
      case "tests":
        return (
          <SecurityTestsStep
            selectedIds={wizard.selectedTestIds}
            showErrors={showErrors}
            onChange={(selectedIds) => updateWizard({ selectedTestIds: selectedIds })}
          />
        )
      case "addons":
        return (
          <AddonsStep
            selectedIds={wizard.addonIds}
            onChange={(addonIds) => updateWizard({ addonIds })}
          />
        )
      case "authorization":
        return (
          <AuthorizationStep
            value={wizard.authorization}
            onChange={(patch) =>
              updateWizard({ authorization: { ...wizard.authorization, ...patch } })
            }
          />
        )
      case "review":
        return <ReviewStep assessment={wizard} goTo={goTo} />
      case "submission":
        if (!pricing) return null
        return (
          <SubmissionStep
            assessment={wizard}
            pricing={pricing}
            requestText={requestText}
            onReset={handleReset}
            onBack={() => navigate("review")}
            onDownload={handleDownload}
          />
        )
      default:
        return null
    }
  }

  const stepNumber =
    currentStep === "submission" ? StepOrder.length + 1 : StepOrder.indexOf(currentStep as StepId) + 1

  const isFirstStep = currentStep === StepOrder[0]
  const isLastStep = currentStep === LAST_STEP && !isSubmissionStep

  return (
    <>
    <div className="print:hidden min-h-screen bg-gradient-to-b from-white via-slate-50 to-white pb-40 md:pb-24">
      <header className="mx-auto w-full max-w-2xl px-4 pt-10 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-teal-600">
              Security Assessment
            </p>
            <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Request Engineering Review
            </h1>
          </div>
          <ShieldCheck className="size-9 text-teal-400/90" />
        </div>

        {!isSubmissionStep && (
          <ProgressIndicator
            current={currentStep as StepId}
            onNavigate={navigate}
          />
        )}
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        {!isSubmissionStep && (
          <StepShell step={stepNumber} title={STEP_TITLES[currentStep as StepId]}>
            {renderStep()}
          </StepShell>
        )}
        {isSubmissionStep ? renderStep() : null}
      </main>

      <div className="mx-auto mt-10 hidden w-full max-w-2xl px-4 sm:block sm:px-6">
        {isSubmissionStep ? null : isReviewStep ? (
          <ReviewNav onRequest={() => navigate("submission")} onDownload={handleDownload} />
        ) : (
          <WizardNav
            backDisabled={isFirstStep}
            onBack={handleBack}
            onNext={handleNext}
            nextLabel={isLastStep ? "Review" : "Continue"}
          />
        )}
      </div>

      <MobileBar
        backDisabled={isFirstStep}
        onBack={handleBack}
        onPrimary={isSubmissionStep ? handleDownload : handleNext}
        primaryLabel={isSubmissionStep ? "Download" : isLastStep ? "Review" : "Continue"}
        primaryDisabled={isSubmissionStep || !pricing}
        estimate={pricing ? <EstimateCard pricing={pricing} compact /> : undefined}
        onDownload={handleDownload}
      />

      <Backdrop fixed />
    </div>
    {pricing ? (
      <div className="hidden print:block">
        <PrintSummary assessment={wizard} pricing={pricing} />
      </div>
    ) : null}
    </>
  )
}
