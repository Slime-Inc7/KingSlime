import { redirect } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';
import { isMobileDevice } from '@/utils/responsive';

import Actions from './features/Actions';
import Hero from './features/Hero';
import Logo from './features/Logo';

export const generateMetadata = async () => {
  const { t } = await translation('metadata');
  return metadataModule.generate({
    description: t('welcome.description'),
    title: t('인공지능 비서'),
    url: '/welcome',
  });
};

const Page = async () => {
  const mobile = isMobileDevice();
  if (mobile) return redirect('/chat');  // 모바일 접속 시 chat 페이지로 리다이렉트

  const { t } = await translation('metadata');
  const ld = ldModule.generate({
    description: t('welcome.description'),
    title: t('인공지능 비서'),
    url: '/welcome',
  });

  return (
    <>
      <StructuredData ld={ld} />
      <Logo mobile={mobile} />
      <Hero />
      <Actions mobile={mobile} />
    </>
  );
};

Page.displayName = 'Welcome';

export default Page;
