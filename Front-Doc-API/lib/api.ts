// Use Next.js API routes to avoid CORS issues
const API_BASE_URL = '/api'

export interface Student {
  id?: number
  nom: string
}

export interface StudentWithId extends Student {
  id: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
}

// Get all students
export async function getAllStudents(): Promise<Student[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/students/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch students')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching students:', error)
    return []
  }
}

// Save a new student
export async function saveStudent(student: Student): Promise<Student | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/students/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })

    if (!response.ok) {
      throw new Error('Failed to save student')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error saving student:', error)
    return null
  }
}

// Update an existing student
export async function updateStudent(student: StudentWithId): Promise<Student | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${student.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom: student.nom }),
    })

    if (!response.ok) {
      throw new Error('Failed to update student')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating student:', error)
    return null
  }
}

// Delete a student
export async function deleteStudent(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/students/delete/${id}`, {
      method: 'DELETE',
    })

    // Accept both 200 and 204 as success
    if (response.status === 200 || response.status === 204 || response.ok) {
      console.log('Student deleted successfully')
      return true
    }

    // If we get 404, the student might not exist, but we'll still return true
    // to avoid errors when trying to delete items that were already deleted
    if (response.status === 404) {
      console.log('Student might not exist or already deleted - treating as success')
      return true
    }

    throw new Error('Failed to delete student')
  } catch (error) {
    console.error('Error deleting student:', error)
    return false
  }
}

// Get student count
export async function getStudentCount(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/students/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch student count')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching student count:', error)
    return 0
  }
}

// Get students by year
export async function getStudentsByYear(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/students/byYear`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch students by year')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching students by year:', error)
    return []
  }
}
