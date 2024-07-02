import { Tag } from 'antd';
import { createStyles } from 'antd-style';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { OFFICIAL_SITE } from '@/const/url';
import { CURRENT_VERSION } from '@/const/version';

const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    overflow: hidden;
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadiusLG * 2}px;
    box-shadow: 0 0 0 1px ${token.colorFillSecondary} inset;
  `,
}));

const Version = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { styles, theme } = useStyles();

  return (
    <Flexbox
      align={'center'}
      gap={16}
      horizontal={!mobile}
      justify={'space-between'}
      width={'100%'}
    >
      <Flexbox align={'center'} flex={'none'} gap={16} horizontal>
        <Link href={OFFICIAL_SITE} target={'_blank'}>
          <Center className={styles.logo} height={64} width={64}>
            <Image alt={'KingSlime'} height={52} src={'/icons/icon-192x192.png'} width={52} />
          </Center>
        </Link>
        <Flexbox>
          <div style={{ fontSize: 18, fontWeight: 'bolder' }}>KingSlime</div>
          <div>
            <Tag
              bordered={false}
              color={theme.colorFillSecondary}
              style={{ color: theme.colorTextSecondary }}
            >
              v{CURRENT_VERSION}
            </Tag>
          </div>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

export default Version;
