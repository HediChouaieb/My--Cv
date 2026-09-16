import { NextResponse } from "next/server"
import {
  buildPayloadFromRequest,
  hasCredentials,
  sendEmail,
} from "@/lib/notify"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    if (!hasCredentials()) {
      return NextResponse.json(
        { error: "SMTP credentials not configured" },
        { status: 500 }
      )
    }

    const body = await request.json().catch(() => ({}))

    const params = (body.params && typeof body.params === "object"
      ? body.params
      : {}) as Record<string, string>

    const payload = buildPayloadFromRequest(
      request,
      String(body.url || "Unknown"),
      String(body.pathname || " / "),
      String(body.referrer || ""),
      params
    )

    await sendEmail(payload)

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[notify] POST failed:", message)
    return NextResponse.json(
      { error: "Failed to send notification", detail: message },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    if (!hasCredentials()) {
      return NextResponse.json(
        { error: "SMTP credentials not configured" },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const reservedKeys = new Set(["page", "pathname", "referrer"])

    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      if (!reservedKeys.has(key)) params[key] = value
    })

    const payload = buildPayloadFromRequest(
      request,
      searchParams.get("page") || request.headers.get("referer") || "Unknown",
      searchParams.get("pathname") || " / ",
      searchParams.get("referrer") || "",
      params
    )

    await sendEmail(payload)

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[notify] GET failed:", message)
    return NextResponse.json(
      { error: "Failed to send notification", detail: message },
      { status: 500 }
    )
  }
}