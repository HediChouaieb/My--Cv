export type Industry =
  | "E-commerce"
  | "SaaS"
  | "FinTech"
  | "Healthcare"
  | "Education"
  | "Government"
  | "Technology"
  | "Other"

export type Environment = "Production" | "Staging" | "Development"

export type ScopeSize = "small" | "medium" | "large" | "enterprise"

export type AuthModel =
  | "public"
  | "singleRole"
  | "multipleRoles"
  | "complexAuthorization"

export type TestAccountCount = "none" | "one" | "two" | "threePlus" | "custom"

export type TestCategory = "Critical" | "High" | "Medium"

export type StepId =
  | "company"
  | "scope"
  | "authentication"
  | "tests"
  | "addons"
  | "authorization"
  | "review"

export type WizardStepId = StepId | "submission"

export interface CompanyInfo {
  companyName: string
  targetUrl: string
  industry: Industry | ""
  environment: Environment | ""
  contactEmail: string
}

export interface ScopeConfiguration {
  size: ScopeSize | ""
}

export interface AuthenticationConfiguration {
  model: AuthModel | ""
  testAccounts: TestAccountCount
  hasAdminAccount: boolean
}

export interface AuthorizationConfirmation {
  authorized: boolean
  inScopeOnly: boolean
  noDestructive: boolean
  preliminary: boolean
}

export interface SecurityTest {
  id: string
  name: string
  shortName: string
  description: string
  category: TestCategory
  weight: number
  recommended?: boolean
}

export interface Addon {
  id: string
  name: string
  shortName: string
  description: string
  factor: number
}

export interface Assessment {
  company: CompanyInfo
  scope: ScopeConfiguration
  authentication: AuthenticationConfiguration
  selectedTestIds: string[]
  addonIds: string[]
  authorization: AuthorizationConfirmation
}

export interface WizardState extends Assessment {
  currentStep: WizardStepId
}

export interface PricingResult {
  subtotal: number
  addonsAmount: number
  testingComplexity: number
  authComplexity: number
  totalLow: number
  totalHigh: number
  durationLow: number
  durationHigh: number
  selectedTestCount: number
  addonCount: number
}

export interface ContactDetails {
  name: string
  email: string
  company: string
  phone: string
  message: string
}