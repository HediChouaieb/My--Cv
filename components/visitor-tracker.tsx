"use client"

import { useEffect } from "react"

export function VisitorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const trackingKey = "visit-tracked"
    let tracked = false
    try {
      tracked = window.sessionStorage.getItem(trackingKey) === "1"
    } catch {
      // sessionStorage unavailable, send anyway
    }

    if (tracked) return

    const url = window.location.href
    const pathname = window.location.pathname
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    )

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        pathname,
        referrer: document.referrer || "",
        params,
      }),
      keepalive: true,
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          console.warn(
            "[tracker] Notification failed:",
            res.status,
            body?.detail || body?.error || res.statusText
          )
        }
      })
      .catch((error) => {
        console.warn("[tracker] Notification request failed:", error)
      })

    try {
      window.sessionStorage.setItem(trackingKey, "1")
    } catch {
      // ignore
    }
  }, [])

  return null
}