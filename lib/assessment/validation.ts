import type {
  AuthenticationConfiguration,
  AuthorizationConfirmation,
  CompanyInfo,
  StepId,
  ScopeConfiguration,
  WizardState,
} from "./types"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value.trim())
}

export function isCompanyValid(company: CompanyInfo): boolean {
  return (
    company.companyName.trim().length > 0 &&
    isValidUrl(company.targetUrl) &&
    company.industry !== "" &&
    company.environment !== "" &&
    isValidEmail(company.contactEmail)
  )
}

export function isScopeValid(scope: ScopeConfiguration): boolean {
  return scope.size !== ""
}

export function isAuthenticationValid(auth: AuthenticationConfiguration): boolean {
  return auth.model !== ""
}

export function isAuthorizationValid(auth: AuthorizationConfirmation): boolean {
  return Object.values(auth).every(Boolean)
}

export function isStepComplete(state: WizardState, step: StepId): boolean {
  switch (step) {
    case "company":
      return isCompanyValid(state.company)
    case "scope":
      return isScopeValid(state.scope)
    case "authentication":
      return isAuthenticationValid(state.authentication)
    case "tests":
      return state.selectedTestIds.length >= 1
    case "addons":
      return true
    case "authorization":
      return isAuthorizationValid(state.authorization)
    case "review":
      return true
  }
}