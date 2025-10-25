"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"

interface StudentDashboardProps {
  children: ReactNode
}

export function StudentDashboard({ children }: StudentDashboardProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
