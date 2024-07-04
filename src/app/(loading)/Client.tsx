'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import FullscreenLoading from '@/components/FullscreenLoading';

const Loading = () => {
  const { t } = useTranslation('common');
  const [imageSize] = useState(64); // 이미지 크기만 설정
  const [textSize] = useState("120px"); // 텍스트 크기 설정

  return <FullscreenLoading imageSize={imageSize} textSize={textSize} title={t('appInitializing')} />;
};

export default Loading;
