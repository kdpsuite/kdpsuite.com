'use client';

import { useEffect } from 'react';
import { getAdConfig, logAdConfiguration } from '@/lib/ad-config';

/**
 * Ad Script Loader Component
 * Loads all necessary ad service scripts
 * Should be placed in the root layout
 */
export default function AdScriptLoader() {
  useEffect(() => {
    const config = getAdConfig();

    // Log configuration for debugging
    if (process.env.NODE_ENV === 'development') {
      logAdConfiguration();
    }

    // Load Google AdSense script
    if (config.googleAdsense.enabled && config.googleAdsense.clientId.startsWith('ca-pub-')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.googleAdsense.clientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Load Propeller Ads script if enabled
    if (config.propellerAds.enabled && config.propellerAds.zoneId) {
      const script = document.createElement('script');
      script.src = `https://a.propellerads.com/api/ads.js?zone=${config.propellerAds.zoneId}`;
      script.async = true;
      document.head.appendChild(script);
    }

    // Initialize ad refresh interval
    if (config.limits.adRefreshInterval > 0) {
      const interval = setInterval(() => {
        try {
          // @ts-expect-error - adsbygoogle is injected by Google AdSense script
          if (window.adsbygoogle) {
            // @ts-expect-error - adsbygoogle is injected by Google AdSense script
            window.adsbygoogle.push({});
          }
        } catch (error) {
          console.error('Error refreshing ads:', error);
        }
      }, config.limits.adRefreshInterval);

      return () => clearInterval(interval);
    }
  }, []);

  return null;
}
