'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createBrowserClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!supabase) {
      setStatus('error');
      setMessage('Authentication is not configured');
      return;
    }

    try {
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/reset-password`
          : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        throw error;
      }

      setStatus('success');
      setMessage('If an account exists for that email, a reset link has been sent.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Failed to send reset email. Please try again.'
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
            <h1 className="text-3xl font-bold text-neutral mb-2 font-heading">Reset Password</h1>
            <p className="text-gray-700 mb-8 font-body">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
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
                {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-center text-gray-700 mt-6 font-body">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-[#E91E63] hover:underline font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
