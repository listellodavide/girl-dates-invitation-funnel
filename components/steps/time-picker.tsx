"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type TimePickerProps = {
  value: string // "HH:MM" 24-hour
  onChange: (value: string) => void
  id?: string
}

// Build all 15-minute slots across 24 hours: 00:00, 00:15, ... 23:45
function buildSlots() {
  const slots: string[] = []
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
    }
  }
  return slots
}

function to12h(value: string) {
  const [hStr, mStr] = value.split(":")
  const h = Number(hStr)
  const suffix = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${mStr} ${suffix}`
}

export function TimePicker({ value, onChange, id }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const slots = useMemo(() => buildSlots(), [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Scroll selected slot into view when opening
  useEffect(() => {
    if (!open || !listRef.current) return
    const selected = listRef.current.querySelector<HTMLButtonElement>('[data-selected="true"]')
    if (selected) {
      selected.scrollIntoView({ block: "center" })
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-input bg-background px-4 text-base text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
      >
        <span className="font-semibold">{to12h(value)}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl shadow-primary/10"
        >
          <div ref={listRef} className="max-h-56 overflow-y-auto py-1">
            {slots.map((slot) => {
              const isSelected = slot === value
              return (
                <button
                  key={slot}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-selected={isSelected}
                  onClick={() => {
                    onChange(slot)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <span className="font-medium">{slot}</span>
                  <span className={isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {to12h(slot)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
