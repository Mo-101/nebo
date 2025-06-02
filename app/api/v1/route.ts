import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000/api/v1';

/**
 * API route handler that proxies requests to the backend
 */
export async function GET(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const path = pathname.replace(/^\/api\/v1/, '');
  
  try {
    const response = await fetch(`${BACKEND_URL}${path}${search}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying GET request to ${path}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const path = pathname.replace(/^\/api\/v1/, '');
  
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error proxying POST request to ${path}:`, error);
    return NextResponse.json(
      { error: 'Failed to send data to backend' },
      { status: 500 }
    );
  }
}
