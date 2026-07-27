"use client"

import { useState } from "react"
import { Petals } from "@/components/petals"
import { ProposalStep } from "@/components/steps/proposal-step"
import { YesStep } from "@/components/steps/yes-step"
import { ScheduleStep } from "@/components/steps/schedule-step"
import { MenuStep } from "@/components/steps/menu-step"
import { FinalStep } from "@/components/steps/final-step"

type Step = "proposal" | "yes" | "schedule" | "menu" | "final"

function tomorrowISO() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

export function DateFunnel() {
  const [step, setStep] = useState<Step>("proposal")
  const [date, setDate] = useState(tomorrowISO)
  const [time, setTime] = useState("20:00")
  const [menu, setMenu] = useState<string | null>(null)

  const restart = () => {
    setStep("proposal")
    setDate(tomorrowISO())
    setTime("20:00")
    setMenu(null)
  }

  return (
    <main className="romantic-bg relative flex min-h-[100dvh] items-center justify-center px-4 py-10">
      <Petals />
      <div className="relative z-10 w-full max-w-xl">
        {step === "proposal" && <ProposalStep onYes={() => setStep("yes")} />}

        {step === "yes" && <YesStep onNext={() => setStep("schedule")} />}

        {step === "schedule" && (
          <ScheduleStep
            date={date}
            time={time}
            onDateChange={setDate}
            onTimeChange={setTime}
            onBack={() => setStep("yes")}
            onNext={() => setStep("menu")}
          />
        )}

        {step === "menu" && (
          <MenuStep
            selected={menu}
            onSelect={setMenu}
            onBack={() => setStep("schedule")}
            onNext={() => setStep("final")}
          />
        )}

        {step === "final" && (
          <FinalStep date={date} time={time} menu={menu} onRestart={restart} />
        )}
      </div>
    </main>
  )
}
