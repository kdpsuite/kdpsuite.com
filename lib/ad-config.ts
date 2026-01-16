/**
 * Ad Service Configuration
 * Centralized configuration for all advertising and monetization services
 */

export interface AdConfig {
  googleAdsense: {
    clientId: string;
    enabled: boolean;
  };
  googleAdManager: {
    networkCode: string;
    enabled: boolean;
  };
  mediavine: {
    siteId: string;
    enabled: boolean;
  };
  adthrive: {
    siteId: string;
    enabled: boolean;
  };
  propellerAds: {
    zoneId: string;
    enabled: boolean;
  };
  amazonAssociates: {
    associateId: string;
    enabled: boolean;
  };
  display: {
    showBannerAds: boolean;
    showSidebarAds: boolean;
    showInlineAds: boolean;
    showPopupAds: boolean;
    showNativeAds: boolean;
  };
  limits: {
    maxAdsPerPage: number;
    adRefreshInterval: number;
    viewabilityThreshold: number;
  };
}

/**
 * Get ad configuration from environment variables
 */
export const getAdConfig = (): AdConfig => {
  return {
    googleAdsense: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxxxxxxxx',
      enabled: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === 'true',
    },
    googleAdManager: {
      networkCode: process.env.NEXT_PUBLIC_GOOGLE_AD_MANAGER_NETWORK_CODE || '',
      enabled: process.env.NEXT_PUBLIC_GOOGLE_AD_MANAGER_ENABLED === 'true',
    },
    mediavine: {
      siteId: process.env.NEXT_PUBLIC_MEDIAVINE_SITE_ID || '',
      enabled: process.env.NEXT_PUBLIC_MEDIAVINE_ENABLED === 'true',
    },
    adthrive: {
      siteId: process.env.NEXT_PUBLIC_ADTHRIVE_SITE_ID || '',
      enabled: process.env.NEXT_PUBLIC_ADTHRIVE_ENABLED === 'true',
    },
    propellerAds: {
      zoneId: process.env.NEXT_PUBLIC_PROPELLER_ZONE_ID || '',
      enabled: process.env.NEXT_PUBLIC_PROPELLER_ENABLED === 'true',
    },
    amazonAssociates: {
      associateId: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID || '',
      enabled: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ENABLED === 'true',
    },
    display: {
      showBannerAds: process.env.NEXT_PUBLIC_SHOW_BANNER_ADS !== 'false',
      showSidebarAds: process.env.NEXT_PUBLIC_SHOW_SIDEBAR_ADS !== 'false',
      showInlineAds: process.env.NEXT_PUBLIC_SHOW_INLINE_ADS !== 'false',
      showPopupAds: process.env.NEXT_PUBLIC_SHOW_POPUP_ADS === 'true',
      showNativeAds: process.env.NEXT_PUBLIC_SHOW_NATIVE_ADS !== 'false',
    },
    limits: {
      maxAdsPerPage: parseInt(process.env.NEXT_PUBLIC_MAX_ADS_PER_PAGE || '3', 10),
      adRefreshInterval: parseInt(process.env.NEXT_PUBLIC_AD_REFRESH_INTERVAL || '30000', 10),
      viewabilityThreshold: parseInt(process.env.NEXT_PUBLIC_AD_VIEWABILITY_THRESHOLD || '50', 10),
    },
  };
};

/**
 * Check if Google AdSense is properly configured
 */
export const isGoogleAdsenseConfigured = (): boolean => {
  const config = getAdConfig();
  return (
    config.googleAdsense.enabled &&
    config.googleAdsense.clientId !== 'ca-pub-xxxxxxxxxxxxxxxx' &&
    config.googleAdsense.clientId.startsWith('ca-pub-')
  );
};

/**
 * Check if any ad service is enabled
 */
export const hasAnyAdServiceEnabled = (): boolean => {
  const config = getAdConfig();
  return (
    config.googleAdsense.enabled ||
    config.googleAdManager.enabled ||
    config.mediavine.enabled ||
    config.adthrive.enabled ||
    config.propellerAds.enabled ||
    config.amazonAssociates.enabled
  );
};

/**
 * Get enabled ad services
 */
export const getEnabledAdServices = (): string[] => {
  const config = getAdConfig();
  const services: string[] = [];

  if (config.googleAdsense.enabled) services.push('Google AdSense');
  if (config.googleAdManager.enabled) services.push('Google Ad Manager');
  if (config.mediavine.enabled) services.push('Mediavine');
  if (config.adthrive.enabled) services.push('AdThrive');
  if (config.propellerAds.enabled) services.push('Propeller Ads');
  if (config.amazonAssociates.enabled) services.push('Amazon Associates');

  return services;
};

/**
 * Log ad configuration for debugging
 */
export const logAdConfiguration = (): void => {
  const config = getAdConfig();
  console.log('=== Ad Service Configuration ===');
  console.log('Google AdSense:', config.googleAdsense.enabled ? 'Enabled' : 'Disabled');
  console.log('Google Ad Manager:', config.googleAdManager.enabled ? 'Enabled' : 'Disabled');
  console.log('Mediavine:', config.mediavine.enabled ? 'Enabled' : 'Disabled');
  console.log('AdThrive:', config.adthrive.enabled ? 'Enabled' : 'Disabled');
  console.log('Propeller Ads:', config.propellerAds.enabled ? 'Enabled' : 'Disabled');
  console.log('Amazon Associates:', config.amazonAssociates.enabled ? 'Enabled' : 'Disabled');
  console.log('Max Ads Per Page:', config.limits.maxAdsPerPage);
  console.log('Ad Refresh Interval:', config.limits.adRefreshInterval, 'ms');
  console.log('================================');
};
