import { useTranslation } from 'react-i18next';
import FullscreenLoading from '@/components/FullscreenLoading';

const MobileSwitchLoading = () => {
  const { t } = useTranslation('common');

  return <FullscreenLoading imageSize={48} title={t('layoutInitializing')} />;
};

export default MobileSwitchLoading;
