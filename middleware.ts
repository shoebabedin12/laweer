import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // const { pathname } = req.nextUrl;

  // Get the JWT token using getToken
  // const token = await getToken({ req, secret: process.env.SESSION_SECRET });

  // Redirect authenticated users from /signin to role-specific pages
  // if (pathname === '/signin' && token) {
  //   const role = token?.role;
  //   if (role === 'admin') {
  //     return NextResponse.redirect(new URL('/admin', req.url));
  //   } else if (role === 'lawyer') {
  //     return NextResponse.redirect(new URL('/lawyer', req.url));
  //   } else {
  //     return NextResponse.redirect(new URL('/users', req.url));
  //   }
  // }

  // Protect routes based on role
  // if (pathname.startsWith('/admin') && token?.role !== 'admin') {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }
  // if (pathname.startsWith('/lawyer') && token?.role !== 'lawyer') {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }
  // if (pathname.startsWith('/users') && !token) {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/admin/:path*', '/lawyer/:path*', '/users/:path*'],
};