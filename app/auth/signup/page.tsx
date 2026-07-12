'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'fair' | 'good' | 'strong'>('weak');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Check password strength
    if (name === 'password') {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrength = (password: string): 'weak' | 'fair' | 'good' | 'strong' => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength < 2) return 'weak';
    if (strength < 3) return 'fair';
    if (strength < 4) return 'good';
    return 'strong';
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'good':
        return 'bg-blue-500';
      case 'strong':
        return 'bg-green-500';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validate form
    if (!formData.fullName || !formData.email || !formData.password) {
      setStatus('error');
      setMessage('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters');
      return;
    }

    if (!formData.agreeToTerms) {
      setStatus('error');
      setMessage('You must agree to the terms of service');
      return;
    }

    try {
      const result = await signup(
        formData.email,
        formData.password,
        formData.fullName
      );

      setStatus('success');
      if (result.requiresEmailVerification) {
        setMessage('Account created. Check your email to verify your account before logging in.');
      } else {
        setMessage('Account created successfully! Redirecting...');
      }

      // Redirect based on whether an authenticated session was issued
      setTimeout(() => {
        router.push(result.requiresEmailVerification ? '/auth/login' : '/dashboard');
      }, 800);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setStatus('error');
      setMessage(message);
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
            <h1 className="text-3xl font-bold text-neutral mb-2 font-heading">Create Account</h1>
            <p className="text-gray-700 mb-8 font-body">
              Join KDP Creator Suite and start publishing today
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                  required
                />
              </div>

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
                <label htmlFor="password" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Password
                </label>
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
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full w-1/4 ${getStrengthColor()} transition-all`}></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 capitalize">{passwordStrength}</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Use 8+ characters with uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-[#E91E63] cursor-pointer"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700 font-body">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#E91E63] hover:underline font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#E91E63] hover:underline font-semibold">
                    Privacy Policy
                  </Link>
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
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-700 mt-6 font-body">
              Already have an account?{' '}
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

