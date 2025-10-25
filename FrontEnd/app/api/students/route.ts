import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'http://localhost:8080'

// Handle CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

// GET handler - will be handled by dynamic routes
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'Not Found' }, { status: 404 })
}

// POST handler - will be handled by dynamic routes
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Not Found' }, { status: 404 })
}
