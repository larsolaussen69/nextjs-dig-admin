
import { getUserExercisesByEmail } from '@/lib/sql/user-exercises';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // Optionally, validate the user ID or authenticate the request here
  if (!email) {
    return NextResponse.json({ success: false, error: 'User email is required' }, { status: 400 });
  }
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.API_SECRET;
  
  if (apiKey !== validApiKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  try {
    const dbUser = await getUserExercisesByEmail(email);
        return NextResponse.json({ success: true, data: dbUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user' }, { status: 500 });
  }
}