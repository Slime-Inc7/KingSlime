'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

const LogoThree = dynamic(() => import('@lobehub/ui/es/LogoThree'), { ssr: false });
const LogoSpline = dynamic(() => import('@lobehub/ui/es/LogoThree/LogoSpline'), { ssr: false }); // 경로를 올바르게 수정합니다.


const Logo = memo<{ mobile?: boolean }>(({ mobile }) => {
  const containerStyle = {
    alignItems: 'center',   // 알파벳 순으로 정렬
    display: 'flex',
    height: '100%',         // 추가: 컨테이너의 높이를 100%로 설정
    justifyContent: 'center',
    width: '100%',          // 추가: 컨테이너의 너비를 100%로 설정
  };

  return mobile ? (
    <Center height={240} width={240}>
      <LogoThree size={240} />
    </Center>
  ) : (
    <Center
      style={{
        ...containerStyle,  // 추가: 중앙 정렬을 위한 스타일 추가
        height: `min(300px, 40vw)`,
        marginBottom: '-10%',
        marginTop: '-20%',
        position: 'relative',
        width: `min(300px, 80vw)`,
      }}
    >
      <LogoSpline
        height={'min(300px, 40vw)'}
        style={containerStyle}  // 추가: 중앙 정렬을 위한 스타일 추가
        width={'min(300px, 80vw)'}
      />
    </Center>
  );
});

export default Logo;
