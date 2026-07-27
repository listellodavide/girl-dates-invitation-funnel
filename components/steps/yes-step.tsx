"use client"

import { FunnelCard } from "@/components/funnel-card"

export function YesStep({ onNext }: { onNext: () => void }) {
  return (
    <FunnelCard>
      <div className="animate-pop-in mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/15 text-6xl">
        <span aria-hidden="true">🥳</span>
      </div>

      <h1 className="text-balance font-serif text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
        Wait, you actually said yes?? <span aria-hidden="true">😭</span>
      </h1>

      <p className="mx-auto mt-4 max-w-md text-pretty text-base text-muted-foreground">
        {"I was so ready for you to say no "}
        <span aria-hidden="true">🥹</span>
        {" \u2014 okay, let\u2019s make this official and plan it!"}
      </p>

      <div className="mt-9 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="min-h-11 rounded-full bg-primary px-10 py-3 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          okay okay! <span aria-hidden="true">→</span>
        </button>
      </div>
    </FunnelCard>
  )
}
