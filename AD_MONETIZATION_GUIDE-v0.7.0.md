# Ad Monetization Integration Guide - v0.7.0

## Overview

This guide provides complete instructions for setting up and configuring ad services on your KDP Creator Suite website. The system supports multiple ad networks including Google AdSense, Google Ad Manager, Mediavine, AdThrive, Propeller Ads, and Amazon Associates.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Google AdSense Setup](#google-adsense-setup)
3. [Other Ad Networks](#other-ad-networks)
4. [Ad Components](#ad-components)
5. [Configuration](#configuration)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

## Quick Start

### 1. Enable Google AdSense

1. Go to [Google AdSense](https://adsense.google.com)
2. Sign in with your Google account
3. Add your website and get approved
4. Copy your **Publisher ID** (starts with `ca-pub-`)
5. Update `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
   NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED=true
   ```

### 2. Create Ad Units

1. In AdSense dashboard, go to **Ads > Ad units**
2. Create new ad units for different placements:
   - **Homepage Banner**: `HOME_BANNER_SLOT`
   - **Features Banner**: `FEATURES_BANNER_SLOT`
   - **Blog Banner**: `BLOG_BANNER_SLOT`
   - **Sidebar Ad**: `SIDEBAR_AD_SLOT`
   - **Native Ad**: `NATIVE_AD_SLOT_ID`

3. Copy each slot ID and update the components

### 3. Deploy

Push your changes to GitHub and Vercel will automatically deploy with the new ad configuration.

## Google AdSense Setup

### Step 1: Create AdSense Account

1. Visit [Google AdSense](https://adsense.google.com)
2. Click "Sign up now"
3. Sign in with your Google account
4. Enter your website URL
5. Complete the application process
6. Wait for approval (usually 24-48 hours)

### Step 2: Get Your Publisher ID

1. After approval, go to **Settings > Account**
2. Find your **Publisher ID** (format: `ca-pub-xxxxxxxxxxxxxxxx`)
3. Copy this ID

### Step 3: Create Ad Units

#### Banner Ads (Horizontal)
- Size: 728x90, 970x90, or responsive
- Placement: Between content sections
- Slot ID format: `LOCATION_BANNER_SLOT`

#### Rectangle Ads (Vertical)
- Size: 300x250, 336x280
- Placement: Sidebar or content edges
- Slot ID format: `LOCATION_RECTANGLE_SLOT`

#### Native Ads
- Blends with content
- Placement: Between blog posts or content
- Slot ID format: `NATIVE_AD_SLOT_ID`

### Step 4: Update Configuration

**File: `.env.local`**
```env
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED=true
```

**File: `components/ads/GoogleAdsenseBanner.tsx`**
```typescript
// Update slot IDs for each placement
<GoogleAdsenseBanner slot="YOUR_SLOT_ID" format="horizontal" />
```

## Other Ad Networks

### Mediavine

**Requirements:**
- Minimum 25,000 monthly page views
- 6+ months of content
- Google Analytics installed

**Setup:**
1. Apply at [Mediavine](https://www.mediavine.com)
2. Get approved and receive your Site ID
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_MEDIAVINE_SITE_ID=your-site-id
   NEXT_PUBLIC_MEDIAVINE_ENABLED=true
   ```

**Benefits:**
- Higher CPM rates than AdSense
- Better ad quality and relevance
- Dedicated support

### AdThrive

**Requirements:**
- Minimum 100,000 monthly page views
- 6+ months of content
- Established audience

**Setup:**
1. Apply at [AdThrive](https://www.adthrive.com)
2. Get approved and receive your Site ID
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_ADTHRIVE_SITE_ID=your-site-id
   NEXT_PUBLIC_ADTHRIVE_ENABLED=true
   ```

**Benefits:**
- Premium ad network
- Highest CPM rates
- Advanced analytics

### Propeller Ads

**Setup:**
1. Sign up at [Propeller Ads](https://www.propellerads.com)
2. Create ad zones and get Zone IDs
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_PROPELLER_ZONE_ID=your-zone-id
   NEXT_PUBLIC_PROPELLER_ENABLED=true
   ```

### Amazon Associates

**Setup:**
1. Apply at [Amazon Associates](https://affiliate-program.amazon.com)
2. Get approved and receive your Associate ID
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_AMAZON_ASSOCIATE_ID=your-associate-id
   NEXT_PUBLIC_AMAZON_AFFILIATE_ENABLED=true
   ```

## Ad Components

### GoogleAdsenseBanner

Displays responsive banner ads.

**Usage:**
```tsx
import { GoogleAdsenseBanner } from '@/components/ads';

<GoogleAdsenseBanner 
  slot="YOUR_SLOT_ID" 
  format="horizontal"
  className="my-4"
/>
```

**Props:**
- `slot` (required): Ad slot ID from AdSense
- `format` (optional): `'horizontal'`, `'vertical'`, or `'rectangle'`
- `className` (optional): Additional CSS classes

### NativeAd

Displays native ads that blend with content.

**Usage:**
```tsx
import { NativeAd } from '@/components/ads';

<NativeAd showPlaceholder={true} />
```

**Props:**
- `showPlaceholder` (optional): Show placeholder if no ads configured
- `className` (optional): Additional CSS classes

### SidebarAd

Displays vertical ads for sidebar placement.

**Usage:**
```tsx
import { SidebarAd } from '@/components/ads';

<SidebarAd slot="SIDEBAR_AD_SLOT" />
```

### AdScriptLoader

Automatically loads all ad service scripts.

**Usage:**
```tsx
// Already included in app/layout.tsx
import { AdScriptLoader } from '@/components/ads';

<AdScriptLoader />
```

## Configuration

### Environment Variables

**File: `.env.local`**

```env
# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED=true

# Google Ad Manager
NEXT_PUBLIC_GOOGLE_AD_MANAGER_NETWORK_CODE=
NEXT_PUBLIC_GOOGLE_AD_MANAGER_ENABLED=false

# Mediavine
NEXT_PUBLIC_MEDIAVINE_SITE_ID=
NEXT_PUBLIC_MEDIAVINE_ENABLED=false

# AdThrive
NEXT_PUBLIC_ADTHRIVE_SITE_ID=
NEXT_PUBLIC_ADTHRIVE_ENABLED=false

# Propeller Ads
NEXT_PUBLIC_PROPELLER_ZONE_ID=
NEXT_PUBLIC_PROPELLER_ENABLED=false

# Amazon Associates
NEXT_PUBLIC_AMAZON_ASSOCIATE_ID=
NEXT_PUBLIC_AMAZON_AFFILIATE_ENABLED=false

# Ad Display Settings
NEXT_PUBLIC_SHOW_BANNER_ADS=true
NEXT_PUBLIC_SHOW_SIDEBAR_ADS=true
NEXT_PUBLIC_SHOW_INLINE_ADS=true
NEXT_PUBLIC_SHOW_POPUP_ADS=false
NEXT_PUBLIC_SHOW_NATIVE_ADS=true

# Ad Frequency & Limits
NEXT_PUBLIC_MAX_ADS_PER_PAGE=3
NEXT_PUBLIC_AD_REFRESH_INTERVAL=30000
NEXT_PUBLIC_AD_VIEWABILITY_THRESHOLD=50
```

### Ad Configuration Utility

**File: `lib/ad-config.ts`**

Use this utility to access ad configuration:

```typescript
import { getAdConfig, isGoogleAdsenseConfigured } from '@/lib/ad-config';

// Get full configuration
const config = getAdConfig();

// Check if specific service is configured
if (isGoogleAdsenseConfigured()) {
  // Show ads
}

// Get enabled services
const enabledServices = getEnabledAdServices();
```

## Best Practices

### 1. Ad Placement

- **Above the fold**: 1 ad maximum
- **Between sections**: 1-2 ads
- **Sidebar**: 1-2 ads
- **Total per page**: 3-5 ads maximum

### 2. User Experience

- Don't place ads too close together
- Ensure ads don't obstruct content
- Use responsive ad sizes
- Test on mobile devices

### 3. Revenue Optimization

- Use multiple ad networks for better fill rates
- Monitor CPM rates and adjust placement
- Test different ad formats
- Use native ads for higher engagement

### 4. Compliance

- Include "Ads by Google" disclosure
- Follow AdSense policies
- Don't click your own ads
- Don't encourage users to click ads
- Maintain high-quality content

### 5. Performance

- Use lazy loading for ads
- Implement ad refresh intervals
- Monitor page load impact
- Use CDN for ad scripts

## Troubleshooting

### Ads Not Showing

**Problem:** Placeholder shows instead of ads

**Solutions:**
1. Verify `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID` is set correctly
2. Check that ID starts with `ca-pub-`
3. Ensure AdSense account is approved
4. Check browser console for errors
5. Wait 24-48 hours for new ad units to activate

### Low CPM Rates

**Solutions:**
1. Improve content quality
2. Increase page views
3. Target high-value keywords
4. Use multiple ad networks
5. Optimize ad placement

### Ad Blocking Issues

**Solutions:**
1. Implement ad blocker detection
2. Use server-side ad insertion
3. Try alternative ad networks
4. Educate users about supporting free content

### Performance Issues

**Solutions:**
1. Implement lazy loading
2. Reduce ad refresh interval
3. Use fewer ad units
4. Optimize images and content
5. Use CDN

## Monitoring & Analytics

### Google AdSense Dashboard

1. Track earnings and impressions
2. Monitor CPM and CPC rates
3. Analyze ad performance by placement
4. View audience demographics

### Google Analytics Integration

1. Set up conversion tracking for ad clicks
2. Monitor bounce rate with ads
3. Track user engagement
4. Analyze traffic sources

## Revenue Estimates

**Typical CPM Rates:**
- Google AdSense: $0.25 - $3.00
- Mediavine: $5.00 - $25.00
- AdThrive: $10.00 - $50.00

**Example Monthly Revenue:**
- 10,000 page views × $1.00 CPM = $10
- 100,000 page views × $2.00 CPM = $200
- 1,000,000 page views × $5.00 CPM = $5,000

## Support & Resources

- [Google AdSense Help](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Mediavine Support](https://www.mediavine.com/support)
- [AdThrive Support](https://www.adthrive.com/support)

## Next Steps

1. Set up Google AdSense account
2. Get your Publisher ID
3. Create ad units for each placement
4. Update environment variables
5. Deploy to production
6. Monitor performance and optimize
