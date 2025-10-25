"use client"

import { useState, useEffect } from "react"
import { StudentDashboard } from "@/components/student-dashboard"
import { StudentForm } from "@/components/student-form"
import { StudentList } from "@/components/student-list"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import { getAllStudents, saveStudent, updateStudent, deleteStudent, getStudentCount } from "@/lib/api"

interface Student {
  id: number
  nom: string
  email?: string
  enrollmentDate?: string
  status?: string
}

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [page])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const data = await getAllStudents()
      // Transform backend data to match frontend format
      const transformedStudents = data.map((student: any) => ({
        id: student.id,
        name: student.nom,
        email: student.email || `${student.nom.toLowerCase()}@example.com`,
        enrollmentDate: student.enrollmentDate || new Date().toISOString().split("T")[0],
        status: student.status || "Active",
        nom: student.nom
      }))
      setStudents(transformedStudents)
    } catch (error) {
      console.error("Failed to fetch students:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async (studentData: any) => {
    try {
      let result
      if (editingStudent) {
        // Update existing student
        result = await updateStudent({ 
          id: editingStudent.id, 
          nom: studentData.name || studentData.nom 
        })
      } else {
        // Create new student
        result = await saveStudent({ nom: studentData.name || studentData.nom })
      }
      
      if (result) {
        // Refresh the student list
        fetchStudents()
        setShowForm(false)
        setEditingStudent(null)
      }
    } catch (error) {
      console.error("Failed to save student:", error)
    }
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setShowForm(true)
  }

  const handleDeleteStudent = async (id: number) => {
    try {
      const success = await deleteStudent(id)
      if (success) {
        // Refresh the student list
        fetchStudents()
      }
    } catch (error) {
      console.error("Failed to delete student:", error)
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingStudent(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <StudentDashboard>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Student Management</h1>
                <p className="text-slate-600 text-sm">Manage and track student information</p>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <StudentForm 
                onSubmit={handleAddStudent} 
                onCancel={handleCancelForm}
                student={editingStudent}
              />
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="text-slate-600 text-sm font-medium">Total Students</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{students.length}</div>
              <div className="text-green-600 text-xs mt-2">↑ 12% from last month</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="text-slate-600 text-sm font-medium">Active Students</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">
                {students.filter((s) => s.status === "Active").length}
              </div>
              <div className="text-green-600 text-xs mt-2">Currently enrolled</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="text-slate-600 text-sm font-medium">Enrollment Rate</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">
                {students.length > 0
                  ? Math.round((students.filter((s) => s.status === "Active").length / students.length) * 100)
                  : 0}
                %
              </div>
              <div className="text-blue-600 text-xs mt-2">Success rate</div>
            </div>
          </div>

          {/* Student List Section */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <StudentList 
              students={students} 
              loading={loading} 
              onDelete={handleDeleteStudent}
              onEdit={handleEditStudent}
            />
          </div>
        </div>
      </StudentDashboard>
    </main>
  )
}
