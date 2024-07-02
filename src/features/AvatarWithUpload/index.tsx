import { Upload } from 'antd';
import { memo, useCallback } from 'react';

import { useUserStore } from '@/store/user';
import { useAgentStore } from '@/store/agent'; // 추가된 부분
import { imageToBase64 } from '@/utils/imageToBase64';
import { createUploadImageHandler } from '@/utils/uploadFIle';

import UserAvatar, { type UserAvatarProps } from '../User/UserAvatar';

interface AvatarWithUploadProps extends UserAvatarProps {
  compressSize?: number;
  isAgentAvatar?: boolean; // 추가된 부분
  onUpload?: (avatar: string) => void;
}

const AvatarWithUpload = memo<AvatarWithUploadProps>(
  ({ size = 40, compressSize = 256, isAgentAvatar, onUpload, ...rest }) => {
    const updateUserAvatar = useUserStore((s) => s.updateAvatar);
    const updateAgentAvatar = useAgentStore((s) => s.updateAgentAvatar); // 추가된 부분

    const handleUploadAvatar = useCallback(
      createUploadImageHandler((avatar) => {
        const img = new Image();
        img.src = avatar;
        img.addEventListener('load', () => {
          const webpBase64 = imageToBase64({ img, size: compressSize });
          if (isAgentAvatar) {
            updateAgentAvatar(webpBase64);
          } else {
            updateUserAvatar(webpBase64);
          }
          onUpload?.(webpBase64);
        });
      }),
      [compressSize, isAgentAvatar, onUpload, updateAgentAvatar, updateUserAvatar],
    );

    return (
      <Upload beforeUpload={handleUploadAvatar} itemRender={() => void 0} maxCount={1}>
        <UserAvatar clickable size={size} {...rest} />
      </Upload>
    );
  },
);

export default AvatarWithUpload;
