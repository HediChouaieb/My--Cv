"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export default function InfoPage() {
  const router = useRouter()
  const sent = useRef(false)

  useEffect(() => {
    if (sent.current) return
    sent.current = true

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
            "[info] Notification failed:",
            res.status,
            body?.detail || body?.error || res.statusText
          )
        }
      })
      .catch((error) => {
        console.warn("[info] Notification request failed:", error)
      })

    router.replace("/")
  }, [router])

  return null
}