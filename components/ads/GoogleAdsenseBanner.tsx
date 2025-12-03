'use client';

import { useEffect } from 'react';
import { isGoogleAdsenseConfigured } from '@/lib/ad-config';

interface GoogleAdsenseBannerProps {
  slot: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

/**
 * Google AdSense Banner Ad Component
 * Displays responsive banner ads from Google AdSense
 * 
 * Usage:
 * <GoogleAdsenseBanner slot="1234567890" format="horizontal" />
 * 
 * To get your ad slots:
 * 1. Go to https://adsense.google.com
 * 2. Navigate to Ads > Ad units
 * 3. Create a new ad unit and copy the slot ID
 */
export default function GoogleAdsenseBanner({
  slot,
  format = 'horizontal',
  className = '',
}: GoogleAdsenseBannerProps) {
  useEffect(() => {
    // Only load ads if AdSense is properly configured
    if (!isGoogleAdsenseConfigured()) {
      console.warn('Google AdSense is not properly configured. Please set NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID in your environment variables.');
      return;
    }

    // Push ads when component mounts
    try {
      // @ts-expect-error - adsbygoogle is injected by Google AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading Google AdSense:', error);
    }
  }, [slot]);

  // Don't render if AdSense is not configured
  if (!isGoogleAdsenseConfigured()) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`}>
        <p className="text-gray-600 text-sm font-body">
          Google AdSense Banner Placeholder (Slot: {slot})
        </p>
        <p className="text-gray-500 text-xs mt-2 font-body">
          Configure NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID to enable ads
        </p>
      </div>
    );
  }

  const getAdDimensions = () => {
    switch (format) {
      case 'vertical':
        return 'w-[300px] h-[600px]';
      case 'rectangle':
        return 'w-[300px] h-[250px]';
      case 'horizontal':
      default:
        return 'w-full h-[90px]';
    }
  };

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <ins
        className={`adsbygoogle ${getAdDimensions()}`}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
