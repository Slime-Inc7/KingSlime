'use client';

import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox, FlexboxProps } from 'react-layout-kit';

const useStyles = createStyles(({ token, css }) => ({
  watermark: css`
    color: ${token.colorTextDescription};
    font-size: 12px;
  `,
}));

const BrandWatermark = memo<Omit<FlexboxProps, 'children'>>(({ style, ...rest }) => {
  const { styles } = useStyles();
  return (
    <Flexbox
      align={'center'}
      className={styles.watermark}
      flex={'none'}
      gap={4}
      horizontal
      style={style}
      {...rest}
    >
      <span>Powered by Slime.Inc</span>
    </Flexbox>
  );
});

export default BrandWatermark;
