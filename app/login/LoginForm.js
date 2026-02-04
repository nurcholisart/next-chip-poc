'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/app';
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Login failed');
      }

      router.replace(next);
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={busy}>
        {busy ? 'Signing in...' : 'Login'}
      </button>
      {error ? <div className="error">{error}</div> : null}
    </form>
  );
}
