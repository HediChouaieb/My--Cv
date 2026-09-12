import {
  Braces,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Code2,
  Database,
  FileCheck2,
  FileSearch,
  FileText,
  FlaskConical,
  Globe,
  KeyRound,
  Layers,
  Lock,
  Map,
  Network,
  PackagePlus,
  Rocket,
  RotateCcw,
  Scale,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Upload,
  User,
  UserCheck,
  Users,
  Workflow,
  Wrench,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { StepId } from "./types"

export const testIcons: Record<string, LucideIcon> = {
  authentication: Lock,
  authorization: KeyRound,
  "command-injection": Terminal,
  "sql-injection": Database,
  ssrf: Network,
  "file-upload": Upload,
  "api-security": Braces,
  "business-logic": Workflow,
  xss: Code2,
  csrf: RotateCcw,
  "security-misconfiguration": ServerCog,
  "information-disclosure": FileSearch,
}

export const addonIcons: Record<string, LucideIcon> = {
  report: FileText,
  "executive-summary": ClipboardList,
  remediation: Wrench,
  retest: RotateCcw,
  cvss: Scale,
  owasp: Map,
}

export const stepIconMeta: Record<StepId, { label: string; short: string; icon: LucideIcon }> = {
  company: { label: "Company Information", short: "Project", icon: Building2 },
  scope: { label: "Define Your Scope", short: "Scope", icon: Layers },
  authentication: { label: "Authentication & Access", short: "Access", icon: UserCheck },
  tests: { label: "Security Testing Selection", short: "Security", icon: ShieldAlert },
  addons: { label: "Additional Services", short: "Services", icon: PackagePlus },
  authorization: { label: "Rules & Authorization", short: "Rules", icon: FileCheck2 },
  review: { label: "Review", short: "Review", icon: ClipboardCheck },
}

export const scopeIcons: Record<string, LucideIcon> = {
  small: FileSearch,
  medium: Network,
  large: ServerCog,
  enterprise: Building2,
}

export const authIcons: Record<string, LucideIcon> = {
  public: Globe,
  singleRole: User,
  multipleRoles: Users,
  complexAuthorization: ShieldCheck,
}

export const environmentIcons: Record<string, LucideIcon> = {
  Production: Rocket,
  Staging: FlaskConical,
  Development: Wrench,
}