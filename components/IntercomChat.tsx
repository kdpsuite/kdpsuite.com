'use client';

/**
 * Intercom Chat Component
 * Live chat support integration
 */

import { useEffect } from 'react';

type IntercomAction =
  | 'boot'
  | 'shutdown'
  | 'show'
  | 'hide'
  | 'update';

interface IntercomBootOptions {
  app_id: string;
}

declare global {
  interface Window {
    intercomSettings?: {
      api_base: string;
      app_id: string;
    };
    Intercom?: (action: IntercomAction, options?: IntercomBootOptions) => void;
  }
}

export default function IntercomChat() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

    if (!appId) {
      console.warn(
        'Intercom App ID not configured. Live chat will not be available.'
      );
      return;
    }

    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: appId,
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://widget.intercom.io/widget/${appId}`;

    script.onload = () => {
      window.Intercom?.('boot', { app_id: appId });
    };

    document.head.appendChild(script);

    return () => {
      window.Intercom?.('shutdown');
      script.remove();
    };
  }, []);

  return null;
}
