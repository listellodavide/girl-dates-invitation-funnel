"use client"

import { FunnelCard } from "@/components/funnel-card"
import { MENU_OPTIONS } from "@/components/steps/menu-step"

const WHATSAPP_NUMBER = "393762485844"
const WHATSAPP_DISPLAY = "+39 376 248 5844"

type FinalStepProps = {
  date: string
  time: string
  menu: string | null
  onRestart: () => void
}

function formatDate(value: string) {
  if (!value) return ""
  const d = new Date(`${value}T00:00:00`)
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

function formatTime(value: string) {
  if (!value) return ""
  const [h, m] = value.split(":").map(Number)
  const suffix = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`
}

export function FinalStep({ date, time, menu, onRestart }: FinalStepProps) {
  const menuLabel = MENU_OPTIONS.find((o) => o.id === menu)?.label ?? "a little surprise"
  const prettyDate = formatDate(date)
  const prettyTime = formatTime(time)

  const message =
    `Hi Davide! 🌸 It's a YES! Our date is set for ${prettyDate} at ${prettyTime}. ` +
    `I'm feeling ${menuLabel}. You'll pick me up, right? Can't wait! 💕`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <FunnelCard>
      <div className="animate-pop-in mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/15 text-5xl">
        <span aria-hidden="true">💌</span>
      </div>

      <h1 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
        It&apos;s official! <span aria-hidden="true">🎉</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-pretty text-base text-muted-foreground">
        A confirmation has been sent to <span className="font-semibold text-foreground">Davide</span>.
        He&apos;ll pick you up — get ready for your date!
      </p>

      <dl className="mx-auto mt-7 max-w-sm space-y-3 rounded-2xl bg-muted/60 p-5 text-left text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Day</dt>
          <dd className="font-semibold text-foreground">{prettyDate}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Time</dt>
          <dd className="font-semibold text-foreground">{prettyTime}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Vibe</dt>
          <dd className="font-semibold text-foreground">{menuLabel}</dd>
        </div>
      </dl>

      <p className="mx-auto mt-6 max-w-md text-pretty text-sm text-muted-foreground">
        Please continue the chat with Davide on WhatsApp at{" "}
        <span className="font-semibold text-foreground">{WHATSAPP_DISPLAY}</span>.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <span aria-hidden="true">💬</span> Continue on WhatsApp
        </a>
        <button
          type="button"
          onClick={onRestart}
          className="min-h-11 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          start over
        </button>
      </div>
    </FunnelCard>
  )
}
