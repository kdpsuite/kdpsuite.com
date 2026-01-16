'use client';

import { useEffect } from 'react';
import { getAdConfig } from '@/lib/ad-config';

interface NativeAdProps {
  className?: string;
  showPlaceholder?: boolean;
}

/**
 * Native Ad Component
 * Displays native ads that blend with your content
 * Supports multiple ad networks
 */
export default function NativeAd({ className = '', showPlaceholder = true }: NativeAdProps) {
  const config = getAdConfig();

  useEffect(() => {
    // Load Mediavine script if enabled
    if (config.mediavine.enabled && config.mediavine.siteId) {
      const script = document.createElement('script');
      script.src = `https://www.mediavine.com/api/ads/serve/${config.mediavine.siteId}`;
      script.async = true;
      document.head.appendChild(script);
    }

    // Load AdThrive script if enabled
    if (config.adthrive.enabled && config.adthrive.siteId) {
      const script = document.createElement('script');
      script.src = `https://d.adthrive.com/ase.js`;
      script.async = true;
      script.setAttribute('data-site-id', config.adthrive.siteId);
      document.head.appendChild(script);
    }

    // Push Google AdSense ads
    if (config.googleAdsense.enabled) {
      try {
        // @ts-expect-error - adsbygoogle is injected by Google AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading ads:', error);
      }
    }
  }, [config.mediavine.enabled, config.mediavine.siteId, config.adthrive.enabled, config.adthrive.siteId, config.googleAdsense.enabled]);

  if (!config.display.showNativeAds) {
    return null;
  }

  // Show placeholder if no ad service is configured
  if (!config.mediavine.enabled && !config.adthrive.enabled && !config.googleAdsense.enabled) {
    if (!showPlaceholder) return null;

    return (
      <div className={`bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center my-6 ${className}`}>
        <p className="text-gray-600 font-semibold mb-2 font-heading">Native Ad Placeholder</p>
        <p className="text-gray-500 text-sm font-body">
          Configure Mediavine, AdThrive, or Google AdSense to display native ads here
        </p>
      </div>
    );
  }

  return (
    <div className={`my-6 ${className}`}>
      {/* Mediavine Native Ad */}
      {config.mediavine.enabled && config.mediavine.siteId && (
        <div className="mediavine-ad">
          {/* Mediavine will inject ads here */}
        </div>
      )}

      {/* AdThrive Native Ad */}
      {config.adthrive.enabled && config.adthrive.siteId && (
        <div className="adthrive-ad">
          {/* AdThrive will inject ads here */}
        </div>
      )}

      {/* Google AdSense Native Ad */}
      {config.googleAdsense.enabled && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
          data-ad-slot="NATIVE_AD_SLOT_ID"
          data-ad-format="native"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
