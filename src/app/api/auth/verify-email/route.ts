import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiBaseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return NextResponse.json({ success: false, message: 'API base URL not configured' }, { status: 500 });
    }

    const res = await fetch(`${apiBaseUrl}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    const response = NextResponse.json(data, { status: res.status });

    const token = data?.data?.token;
    if (token && res.ok) {
      response.cookies.set('kwetu_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Verification failed';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
