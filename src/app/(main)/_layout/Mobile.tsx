'use client';

import { usePathname } from 'next/navigation';
import qs from 'query-string';
import { memo } from 'react';

import { useQuery } from '@/hooks/useQuery';

import { LayoutProps } from './type';

const MOBILE_NAV_ROUTES = new Set(['/chat', '/market', '/me']);

const Layout = memo(({ children, nav }: LayoutProps) => {
  const { showMobileWorkspace } = useQuery();
  const pathname = usePathname();
  const { url } = qs.parseUrl(pathname || ""); // 여기서 빈 문자열을 기본값으로 설정
  const showNav = !showMobileWorkspace && MOBILE_NAV_ROUTES.has(url);

  return (
    <>
      {children}
      {showNav && nav}
    </>
  );
});

Layout.displayName = 'MobileMainLayout';

export default Layout;
