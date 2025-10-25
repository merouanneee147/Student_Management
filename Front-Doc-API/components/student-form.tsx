"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  enrollmentDate?: string
  status?: string
}

interface StudentFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  student?: Student | null
}

export function StudentForm({ onSubmit, onCancel, student }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: student?.name || "",
    email: student?.email || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      onSubmit(formData)
      setFormData({ name: "", email: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          {student ? "Edit Student" : "Add New Student"}
        </h2>
        <button type="button" onClick={onCancel} className="text-slate-600 hover:text-slate-900 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 bg-transparent"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
        >
          {student ? "Update Student" : "Add Student"}
        </Button>
      </div>
    </form>
  )
}
