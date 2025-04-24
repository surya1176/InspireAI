// app/facebook/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    
    // Handle your logic here
    console.log('Received data:', body)
    
    // Return a response
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Optionally, if you also want to handle GET requests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  const verify_token = process.env.TOKEN;

  if (mode === 'subscribe' && token === verify_token) {
    // If verification is successful, return the challenge
    return new Response(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  return new Response('Forbidden', { status: 403 });
}