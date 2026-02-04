import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>CHIPS POC Login</h1>
        <p className="small">Dummy credentials only. Any email/password will be accepted.</p>
        <Suspense fallback={<p className="small">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
