import { NextResponse } from 'next/server';

const COOKIE_NAME = '__Host-poc_session';

const buildSessionValue = (email) => {
  const payload = { email, issuedAt: new Date().toISOString() };
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
};

const buildSetCookie = (value) => {
  const parts = [
    `${COOKIE_NAME}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=None',
    'Partitioned'
  ];
  return parts.join('; ');
};

export async function POST(request) {
  const { email } = await request.json().catch(() => ({ email: '' }));

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const sessionValue = buildSessionValue(email);
  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', buildSetCookie(sessionValue));
  return response;
}
