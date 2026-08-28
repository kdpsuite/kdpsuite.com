'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createBrowserClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasRecoverySession(Boolean(session));
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!password || !confirmPassword) {
      setStatus('error');
      setMessage('Please fill in both password fields');
      return;
    }

    if (password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    if (!supabase) {
      setStatus('error');
      setMessage('Authentication is not configured');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      setStatus('success');
      setMessage('Password updated successfully. Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Failed to reset password. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-gradient-to-r from-[#E91E63] to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Image
              src="/kdpsuitelogo.png"
              alt="KDP Creator Suite Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-neutral mb-2 font-heading">Set New Password</h1>
            <p className="text-gray-700 mb-8 font-body">
              Choose a new password for your account.
            </p>

            {!hasRecoverySession && status !== 'success' && (
              <div className="mb-6 p-4 rounded-lg bg-yellow-50 text-yellow-800 border-2 border-yellow-200 font-body text-sm">
                Open the reset link from your email to activate this page.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                  required
                />
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg text-center font-medium font-body ${
                    status === 'success'
                      ? 'bg-green-50 text-green-700 border-2 border-green-200'
                      : status === 'error'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-[#E91E63] text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-heading"
              >
                {status === 'loading' ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            <p className="text-center text-gray-700 mt-6 font-body">
              <Link href="/auth/login" className="text-[#E91E63] hover:underline font-semibold">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
