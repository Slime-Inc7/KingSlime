'use client';

import { memo } from 'react';

const UpgradeAlert = memo(() => {
  // const [hasNewVersion, latestVersion] = useGlobalStore((s) => [s.hasNewVersion, s.latestVersion]);

  // if (!hasNewVersion) return null; // 이 줄을 주석 처리하여 항상 알림을 표시하지 않도록 합니다.

  return null; // 이 줄을 추가하여 컴포넌트가 항상 null을 반환하도록 합니다.

  // return (
  //   <Alert
  //     closable
  //     message={
  //       <Flexbox gap={8}>
  //         <p>{t('upgradeVersion.newVersion', { version: `v${latestVersion}` })}</p>
  //         <Link
  //           aria-label={t('upgradeVersion.action')}
  //           href={MANUAL_UPGRADE_URL}
  //           style={{ marginBottom: 6 }}
  //           target={'_blank'}
  //         >
  //           <Button block size={'small'} type={'primary'}>
  //             {t('upgradeVersion.action')}
  //           </Button>
  //         </Link>
  //       </Flexbox>
  //     }
  //     type={'info'}
  //   />
  // );
});

export default UpgradeAlert;
