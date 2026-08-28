'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, session, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, isMounted, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.fullName || '',
        username: user.username || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.access_token) {
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      updateUser({
        fullName: data.profile.full_name,
        username: data.profile.username,
        bio: data.profile.bio,
      });

      setStatus('success');
      setMessage('Profile updated successfully');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  if (!isMounted || isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E63] mx-auto mb-4"></div>
          <p className="text-gray-700 font-body">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/kdpsuitelogo.png"
              alt="KDP Creator Suite Logo"
              width={180}
              height={40}
              priority
            />
          </Link>
          <Link
            href="/dashboard"
            className="text-[#E91E63] font-semibold hover:underline font-heading"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-neutral mb-2 font-heading">Edit Profile</h1>
          <p className="text-gray-700 mb-8 font-body">{user.email}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                required
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                placeholder="your-username"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-semibold text-neutral mb-2 font-heading">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#E91E63] focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 font-body"
                placeholder="Tell us about yourself"
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
              {status === 'loading' ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
