import { Metadata } from 'next';

import { appEnv, getAppConfig } from '@/config/app';
import { OFFICIAL_URL } from '@/const/url';
import { translation } from '@/server/translation';

const title = 'KingSlime';

const { SITE_URL = OFFICIAL_URL } = getAppConfig();
const BASE_PATH = appEnv.NEXT_PUBLIC_BASE_PATH;

// if there is a base path, then we don't need the manifest
const noManifest = !!BASE_PATH;

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await translation('metadata');
  return {
    appleWebApp: {
      statusBarStyle: 'black-translucent',
      title,
    },
    description: t('chat.description'),
    icons: {
      apple: '/apple-touch-icon.png',
      icon: '/favicon.ico',
      shortcut: '/favicon-32x32.ico',
    },
    manifest: noManifest ? undefined : '/manifest.json',
    metadataBase: new URL(SITE_URL),
    openGraph: {
      description: t('chat.description'),
      images: [
        {
          alt: t('KingSlime'),
          height: 640,
          url: '/og/cover.png',
          width: 1200,
        },
      ],
      locale: 'en-US',
      siteName: title,
      title: title,
      type: 'website',
      url: OFFICIAL_URL,
    },
    title: {
      default: t('KingSlime'),
      template: '%s · KingSlime',
    },
    twitter: {
      card: 'summary_large_image',
      description: t('chat.description'),
      images: ['/og/cover.png'],
      site: '@lobehub',
      title: t('KingSlime'),
    },
  };
};
