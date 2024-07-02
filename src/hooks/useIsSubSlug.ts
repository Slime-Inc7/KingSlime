import { usePathname } from 'next/navigation';

/**
 * Returns true if the current path has a sub slug (`/chat/mobile` or `/chat/settings`)
 */
export const useIsSubSlug = () => {
  const pathname = usePathname() || ''; // pathname이 null일 경우 빈 문자열을 사용합니다.

  const slugs = pathname.split('/').filter(Boolean);

  return slugs.length > 1;
};
