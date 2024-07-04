'use client';

import { usePathname } from 'next/navigation';
import { useQuery } from '@/hooks/useQuery';
import { SettingsTabs } from '@/store/global/initialState';

/**
 * Returns the active setting page key (common/sync/agent/...)
 */
export const useActiveSettingsKey = () => {
  const pathname = usePathname() || ''; // pathname이 null일 경우 빈 문자열을 사용합니다.
  const { tab } = useQuery();

  const tabs = pathname.split('/').at(-1);

  if (tabs === 'settings') return SettingsTabs.Common;

  if (tabs === 'modal') return tab as SettingsTabs;

  return tabs as SettingsTabs;
};
