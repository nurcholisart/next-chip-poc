import { NextResponse } from 'next/server';

const COOKIE_NAME = '__Host-poc_session';

const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  const entries = cookieHeader.split(';').map((part) => part.trim()).filter(Boolean);
  const result = {};
  for (const entry of entries) {
    const idx = entry.indexOf('=');
    if (idx === -1) continue;
    const key = entry.slice(0, idx).trim();
    const value = entry.slice(idx + 1).trim();
    result[key] = value;
  }
  return result;
};

const decodeSession = (value) => {
  try {
    const json = Buffer.from(value, 'base64url').toString('utf8');
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
};

export async function GET(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);
  const rawCookiePresent = cookieHeader.includes(`${COOKIE_NAME}=`);
  const sessionValue = cookies[COOKIE_NAME];
  const session = sessionValue ? decodeSession(sessionValue) : null;

  return NextResponse.json({
    hasCookie: Boolean(sessionValue),
    email: session?.email || null,
    rawCookiePresent
  });
}
