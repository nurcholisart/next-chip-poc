import { NextResponse } from 'next/server';

const COOKIE_NAME = '__Host-poc_session';

const buildClearCookie = () => {
  const parts = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=None',
    'Partitioned',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  ];
  return parts.join('; ');
};

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', buildClearCookie());
  return response;
}
