import nodemailer from "nodemailer"

const USER = process.env.GMAIL_USER || ""
const PASS = process.env.GMAIL_APP_PASSWORD || ""
const TO = process.env.NOTIFY_TO_EMAIL || "hadichouaieb20@gmail.com"

export interface VisitPayload {
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

export function hasCredentials() {
  return Boolean(USER && PASS)
}

export function buildEmailBody(payload: VisitPayload) {
  const lines = [
    "Your portfolio was just visited.",
    "",
    "=== Details ===",
    `Full URL    : ${payload.url}`,
    `Page        : ${payload.pathname}`,
    `Visitor IP  : ${payload.ip}`,
    `Device      : ${payload.os} (${payload.browser})`,
    `User Agent  : ${payload.ua}`,
    `Referrer    : ${payload.referrer}`,
    `Time        : ${payload.timestamp}`,
    "",
    "URL Parameters:",
  ]

  if (Object.keys(payload.params).length) {
    for (const [key, value] of Object.entries(payload.params)) {
      lines.push(`  ${key} = ${value}`)
    }
  } else {
    lines.push("  none found")
  }

  return lines.join("\n")
}

export function parseUserAgent(
  raw: string | null
): { ua: string; browser: string; os: string } {
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

export function nowUtc() {
  return new Date().toLocaleString("en-GB", {
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "long",
  })
}

export function buildPayloadFromRequest(
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
  const { ua, browser, os } = parseUserAgent(
    request.headers.get("user-agent")
  )

  return {
    url,
    pathname,
    referrer,
    ip: ip || "Unknown",
    ua,
    browser,
    os,
    timestamp: nowUtc(),
    params,
  }
}

export async function sendEmail(payload: VisitPayload) {
  if (!hasCredentials()) {
    throw new Error("SMTP credentials not configured")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: USER, pass: PASS },
  })

  const body = buildEmailBody(payload)
  const subject = `New visitor (${payload.pathname})`

  await transporter.sendMail({
    from: `"Portfolio Tracker" <${USER}>`,
    to: TO,
    subject,
    text: body,
  })
}
