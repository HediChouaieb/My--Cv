import type { WizardState } from "./types"
import { emptyWizardState } from "./defaults"
import { allTestIds } from "./catalog"

const STORAGE_KEY = "security-assessment-builder:v1"

function mergeState(parsed: Partial<WizardState>): WizardState {
  const base = emptyWizardState()
  return {
    currentStep:
      parsed.currentStep && typeof parsed.currentStep === "string"
        ? (parsed.currentStep as WizardState["currentStep"])
        : base.currentStep,
    company: { ...base.company, ...parsed.company },
    scope: { ...base.scope, ...parsed.scope },
    authentication: { ...base.authentication, ...parsed.authentication },
    selectedTestIds: Array.isArray(parsed.selectedTestIds)
      ? parsed.selectedTestIds.filter((id) => allTestIds.includes(id))
      : base.selectedTestIds,
    addonIds: Array.isArray(parsed.addonIds) ? parsed.addonIds : base.addonIds,
    authorization: { ...base.authorization, ...parsed.authorization },
  }
}

export function loadWizardState(): WizardState {
  if (typeof window === "undefined") return emptyWizardState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyWizardState()
    const parsed = JSON.parse(raw) as Partial<WizardState>
    return mergeState(parsed)
  } catch {
    return emptyWizardState()
  }
}

export function saveWizardState(state: WizardState): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    return
  }
}

export function clearWizardState(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}