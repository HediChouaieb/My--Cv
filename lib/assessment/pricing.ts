import type { Assessment, PricingResult } from "./types"
import { addons as addonCatalog, securityTests } from "./catalog"

export const pricingConfig = {
  currency: "TND",
  basePrice: 230,
  rangeVariance: 0.12,
  rounding: 10,
  scopeMultipliers: {
    small: 1.0,
    medium: 1.4,
    large: 1.8,
    enterprise: 2.5,
  },
  complexityMultipliers: {
    public: 1.0,
    singleRole: 1.15,
    multipleRoles: 1.35,
    complexAuthorization: 1.55,
  },
  testAccountMultipliers: {
    none: 0.95,
    one: 1.0,
    two: 1.03,
    threePlus: 1.06,
    custom: 1.05,
  },
  adminAccountMultiplier: 1.03,
  productionAdjustment: 1.08,
  testingComplexityWeight: 0.8,
  durationByScope: {
    small: { low: 2, high: 4 },
    medium: { low: 3, high: 5 },
    large: { low: 5, high: 9 },
    enterprise: { low: 7, high: 13 },
  },
  durationAuthBoost: {
    public: 0,
    singleRole: 0,
    multipleRoles: 0,
    complexAuthorization: 2,
  } as Record<string, number>,
  durationAddonBoost: {
    report: 0,
    "executive-summary": 0,
    remediation: 0,
    retest: 2,
    cvss: 0,
    owasp: 0,
  } as Record<string, number>,
  durationEnvironmentBoost: {
    Production: 1,
    Staging: 0,
    Development: 0,
  } as Record<string, number>,
  durationDenseScopeTestCount: 10,
}

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function calculatePricing(assessment: Assessment): PricingResult | null {
  const { scope, authentication, company } = assessment
  const config = pricingConfig

  if (!scope.size || !authentication.model) return null

  const scopeMultiplier = config.scopeMultipliers[scope.size]
  const authComplexity =
    config.complexityMultipliers[authentication.model] *
    config.testAccountMultipliers[authentication.testAccounts] *
    (authentication.hasAdminAccount ? config.adminAccountMultiplier : 1) *
    (company.environment === "Production" ? config.productionAdjustment : 1)

  const totalWeight = securityTests.reduce((sum, test) => sum + test.weight, 0)
  const selectedWeight = securityTests
    .filter((test) => assessment.selectedTestIds.includes(test.id))
    .reduce((sum, test) => sum + test.weight, 0)
  const testingComplexity =
    1 + (selectedWeight / totalWeight) * config.testingComplexityWeight

  const subtotal =
    config.basePrice * scopeMultiplier * authComplexity * testingComplexity

  const addonFactor = assessment.addonIds.reduce(
    (sum, id) => sum + (addonCatalog.find((addon) => addon.id === id)?.factor ?? 0),
    0,
  )
  const addonsAmount = subtotal * addonFactor
  const total = subtotal + addonsAmount

  const durationBase = config.durationByScope[scope.size]
  const durationLow =
    durationBase.low +
    (assessment.selectedTestIds.length >= config.durationDenseScopeTestCount ? 1 : 0)
  const durationHigh =
    durationBase.high +
    config.durationAuthBoost[authentication.model] +
    config.durationEnvironmentBoost[company.environment] +
    assessment.addonIds.reduce(
      (sum, id) => sum + (config.durationAddonBoost[id] ?? 0),
      0,
    )

  return {
    subtotal,
    addonsAmount,
    testingComplexity,
    authComplexity,
    totalLow: roundToNearest(total * (1 - config.rangeVariance), config.rounding),
    totalHigh: roundToNearest(total * (1 + config.rangeVariance), config.rounding),
    durationLow,
    durationHigh,
    selectedTestCount: assessment.selectedTestIds.length,
    addonCount: assessment.addonIds.length,
  }
}

export function formatPriceRange(pricing: PricingResult): string {
  return `${pricing.totalLow} – ${pricing.totalHigh}`
}

export function formatDuration(pricing: PricingResult): string {
  return `${pricing.durationLow}–${pricing.durationHigh}`
}