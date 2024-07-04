'use client';

import dynamic from 'next/dynamic';
import { memo, CSSProperties } from 'react';
import { Center } from 'react-layout-kit';

const LogoThree = dynamic(() => import('@lobehub/ui/es/LogoThree'), { ssr: false });
const LogoSpline = dynamic(() => import('@lobehub/ui/es/LogoThree/LogoSpline'), { ssr: false });

const Logo = memo<{ mobile?: boolean }>(({ mobile }) => {
  const containerStyle: CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'relative', // 알파벳 순으로 정렬
    width: '100%',
    zIndex: 10,
  };

  return mobile ? (
    <Center height={240} width={240}>
      <LogoThree size={240} />
    </Center>
  ) : (
    <Center
      style={{
        ...containerStyle,
        height: `min(150px, 40vw)`,
        marginBottom: '-2%',
        marginTop: '-2%',
        width: `min(150px, 80vw)`,
      }}
    >
      <LogoSpline
        height={'min(150px, 40vw)'}
        style={containerStyle}
        width={'min(150px, 80vw)'}
      />
    </Center>
  );
});

export default Logo;
