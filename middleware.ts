import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token as { role?: string };

    // লগইন পেজে লগইন করা থাকলে রোলের উপর ভিত্তি করে রিডিরেক্ট
    if (pathname === '/signin' && token) {
      const role = token.role;
      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else if (role === 'lawyer') {
        return NextResponse.redirect(new URL('/lawyer', req.url));
      } else {
        return NextResponse.redirect(new URL('/users', req.url));
      }
    }

    // সুরক্ষিত রাউটগুলোর জন্য রোল চেক
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    if (pathname.startsWith('/lawyer') && token?.role !== 'lawyer') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith('/admin') || pathname.startsWith('/lawyer') || pathname.startsWith('/users')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/signin', '/admin/:path*', '/lawyer/:path*', '/users/:path*'],
};