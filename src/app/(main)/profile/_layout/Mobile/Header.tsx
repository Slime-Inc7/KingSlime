'use client';

import { MobileNavBar, MobileNavBarTitle } from '@lobehub/ui';
import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { mobileHeaderSticky } from '@/styles/mobileHeader';

const Header = memo(() => {
  const { t } = useTranslation('auth');

  const router = useRouter();
  const pathname = usePathname() || ""; // 여기서 빈 문자열을 기본값으로 설정
  const isSecurity = pathname.startsWith('/prifile/security');
  return (
    <MobileNavBar
      center={<MobileNavBarTitle title={t(isSecurity ? 'security' : 'profile')} />}
      onBackClick={() => router.push('/me/profile')}
      showBackButton
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
