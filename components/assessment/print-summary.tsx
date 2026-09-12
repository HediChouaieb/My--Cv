import { ShieldCheck } from "lucide-react"
import {
  addons,
  authModelLabels,
  scopeSizeLabels,
  securityTests,
  testAccountLabels,
} from "@/lib/assessment/catalog"
import { formatDuration, formatPriceRange, pricingConfig } from "@/lib/assessment/pricing"
import type { Assessment, PricingResult, TestCategory } from "@/lib/assessment/types"

interface PrintSummaryProps {
  assessment: Assessment
  pricing: PricingResult
}

const CATEGORY_DOTS: Record<string, string> = {
  Critical: "bg-rose-500",
  High: "bg-amber-500",
  Medium: "bg-sky-500",
}

const CATEGORY_ORDER: TestCategory[] = ["Critical", "High", "Medium"]

function environmentLabel(environment: string): string {
  return environment === "Development" ? "Development / Test" : environment
}

function preparedOn(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function referenceCode(companyName: string): string {
  const year = new Date().getFullYear()
  const initials = companyName
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase()
  return `SAR-${year}-${initials || "DOC"}`
}

function formatMoney(value: number): string {
  return `${Math.round(value).toLocaleString("en-US")} ${pricingConfig.currency}`
}

function SectionTitle({ no, title }: { no: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 border-l-4 border-teal-600 pl-3">
      <span className="font-mono text-[8pt] font-bold tracking-wide text-teal-600">{no}</span>
      <h2 className="text-[11pt] font-extrabold uppercase tracking-[0.14em] text-slate-900">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-slate-200" />
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dotted border-slate-300 py-2">
      <dt className="shrink-0 font-mono text-[7.5pt] uppercase tracking-[0.12em] text-slate-500">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-right text-[10pt] font-semibold text-slate-900">
        {value}
      </dd>
    </div>
  )
}

function CheckRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dotted border-slate-300 py-2">
      <span className="text-[9.5pt] text-slate-700">{label}</span>
      <span
        className={`font-mono text-[8pt] font-bold uppercase tracking-[0.14em] ${
          ok ? "text-emerald-700" : "text-rose-600"
        }`}
      >
        {ok ? "✓ Confirmed" : "✕ Missing"}
      </span>
    </div>
  )
}

