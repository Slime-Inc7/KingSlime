import { memo } from 'react';
import { Icon } from '@lobehub/ui';
import { LobeChat } from '@lobehub/ui/brand';
import { Loader2 } from 'lucide-react';
import { Center, Flexbox } from 'react-layout-kit';

interface FullscreenLoadingProps {
  imageSize?: number;
  textSize?: string;
  title?: string;
}

const FullscreenLoading = memo<FullscreenLoadingProps>(({ title, imageSize = 64, textSize = "120px" }) => {
  return (
    <Flexbox height="100%" style={{ userSelect: 'none' }} width="100%">
      <Center flex={1} gap={12} width="100%">
        <LobeChat imageSize={imageSize} textSize={textSize} type="combine" /> {/* 이미지 크기와 텍스트 크기 분리 */}
        <Center gap={16} horizontal>
          <Icon icon={Loader2} spin />
          {title}
        </Center>
      </Center>
    </Flexbox>
  );
});

export default FullscreenLoading;
