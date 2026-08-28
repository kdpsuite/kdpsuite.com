'use client';

import ReferralProgram from '@/components/ReferralProgram';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const dashboardStats = [
  { label: 'Books Published', value: '0', note: 'Coming soon' },
  { label: 'Total Revenue', value: '$0', note: 'Coming soon' },
  { label: 'Conversions', value: '0', note: 'Coming soon' },
  { label: 'Average Rating', value: '—', note: 'Coming soon' },
];

export default function DashboardPage() {
  const { user, session, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, isMounted, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E63] mx-auto mb-4"></div>
          <p className="text-gray-700 font-body">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/kdpsuitelogo.png"
              alt="KDP Creator Suite Logo"
              width={180}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-body">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-[#E91E63] text-white rounded-full hover:bg-pink-700 transition-colors font-semibold font-heading"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-200">
            <h1 className="text-4xl font-bold text-neutral mb-2 font-heading">
              Welcome, {user.fullName}!
            </h1>
            <p className="text-xl text-gray-700 font-body">
              You&apos;re now logged into KDP Creator Suite
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200"
              >
                <p className="text-sm font-semibold text-gray-500 mb-2 font-heading">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-neutral mb-1 font-heading">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 font-body">{stat.note}</p>
              </div>
            ))}
          </div>

          {/* User Profile Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-neutral mb-6 font-heading">Profile Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Full Name
                </label>
                <p className="text-gray-800 font-body">{user.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Email
                </label>
                <p className="text-gray-800 font-body">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Subscription Tier
                </label>
                <p className="text-gray-800 font-body capitalize">
                  {user.subscriptionTier || 'Free'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  User ID
                </label>
                <p className="text-gray-700 font-body text-sm font-mono">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-neutral mb-6 font-heading">Session Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Session Status
                </label>
                <p className="text-gray-800 font-body">
                  {session ? 'Authenticated' : 'Not authenticated'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-2 font-heading">
                  Token Expires In
                </label>
                <p className="text-gray-800 font-body">
                  {session?.expires_in ? `${Math.floor(session.expires_in / 3600)} hours` : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/features" className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-neutral mb-2 font-heading">Features</h3>
              <p className="text-gray-700 font-body">Explore all KDP Creator Suite features</p>
            </Link>

            <Link href="/pricing" className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-neutral mb-2 font-heading">Upgrade Plan</h3>
              <p className="text-gray-700 font-body">View pricing and upgrade your subscription</p>
            </Link>

            <Link href="/dashboard/profile" className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-bold text-neutral mb-2 font-heading">Edit Profile</h3>
              <p className="text-gray-700 font-body">Update your name, username, and bio</p>
            </Link>

            <Link href="/contact" className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-neutral mb-2 font-heading">Contact Support</h3>
              <p className="text-gray-700 font-body">Get help from our support team</p>
            </Link>
          </div>
        </div>
      </div>

      <ReferralProgram />
    </div>
  );
}

