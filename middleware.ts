import { NextResponse } from 'next/server';

const COOKIE_NAME = '__Host-poc_session';

const hasSessionCookie = (cookieHeader: string | null) => {
  if (!cookieHeader) return false;
  return cookieHeader.split(';').some((part) => part.trim().startsWith(`${COOKIE_NAME}=`));
};

export function middleware(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!hasSessionCookie(cookieHeader)) {
    const url = new URL('/login', request.url);
    url.searchParams.set('next', '/app');
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/app']
};
