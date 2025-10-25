"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  enrollmentDate: string
  status: "Active" | "Inactive"
}

interface StudentListProps {
  students: Student[]
  loading: boolean
  onDelete?: (id: number) => void
  onEdit?: (student: Student) => void
}

export function StudentList({ students, loading, onDelete, onEdit }: StudentListProps) {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="text-slate-600 mt-4">Loading students...</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50 border-b border-slate-200">
          <TableRow>
            <TableHead className="text-slate-700 font-semibold">Name</TableHead>
            <TableHead className="text-slate-700 font-semibold">Email</TableHead>
            <TableHead className="text-slate-700 font-semibold">Enrollment Date</TableHead>
            <TableHead className="text-slate-700 font-semibold">Status</TableHead>
            <TableHead className="text-slate-700 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-slate-600">
                No students found. Add your first student to get started.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="text-slate-900 font-medium">{student.name}</TableCell>
                <TableCell className="text-slate-600">{student.email}</TableCell>
                <TableCell className="text-slate-600">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      student.status === "Active"
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-slate-100 text-slate-600 border border-slate-300"
                    }
                  >
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      onClick={() => onEdit && onEdit(student)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                      onClick={() => onDelete && onDelete(student.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
