import { usePathname } from 'next/navigation';

import { SidebarTabKey } from '@/store/global/initialState';

/**
 * Returns the active tab key (chat/market/settings/...)
 */
export const useActiveTabKey = () => {
  const pathname = usePathname() || ''; // pathname이 null일 경우 빈 문자열을 사용합니다.

  return pathname.split('/').find(Boolean)! as SidebarTabKey;
};
