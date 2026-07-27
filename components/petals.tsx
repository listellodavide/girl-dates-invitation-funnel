"use client"

import { useMemo } from "react"

const PETALS = 14

// Decorative falling flower petals in the background.
export function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: PETALS }).map((_, i) => ({
        id: i,
        left: `${Math.round((i / PETALS) * 100 + (i % 3) * 4)}%`,
        size: 10 + ((i * 7) % 16),
        duration: 9 + ((i * 3) % 10),
        delay: -((i * 1.7) % 12),
        hue: i % 2 === 0 ? "text-primary/40" : "text-secondary/40",
      })),
    [],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`animate-petal absolute top-0 ${p.hue}`}
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c1.5 3 4.5 4.5 4.5 8A4.5 4.5 0 0 1 12 14.5 4.5 4.5 0 0 1 7.5 10C7.5 6.5 10.5 5 12 2Z" />
            <path d="M12 22c-1.5-3-4.5-4.5-4.5-8A4.5 4.5 0 0 1 12 9.5 4.5 4.5 0 0 1 16.5 14c0 3.5-3 5-4.5 8Z" opacity="0.7" />
          </svg>
        </span>
      ))}
    </div>
  )
}