export function PrintSummary({ assessment, pricing }: PrintSummaryProps) {
  const { company, scope, authentication, selectedTestIds, addonIds, authorization } = assessment

  const selectedTests = securityTests.filter((test) => selectedTestIds.includes(test.id))
  const selectedAddons = addons.filter((addon) => addonIds.includes(addon.id))

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    tests: selectedTests.filter((test) => test.category === category),
  })).filter((group) => group.tests.length > 0)

  const rules = [
    { label: "Written authorization to test", ok: authorization.authorized },
    { label: "Declared scope only", ok: authorization.inScopeOnly },
    { label: "No destructive testing", ok: authorization.noDestructive },
    { label: "Preliminary estimate acknowledged", ok: authorization.preliminary },
  ]

  const snapshot = [
    { label: "Scope", value: scope.size ? scopeSizeLabels[scope.size] : "—" },
    {
      label: "Environment",
      value: company.environment ? environmentLabel(company.environment) : "—",
    },
    { label: "Security areas", value: `${pricing.selectedTestCount}` },
    { label: "Duration", value: `${formatDuration(pricing)} days` },
    {
      label: "Est. price",
      value: `${formatPriceRange(pricing)} ${pricingConfig.currency}`,
      accent: true,
    },
  ]

  return (
    <div className="mx-auto w-[210mm] bg-white p-[14mm] font-sans text-slate-900">
      <div aria-hidden className="mb-8 h-1.5 w-full bg-teal-600" />

      <header className="pb-7">
        <div className="flex items-start justify-between gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-teal-400">
                <ShieldCheck className="size-7" />
              </span>
              <div>
                <p className="font-mono text-[8.5pt] font-bold uppercase tracking-[0.22em] text-teal-600">
                  Security Assessment
                </p>
                <h1 className="mt-1 text-[22pt] font-extrabold leading-none tracking-tight text-slate-950">
                  Request Engineering Review
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-[75%] text-[9.5pt] leading-relaxed text-slate-600">
              Structured scope of work for penetration testing, prepared for scoping and final
              quotation.
            </p>
          </div>
          <div className="w-[172px] shrink-0 space-y-2">
            <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5">
              <p className="font-mono text-[6.5pt] font-bold uppercase tracking-[0.16em] text-slate-500">
                Reference
              </p>
              <p className="mt-0.5 font-mono text-[11pt] font-extrabold text-slate-900">
                {referenceCode(company.companyName)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5">
              <p className="font-mono text-[6.5pt] font-bold uppercase tracking-[0.16em] text-slate-500">
                Prepared for
              </p>
              <p className="mt-0.5 text-[9.5pt] font-bold leading-snug text-slate-900">
                {company.companyName || "Not specified"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5">
              <p className="font-mono text-[6.5pt] font-bold uppercase tracking-[0.16em] text-slate-500">
                Date
              </p>
              <p className="mt-0.5 text-[9.5pt] font-semibold text-slate-800">{preparedOn()}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="grid gap-8">
        <section className="break-inside-avoid">
          <div className="grid grid-cols-5 overflow-hidden rounded-lg border border-slate-200">
            {snapshot.map((stat, index) => {
              const accented = Boolean(stat.accent)
              return (
                <div
                  key={stat.label}
                  className={`px-4 py-3.5 ${accented ? "bg-teal-600 text-white" : "bg-slate-50"} ${
                    index > 0 ? "border-l border-slate-200" : ""
                  }`}
                >
                  <p
                    className={`font-mono text-[6.5pt] font-bold uppercase tracking-[0.14em] ${
                      accented ? "text-teal-100" : "text-slate-500"
                    }`}
                  >
                    {stat.label}
                  </p>
                  <p
                    className={`mt-1.5 text-[13pt] font-extrabold leading-none ${
                      accented ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-x-10">
          <section className="break-inside-avoid">
            <SectionTitle no="01" title="Target & Company" />
            <dl>
              <Detail label="Company" value={company.companyName || "Not specified"} />
              <Detail label="Target URL" value={company.targetUrl || "Not specified"} />
              <Detail label="Industry" value={company.industry || "Not specified"} />
              <Detail
                label="Environment"
                value={
                  company.environment ? environmentLabel(company.environment) : "Not specified"
                }
              />
              <Detail label="Contact" value={company.contactEmail || "Not specified"} />
            </dl>
          </section>

          <section className="break-inside-avoid">
            <SectionTitle no="02" title="Access & Authentication" />
            <dl>
              <Detail
                label="Access model"
                value={
                  authentication.model
                    ? authModelLabels[authentication.model]
                    : "Not specified"
                }
              />
              <Detail
                label="Test accounts"
                value={testAccountLabels[authentication.testAccounts]}
              />
              <Detail
                label="Admin account"
                value={authentication.hasAdminAccount ? "Yes" : "No"}
              />
            </dl>
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-mono text-[7pt] font-bold uppercase tracking-[0.14em] text-slate-500">
                Application size
              </p>
              <p className="mt-1 text-[10.5pt] font-bold text-slate-900">
                {scope.size
                  ? `${scopeSizeLabels[scope.size]} Web Application`
                  : "Not specified"}
              </p>
            </div>
          </section>
        </div>

        <section className="break-inside-avoid">
          <SectionTitle no="03" title={`Security Areas (${pricing.selectedTestCount})`} />
          {grouped.length > 0 ? (
            <div className="space-y-2.5">
              {grouped.map((group) => (
                <div
                  key={group.category}
                  className="grid grid-cols-[120px_1fr] items-start gap-4 rounded-lg border border-slate-200 px-4 py-3"
                >
                  <div className="flex items-center gap-2 pt-0.5">
                    <span
                      aria-hidden
                      className={`size-2.5 rounded-full ${CATEGORY_DOTS[group.category]}`}
                    />
                    <span className="text-[8pt] font-bold uppercase tracking-wider text-slate-700">
                      {group.category}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-1.5 text-[7pt] font-bold text-slate-500">
                      {group.tests.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tests.map((test) => (
                      <span
                        key={test.id}
                        className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-[8.5pt] font-semibold text-slate-800"
                      >
                        {test.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10pt] text-slate-500">No security areas selected.</p>
          )}
        </section>

        <section className="break-inside-avoid">
          <SectionTitle no="04" title={`Additional Services (${pricing.addonCount})`} />
          {selectedAddons.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedAddons.map((addon) => (
                <span
                  key={addon.id}
                  className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-1.5 text-[9pt] font-semibold text-teal-900"
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-teal-600" />
                  {addon.shortName}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[10pt] text-slate-500">No additional services selected.</p>
          )}
        </section>

        <section className="break-inside-avoid">
          <SectionTitle no="05" title="Rules of Engagement" />
          <div className="grid grid-cols-2 gap-x-10">
            {rules.map((rule) => (
              <CheckRow key={rule.label} {...rule} />
            ))}
          </div>
        </section>

        <section className="break-inside-avoid">
          <SectionTitle no="06" title="Estimation" />
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border-2 border-slate-900 bg-slate-950 px-5 py-4 text-white">
              <p className="font-mono text-[7.5pt] font-bold uppercase tracking-[0.18em] text-teal-400">
                Estimated duration
              </p>
              <p className="mt-1.5 text-[15pt] font-extrabold leading-none">
                {formatDuration(pricing)}{" "}
                <span className="text-[9pt] font-semibold text-slate-300">business days</span>
              </p>
            </div>
            <div className="rounded-lg border-2 border-slate-900 bg-slate-950 px-5 py-4 text-white">
              <p className="font-mono text-[7.5pt] font-bold uppercase tracking-[0.18em] text-teal-400">
                Estimated price
              </p>
              <p className="mt-1.5 text-[15pt] font-extrabold leading-none">
                {formatPriceRange(pricing)}{" "}
                <span className="text-[9pt] font-semibold text-slate-300">
                  {pricingConfig.currency}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <div className="flex items-center justify-between gap-4 border-b border-dotted border-slate-300 px-4 py-2">
              <span className="text-[9pt] text-slate-600">Base assessment</span>
              <span className="text-[9.5pt] font-semibold text-slate-900">
                {formatMoney(pricing.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-dotted border-slate-300 px-4 py-2">
              <span className="text-[9pt] text-slate-600">Additional services</span>
              <span className="text-[9.5pt] font-semibold text-slate-900">
                {formatMoney(pricing.addonsAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 bg-slate-900 px-4 py-2.5 text-white">
              <span className="font-mono text-[8pt] font-bold uppercase tracking-[0.14em] text-slate-300">
                Projected total range
              </span>
              <span className="text-[11.5pt] font-extrabold text-teal-400">
                {formatPriceRange(pricing)} {pricingConfig.currency}
              </span>
            </div>
          </div>

          <p className="mt-3 font-mono text-[7.5pt] uppercase tracking-[0.14em] text-slate-500">
            Status: Pending manual review — final quotation issued after scope confirmation.
          </p>
        </section>
      </main>

      <footer className="mt-10 border-t border-slate-300 pt-5">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="font-mono text-[7pt] font-bold uppercase tracking-[0.2em] text-slate-500">
              Confidential
            </p>
            <p className="mt-1.5 text-[8pt] leading-relaxed text-slate-500">
              This document is a preliminary request for security assessment services and does not
              constitute a contract or a binding quotation. Scope, pricing and timeline are subject
              to written authorization and final review.
            </p>
            <p className="mt-2 font-mono text-[7.5pt] uppercase tracking-[0.16em] text-slate-500">
              Contact: {company.contactEmail || "n/a"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[7pt] font-bold uppercase tracking-[0.2em] text-slate-500">
              Authorized by
            </p>
            <div className="mt-7 inline-block w-44 border-b border-slate-400" />
            <p className="mt-1.5 text-[7.5pt] text-slate-500">Name & signature</p>
          </div>
        </div>
      </footer>
    </div>
  )
}