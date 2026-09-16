import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const GMAIL_USER = process.env.GMAIL_USER || ""
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ""

function getUserAgentInfo(raw: string | null) {
  const ua = raw || "Unknown"
  let browser = "Unknown"
  let os = "Unknown"

  const browsers: Array<[RegExp, string]> = [
    [/Edg\//, "Edge"],
    [/Chrome\//, "Chrome"],
    [/Firefox\//, "Firefox"],
    [/Safari\//, "Safari"],
    [/Opera|OPR\//, "Opera"],
    [/MSIE|Trident/, "Internet Explorer"],
  ]
  for (const [regex, name] of browsers) {
    if (regex.test(ua)) {
      browser = name
      break
    }
  }

  const systems: Array<[RegExp, string]> = [
    [/Windows NT 10|Windows NT 11/, "Windows 10/11"],
    [/Windows/, "Windows"],
    [/iPhone/, "iPhone"],
    [/iPad/, "iPad"],
    [/Mac OS/, "macOS"],
    [/Android/, "Android"],
    [/Linux/, "Linux"],
  ]
  for (const [regex, name] of systems) {
    if (regex.test(ua)) {
      os = name
      break
    }
  }

  return { ua, browser, os }
}

interface VisitPayload {
  url: string
  pathname: string
  referrer: string
  ip: string
  ua: string
  browser: string
  os: string
  timestamp: string
  params: Record<string, string>
}

function buildEmailText(payload: VisitPayload) {
  const paramsText = Object.keys(payload.params).length
    ? Object.entries(payload.params)
        .map(([key, value]) => `  · ${key} = ${value}`)
        .join("\n")
    : "  · none found"

  return [
    `🔥 Your portfolio was just visited!`,
    ``,
    `====================================`,
    ``,
    `Full URL    : ${payload.url}`,
    `Page        : ${payload.pathname || " / "}`,
    `Visitor IP  : ${payload.ip}`,
    `Device      : ${payload.os} (${payload.browser})`,
    `User Agent  : ${payload.ua}`,
    `Referrer    : ${payload.referrer || "None"}`,
    `Time        : ${payload.timestamp}`,
    ``,
    `URL Parameters:`,
    paramsText,
    ``,
    `====================================`,
  ].join("\n")
}

async function sendNotification(payload: VisitPayload) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    from: `"Portfolio Tracker" <${GMAIL_USER}>`,
    to: "hadichouaieb20@gmail.com",
    subject: `🔔 New visitor — your portfolio was opened${payload.pathname === " / " ? "" : ` (${payload.pathname})`}`,
    text: buildEmailText(payload),
  }

  await transporter.sendMail(mailOptions)
}

function buildPayloadFromRequest(
  request: Request,
  url: string,
  pathname: string,
  referrer: string,
  params: Record<string, string>
): VisitPayload {
  const forwarded =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    ""
  const ip = forwarded.split(",")[0].trim()
  const { ua, browser, os } = getUserAgentInfo(request.headers.get("user-agent"))

  return {
    url,
    pathname,
    referrer,
    ip: ip || "Unknown",
    ua,
    browser,
    os,
    timestamp: new Date().toLocaleString("en-GB", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "long",
    }),
    params,
  }
}

export async function POST(request: Request) {
  try {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
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

    await sendNotification(payload)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Notification failed:", error)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
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
      searchParams.get("page") || request.referrer || "Unknown",
      searchParams.get("pathname") || " / ",
      searchParams.get("referrer") || "",
      params
    )

    await sendNotification(payload)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Notification failed:", error)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}