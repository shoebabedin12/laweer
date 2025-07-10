import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('__session')?.value;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
