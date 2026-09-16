import nodemailer from "nodemailer"

const GMAIL_USER = process.env.GMAIL_USER || ""
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || ""

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
  return Boolean(GMAIL_USER && GMAIL_APP_PASSWORD)
}

export function getUserAgentInfo(raw: string | null) {
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

export function buildEmailText(payload: VisitPayload) {
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

export async function sendNotification(payload: VisitPayload) {
  if (!hasCredentials()) {
    throw new Error("SMTP credentials not configured")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 5_000,
    socketTimeout: 10_000,
  })

  const mailOptions = {
    from: `"Portfolio Tracker" <${GMAIL_USER}>`,
    to: "hadichouaieb20@gmail.com",
    subject: `🔔 New visitor — your portfolio was opened${payload.pathname === " / " ? "" : ` (${payload.pathname})`}`,
    text: buildEmailText(payload),
  }

  const maxRetries = 3
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await transporter.sendMail(mailOptions)
      return
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.error(
        `[notify] Attempt ${attempt}/${maxRetries} failed:`,
        lastError.message
      )
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt))
      }
    }
  }

  throw lastError
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
  const { ua, browser, os } = getUserAgentInfo(request.headers.get("user-agent"))

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