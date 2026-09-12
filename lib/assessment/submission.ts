import type { Assessment, ContactDetails, PricingResult } from "./types"
import {
  addons,
  authModelLabels,
  scopeSizeLabels,
  securityTests,
  testAccountLabels,
} from "./catalog"
import { formatDuration, formatPriceRange } from "./pricing"

function environmentLabel(environment: string): string {
  return environment === "Development" ? "Development / Test" : environment
}

export function generateStructuredRequest(
  assessment: Assessment,
  pricing: PricingResult,
): string {
  const { company, scope, authentication, selectedTestIds, addonIds } = assessment
  const selectedTests = securityTests.filter((test) =>
    selectedTestIds.includes(test.id),
  )
  const selectedAddons = addons.filter((addon) => addonIds.includes(addon.id))

  const lines: string[] = [
    "SECURITY ASSESSMENT REQUEST",
    "",
    "Company:",
    company.companyName,
    "",
    "Target:",
    company.targetUrl,
    "",
    "Environment:",
    environmentLabel(company.environment),
    "",
    "Industry:",
    company.industry,
    "",
    "Application Size:",
    scope.size ? `${scopeSizeLabels[scope.size]} Web Application` : "Not specified",
    "",
    "Authentication:",
    authentication.model ? `${authModelLabels[authentication.model]}` : "Not specified",
    "",
    "Test Accounts:",
    `${testAccountLabels[authentication.testAccounts]}`,
    "",
    "Admin Test Account:",
    authentication.hasAdminAccount ? "Yes" : "No",
    "",
    "Security Areas:",
    ...selectedTests.map((test) => `- ${test.shortName}`),
    "",
    "Additional Services:",
    ...(selectedAddons.length > 0
      ? selectedAddons.map((addon) => `- ${addon.shortName}`)
      : ["- None"]),
    "",
    "Estimated Duration:",
    formatDuration(pricing),
    "",
    "Estimated Price:",
    formatPriceRange(pricing),
    "",
    "Status:",
    "Pending Manual Review",
  ]

  return lines.join("\n")
}

export interface AssessmentSubmission {
  request: Assessment
  pricing: PricingResult
  contact: ContactDetails
  requestText: string
}

export interface SubmissionResult {
  status: "pending-review"
  reference: string
}

function generateReference(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `SAR-${year}-${random}`
}

export async function submitAssessmentRequest(
  submission: AssessmentSubmission,
): Promise<SubmissionResult> {
  await new Promise((resolve) => setTimeout(resolve, 1400))
  return {
    status: "pending-review",
    reference: generateReference(),
  }
}
