import type { Metadata } from "next"
import { AssessmentBuilder } from "@/components/assessment/assessment-builder"

export const metadata: Metadata = {
  title: "Security Assessment — Request Engineering Review",
  description:
    "Structured security assessment request: company, scope, authentication, test selection, add-ons, and authorization.",
}

export default function AssessmentRoutePage() {
  return <AssessmentBuilder />
}
