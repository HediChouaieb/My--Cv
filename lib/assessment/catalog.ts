import type {
  Addon,
  AuthModel,
  Environment,
  ScopeSize,
  SecurityTest,
  TestAccountCount,
} from "./types"

export const industries: string[] = [
  "E-commerce",
  "SaaS",
  "FinTech",
  "Healthcare",
  "Education",
  "Government",
  "Technology",
  "Other",
]

export interface EnvironmentOption {
  id: Environment
  title: string
  description: string
  notice: boolean
}

export const environmentOptions: EnvironmentOption[] = [
  {
    id: "Production",
    title: "Production",
    description: "Live environment with real users and production data.",
    notice: true,
  },
  {
    id: "Staging",
    title: "Staging",
    description: "Pre-production environment mirroring production.",
    notice: false,
  },
  {
    id: "Development",
    title: "Development / Test",
    description: "Internal development and quality assurance builds.",
    notice: false,
  },
]

export interface ScopeOption {
  id: ScopeSize
  title: string
  points: string[]
}

export const scopeOptions: ScopeOption[] = [
  {
    id: "small",
    title: "Small",
    points: ["Single website", "Limited functionality", "Public-facing pages"],
  },
  {
    id: "medium",
    title: "Medium",
    points: [
      "Web application",
      "Authentication flows",
      "Multiple functional areas",
      "API endpoints",
    ],
  },
  {
    id: "large",
    title: "Large",
    points: [
      "Complex web application",
      "Multiple roles",
      "Large API surface",
      "Advanced business logic",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    points: [
      "Multiple applications",
      "Multiple domains",
      "Complex infrastructure",
      "Multiple user roles",
    ],
  },
]

export interface AuthModelOption {
  id: AuthModel
  title: string
  description: string
}

export const authModelOptions: AuthModelOption[] = [
  { id: "public", title: "Public Website", description: "No authentication." },
  { id: "singleRole", title: "Single User Role", description: "One authenticated user type." },
  {
    id: "multipleRoles",
    title: "Multiple User Roles",
    description: "Role model such as User / Manager / Admin.",
  },
  {
    id: "complexAuthorization",
    title: "Complex Authorization",
    description: "Different permissions and sensitive operations per role.",
  },
]

export interface TestAccountOption {
  id: TestAccountCount
  title: string
}

export const testAccountOptions: TestAccountOption[] = [
  { id: "none", title: "None" },
  { id: "one", title: "1" },
  { id: "two", title: "2" },
  { id: "threePlus", title: "3+" },
  { id: "custom", title: "Custom" },
]

export const securityTests: SecurityTest[] = [
  {
    id: "authentication",
    name: "Authentication Testing",
    shortName: "Authentication",
    description:
      "Test authentication mechanisms, session handling and common authentication weaknesses.",
    category: "Critical",
    weight: 1.5,
    recommended: true,
  },
  {
    id: "authorization",
    name: "Authorization / Access Control",
    shortName: "Authorization",
    description: "Assess privilege escalation, IDOR/BOLA and unauthorized access.",
    category: "Critical",
    weight: 1.5,
    recommended: true,
  },
  {
    id: "command-injection",
    name: "Command Injection",
    shortName: "Command Injection",
    description: "Assess whether user-controlled input can reach operating system commands.",
    category: "Critical",
    weight: 1.5,
  },
  {
    id: "sql-injection",
    name: "SQL Injection",
    shortName: "SQL Injection",
    description: "Assess database query injection vulnerabilities.",
    category: "High",
    weight: 1.3,
    recommended: true,
  },
  {
    id: "ssrf",
    name: "SSRF",
    shortName: "SSRF",
    description:
      "Assess server-side request functionality and potential internal resource access.",
    category: "High",
    weight: 1.4,
  },
  {
    id: "file-upload",
    name: "File Upload Security",
    shortName: "File Upload",
    description: "Assess malicious file upload, validation and execution risks.",
    category: "High",
    weight: 1.2,
  },
  {
    id: "api-security",
    name: "API Security",
    shortName: "API Security",
    description:
      "Assess API authentication, authorization, input validation and common API vulnerabilities.",
    category: "High",
    weight: 1.3,
  },
  {
    id: "business-logic",
    name: "Business Logic",
    shortName: "Business Logic",
    description: "Assess application workflows for abuse and logic flaws.",
    category: "High",
    weight: 1.4,
  },
  {
    id: "xss",
    name: "Cross-Site Scripting (XSS)",
    shortName: "XSS",
    description: "Assess reflected, stored and DOM-based XSS.",
    category: "Medium",
    weight: 1.0,
    recommended: true,
  },
  {
    id: "csrf",
    name: "CSRF",
    shortName: "CSRF",
    description: "Assess cross-site request forgery protections.",
    category: "Medium",
    weight: 0.8,
  },
  {
    id: "security-misconfiguration",
    name: "Security Misconfiguration",
    shortName: "Security Misconfiguration",
    description:
      "Assess security headers, exposed services, debug functionality and configuration issues.",
    category: "Medium",
    weight: 0.7,
    recommended: true,
  },
  {
    id: "information-disclosure",
    name: "Information Disclosure",
    shortName: "Information Disclosure",
    description: "Assess accidental exposure of sensitive information.",
    category: "Medium",
    weight: 0.6,
  },
]

export const addons: Addon[] = [
  {
    id: "report",
    name: "Professional Pentest Report",
    shortName: "Professional Report",
    description:
      "Detailed technical report containing findings, evidence, severity and remediation.",
    factor: 0.15,
  },
  {
    id: "executive-summary",
    name: "Executive Summary",
    shortName: "Executive Summary",
    description: "Management-friendly security summary.",
    factor: 0.05,
  },
  {
    id: "remediation",
    name: "Remediation Recommendations",
    shortName: "Remediation Recommendations",
    description: "Detailed recommendations for fixing identified issues.",
    factor: 0.1,
  },
  {
    id: "retest",
    name: "Retest",
    shortName: "Retest",
    description: "Follow-up validation after remediation.",
    factor: 0.25,
  },
  {
    id: "cvss",
    name: "CVSS Scoring",
    shortName: "CVSS Scoring",
    description: "Include CVSS-based severity scoring.",
    factor: 0.05,
  },
  {
    id: "owasp",
    name: "OWASP Mapping",
    shortName: "OWASP Mapping",
    description: "Map findings to OWASP categories.",
    factor: 0.05,
  },
]

export const recommendedTestIds = [
  "authentication",
  "authorization",
  "sql-injection",
  "xss",
  "security-misconfiguration",
]

export const allTestIds = securityTests.map((test) => test.id)

export const scopeSizeLabels: Record<ScopeSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  enterprise: "Enterprise",
}

export const authModelLabels: Record<AuthModel, string> = {
  public: "Public Website",
  singleRole: "Single User Role",
  multipleRoles: "Multiple User Roles",
  complexAuthorization: "Complex Authorization",
}

export const testAccountLabels: Record<TestAccountCount, string> = {
  none: "None",
  one: "1",
  two: "2",
  threePlus: "3+",
  custom: "Custom",
}