import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:8080'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params
    const url = `${API_BASE_URL}/students/${path}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('API GET Error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500, headers: corsHeaders })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params
    const body = await request.text()
    const url = `${API_BASE_URL}/students/${path}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('API POST Error:', error)
    return NextResponse.json({ error: 'Failed to post' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params
    const body = await request.text()
    const url = `${API_BASE_URL}/students/${path}`
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('API PUT Error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string }> }
) {
  try {
    const { path } = await params
    
    // Handle nested paths like "delete/2"
    let backendPath = path
    if (path.startsWith('delete/')) {
      // Extract the ID and keep the full path for backend
      backendPath = path // This will be "delete/2", which matches backend API
    }
    
    const url = `${API_BASE_URL}/students/${backendPath}`
    
    console.log('DELETE URL:', url)
    console.log('DELETE path:', path)
    
    const response = await fetch(url, {
      method: 'DELETE',
    })

    console.log('DELETE response status:', response.status)
    console.log('DELETE response ok:', response.ok)

    // Always return 204 for DELETE to indicate successful deletion
    // even if the backend returns 404 (resource might already be deleted)
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('API DELETE Error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500, headers: corsHeaders })
  }
}
