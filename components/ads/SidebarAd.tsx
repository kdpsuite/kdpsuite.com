'use client';

import { useEffect } from 'react';
import { getAdConfig, isGoogleAdsenseConfigured } from '@/lib/ad-config';

interface SidebarAdProps {
  slot?: string;
  className?: string;
}

/**
 * Sidebar Ad Component
 * Displays vertical ads optimized for sidebar placement
 * Typically 300x600 or 300x250 format
 */
export default function SidebarAd({ slot = 'SIDEBAR_AD_SLOT', className = '' }: SidebarAdProps) {
  const config = getAdConfig();

  useEffect(() => {
    if (isGoogleAdsenseConfigured()) {
      try {
        // @ts-expect-error - adsbygoogle is injected by Google AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading sidebar ad:', error);
      }
    }
  }, []);

  if (!config.display.showSidebarAds) {
    return null;
  }

  // Show placeholder if AdSense is not configured
  if (!isGoogleAdsenseConfigured()) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-[300px] ${className}`}>
        <p className="text-gray-600 text-sm font-body font-semibold">Sidebar Ad</p>
        <p className="text-gray-500 text-xs mt-2 font-body">
          300x600 or 300x250 format
        </p>
        <p className="text-gray-500 text-xs mt-1 font-body">
          Slot: {slot}
        </p>
      </div>
    );
  }

  return (
    <div className={`sticky top-20 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          width: '300px',
          height: '600px',
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
      />
    </div>
  );
}
