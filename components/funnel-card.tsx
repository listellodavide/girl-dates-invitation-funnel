import type { ReactNode } from "react"

// Shared white rounded card that every funnel step renders inside.
export function FunnelCard({ children }: { children: ReactNode }) {
  return (
    <div className="animate-float-up w-full max-w-xl rounded-[2rem] border border-border/60 bg-card px-6 py-10 text-center shadow-[0_30px_80px_-30px_oklch(0.5_0.12_340/0.45)] sm:px-12 sm:py-12">
      {children}
    </div>
  )
}
