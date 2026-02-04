'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AppPage() {
  const router = useRouter();
  const [now, setNow] = useState(() => new Date());
  const [whoami, setWhoami] = useState({ hasCookie: false, email: null, rawCookiePresent: false });
  const [whoamiRaw, setWhoamiRaw] = useState('');
  const [navStable, setNavStable] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const embedUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/app`;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setNavStable(true);
  }, []);

  const loadWhoami = async () => {
    const res = await fetch('/api/whoami', { credentials: 'include' });
    const data = await res.json();
    setWhoami(data);
    setWhoamiRaw(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    loadWhoami();
  }, []);

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    router.replace('/login');
  };

  const copyEmbedUrl = async () => {
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopyStatus('Copied.');
      setTimeout(() => setCopyStatus(''), 1200);
    } catch (err) {
      setCopyStatus('Copy failed.');
      setTimeout(() => setCopyStatus(''), 1200);
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Logged in</h1>
        <p className="small">Server-protected page for CHIPS validation.</p>

        <div className="status-strip">
          <span className="badge">Server cookie: {whoami.hasCookie ? 'yes' : 'no'}</span>
          <span className="badge">Raw cookie header: {whoami.rawCookiePresent ? 'present' : 'missing'}</span>
          <span className="badge">Client nav stable: {navStable ? 'yes' : 'no'}</span>
          <button className="secondary" type="button" onClick={copyEmbedUrl}>
            Copy embed URL
          </button>
          <span className="small">{copyStatus}</span>
        </div>

        <div className="row">
          <div>
            <h2>Debug Panel</h2>
            <p className="kv"><strong>Current time:</strong> {now.toLocaleString()}</p>
            <p className="kv"><strong>Email from cookie:</strong> {whoami.email || '—'}</p>
            <button type="button" onClick={loadWhoami}>Refresh whoami</button>
          </div>

          <div>
            <h2>Session</h2>
            <p className="kv"><strong>Cookie name:</strong> __Host-poc_session</p>
            <p className="kv"><strong>Partitioned:</strong> required</p>
            <button type="button" onClick={logout}>Logout</button>
          </div>
        </div>

        <h2 style={{ marginTop: 20 }}>Whoami JSON</h2>
        <pre>{whoamiRaw || 'Loading...'}</pre>
      </div>
    </main>
  );
}
