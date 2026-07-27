"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { FunnelCard } from "@/components/funnel-card"

export function ProposalStep({ onYes }: { onYes: () => void }) {
  // Offset applied to the "no" button so it runs away from the pointer.
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [dodges, setDodges] = useState(0)
  const areaRef = useRef<HTMLDivElement>(null)

  const runAway = useCallback(() => {
    const area = areaRef.current
    if (!area) return
    const bounds = area.getBoundingClientRect()
    const maxX = Math.max(60, bounds.width / 2 - 40)
    const maxY = 70
    const x = (Math.random() * 2 - 1) * maxX
    const y = (Math.random() * 2 - 1) * maxY
    setNoPos({ x, y })
    setDodges((d) => d + 1)
  }, [])

  const teases = [
    "no",
    "you sure?",
    "think again",
    "really?",
    "nope, can't click",
    "just say yes 🙈",
  ]
  const noLabel = teases[Math.min(dodges, teases.length - 1)]

  return (
    <FunnelCard>
      <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-3xl border border-border/60 shadow-sm">
        <Image
          src="/surprised-pug.png"
          alt="A surprised little pug hoping you say yes"
          width={224}
          height={224}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        <span aria-hidden="true">🌸 </span>
        Will you go on a date with me?
        <span aria-hidden="true"> 🌸</span>
      </h1>

      <div
        ref={areaRef}
        className="relative mt-9 flex min-h-[120px] flex-wrap items-center justify-center gap-6"
      >
        <button
          type="button"
          onClick={onYes}
          className="min-h-11 rounded-full bg-primary px-10 py-3 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          YES <span aria-hidden="true">♥</span>
        </button>

        <button
          type="button"
          onMouseEnter={runAway}
          onMouseDown={runAway}
          onTouchStart={runAway}
          onFocus={runAway}
          aria-label="No (but this button keeps running away)"
          style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
          className="min-h-11 rounded-full bg-secondary px-8 py-3 text-base font-medium text-secondary-foreground shadow-md transition-transform duration-200 ease-out will-change-transform"
        >
          {noLabel} <span aria-hidden="true">🐾</span>
        </button>
      </div>

      {dodges > 1 && (
        <p className="mt-6 text-sm text-muted-foreground">
          {"(the \u201cno\u201d button is a little shy today)"}
        </p>
      )}
    </FunnelCard>
  )
}
