import type { StepId, WizardState } from "./types"
import { recommendedTestIds } from "./catalog"

export const StepOrder: StepId[] = [
  "company",
  "scope",
  "authentication",
  "tests",
  "addons",
  "authorization",
  "review",
]

export function emptyWizardState(): WizardState {
  return {
    currentStep: "company",
    company: {
      companyName: "",
      targetUrl: "",
      industry: "",
      environment: "",
      contactEmail: "",
    },
    scope: { size: "" },
    authentication: { model: "", testAccounts: "one", hasAdminAccount: false },
    selectedTestIds: [...recommendedTestIds],
    addonIds: [],
    authorization: {
      authorized: false,
      inScopeOnly: false,
      noDestructive: false,
      preliminary: false,
    },
  }
}