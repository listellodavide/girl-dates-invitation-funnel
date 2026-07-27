"use client"

import { FunnelCard } from "@/components/funnel-card"
import { TimePicker } from "@/components/steps/time-picker"

type ScheduleStepProps = {
  date: string
  time: string
  onDateChange: (value: string) => void
  onTimeChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function ScheduleStep({
  date,
  time,
  onDateChange,
  onTimeChange,
  onNext,
  onBack,
}: ScheduleStepProps) {
  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <FunnelCard>
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/15 text-4xl">
        <span aria-hidden="true">📅</span>
      </div>

      <h1 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {"So\u2026 when are you free?"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">pick a day and a time that works for you</p>

      <div className="mt-8 space-y-5 text-left">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-semibold text-foreground">
            Pick a Day <span aria-hidden="true">🗓️</span>
          </label>
          <input
            id="date"
            type="date"
            value={date}
            min={todayStr}
            onChange={(e) => onDateChange(e.target.value)}
            className="min-h-12 w-full rounded-2xl border border-input bg-background px-4 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-semibold text-foreground">
            Pick a Time <span aria-hidden="true">🕗</span>
          </label>
          <TimePicker id="time" value={time} onChange={onTimeChange} />
          <p className="mt-2 text-xs text-muted-foreground">
            default is 8:00 PM — pick any 15-minute slot you like
          </p>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <span aria-hidden="true">←</span> back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!date || !time}
          className="min-h-11 rounded-full bg-primary px-9 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          set the date! <span aria-hidden="true">♥</span>
        </button>
      </div>
    </FunnelCard>
  )
}
