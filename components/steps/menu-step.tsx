"use client"

import { FunnelCard } from "@/components/funnel-card"

export const MENU_OPTIONS = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "bar", label: "Bar", emoji: "🍸" },
  { id: "taco", label: "Taco / Ethnic", emoji: "🌮" },
  { id: "sushi", label: "Sushi Restaurant", emoji: "🍣" },
  { id: "kebab", label: "Kebab", emoji: "🥙" },
  { id: "aperitivo", label: "Drink / Aperitivo", emoji: "🍹" },
] as const

type MenuStepProps = {
  selected: string | null
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function MenuStep({ selected, onSelect, onNext, onBack }: MenuStepProps) {
  return (
    <FunnelCard>
      <h1 className="text-balance font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {"What are we feeling? "}
        <span aria-hidden="true">🍽️✨</span>
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">pick your vibe</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {MENU_OPTIONS.map((opt) => {
          const isActive = selected === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(opt.id)}
              className={`flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-4 transition-all duration-200 hover:-translate-y-0.5 ${
                isActive
                  ? "border-primary bg-accent shadow-md shadow-primary/20 ring-2 ring-primary/50"
                  : "border-border/60 bg-muted/50 hover:bg-accent/60"
              }`}
            >
              <span aria-hidden="true" className="text-3xl">
                {opt.emoji}
              </span>
              <span className="text-sm font-medium text-foreground">{opt.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
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
          disabled={!selected}
          className="min-h-11 rounded-full bg-primary px-9 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          next <span aria-hidden="true">→</span>
        </button>
      </div>
    </FunnelCard>
  )
}
