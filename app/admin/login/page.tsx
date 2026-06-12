'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../../components/admin/LoginForm';

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Simple authentication - in production, use proper auth
    if (email === 'rushikeshdavange9@gmail.com' && password === 'rushi@123') {
      localStorage.setItem('admin-auth', 'true');
      router.replace('/admin');
    } else {
      setError('Invalid credentials. Use rushikeshdavange9@gmail.com / rushi@123');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-midnight px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-slate-400">Access your portfolio dashboard</p>
        </div>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-sm text-slate-300">
          <p className="font-semibold text-slate-100">Admin credentials</p>
          <p>Email: <span className="font-medium text-cyan-300">rushikeshdavange9@gmail.com</span></p>
          <p>Password: <span className="font-medium text-cyan-300">rushi@123</span></p>
        </div>
      </div>
    </div>
  );
}