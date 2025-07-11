import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = body.token;

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('__session', token, {
    path: '/',
    httpOnly: false, // middleware can't read HttpOnly cookies
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 5, // 5 days
  });

  return response;
}
