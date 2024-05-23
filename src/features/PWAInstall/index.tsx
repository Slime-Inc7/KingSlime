'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PWA_INSTALL_ID } from '@/const/layoutTokens';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { usePlatform } from '@/hooks/usePlatform';
import { useGlobalStore } from '@/store/global';
import { preferenceSelectors } from '@/store/global/selectors';
import { useUserStore } from '@/store/user';

// @ts-ignore
const PWA: any = dynamic(() => import('@khmyznikov/pwa-install/dist/pwa-install.react.js'), {
  ssr: false,
});

const PWAInstall = memo(() => {
  const { t } = useTranslation('metadata');
  const { isPWA } = usePlatform();

  const { install, canInstall } = usePWAInstall();

  const isShowPWAGuide = useUserStore((s) => s.isShowPWAGuide);
  const [hidePWAInstaller, updatePreference] = useGlobalStore((s) => [
    preferenceSelectors.hidePWAInstaller(s),
    s.updatePreference,
  ]);

  // we need to make the pwa installer hidden by default
  useLayoutEffect(() => {
    sessionStorage.setItem('pwa-hide-install', 'true');
  }, []);

  const pwaInstall =
    // eslint-disable-next-line unicorn/prefer-query-selector
    typeof window === 'undefined' ? undefined : document.getElementById(PWA_INSTALL_ID);

  console.log(pwaInstall);

  // add an event listener to control the user close installer action
  useEffect(() => {
    if (!pwaInstall) return;

    const handler = (e: Event) => {
      const event = e as CustomEvent;
      console.log(event.detail);

      // it means user hide installer
      if (event.detail.message === 'dismissed') {
        updatePreference({ hidePWAInstaller: true });
      }
    };

    pwaInstall.addEventListener('pwa-user-choice-result-event', handler);
    return () => {
      pwaInstall.removeEventListener('pwa-user-choice-result-event', handler);
    };
  }, [pwaInstall]);

  // trigger the PWA guide on demand
  useEffect(() => {
    if (!canInstall || hidePWAInstaller) return;

    if (isShowPWAGuide) {
      install();
    }
  }, [canInstall, hidePWAInstaller, isShowPWAGuide]);

  if (isPWA) return null;
  return <PWA description={t('chat.description')} id={PWA_INSTALL_ID} />;
});

export default PWAInstall;
