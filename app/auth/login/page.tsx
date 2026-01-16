'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validate form
    if (!formData.email || !formData.password) {
      setStatus('error');
      setMessage('Please enter your email and password');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error || 'Failed to log in');
        return;
      }

      // Store session
      localStorage.setItem('auth_session', JSON.stringify(data.session));
      localStorage.setItem('auth_user', JSON.stringify(data.user));

      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('remember_email', formData.email);
      }

      setStatus('success');
      setMessage('Logged in successfully! Redirecting...');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
            <h1 className="text-3xl font-bold text-neutral mb-2 font-heading">Welcome Back</h1>
            <p className="text-gray-700 mb-8 font-body">
              Log in to access your KDP Creator Suite dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-neutral font-heading">
                    Password
                  </label>
                  <a href="#" className="text-sm text-[#E91E63] hover:underline font-semibold font-body">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                  required
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#E91E63] cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700 font-body cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Status Message */}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-3 bg-[#E91E63] text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-heading"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Log In'
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-700 mt-6 font-body">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-[#E91E63] hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

