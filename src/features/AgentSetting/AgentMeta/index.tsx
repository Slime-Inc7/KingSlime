'use client';

import { Form, type FormItemProps, Icon, type ItemGroup, Tooltip } from '@lobehub/ui';
import { Button } from 'antd';
import isEqual from 'fast-deep-equal';
import { isString } from 'lodash-es';
import { Wand2 } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useAgentStore } from '@/store/agent';
import { useStore } from '../store';
import { SessionLoadingState } from '../store/initialState';
import AutoGenerateInput from './AutoGenerateInput';
import AutoGenerateSelect from './AutoGenerateSelect';
import BackgroundSwatches from './BackgroundSwatches';
import AvatarWithUpload from '@/features/AvatarWithUpload';

const AgentMeta = memo(() => {
  const { t } = useTranslation('setting');

  const [hasSystemRole, updateMeta, autocompleteMeta, autocompleteAllMeta] = useStore((s) => [
    !!s.config.systemRole,
    s.setAgentMeta,
    s.autocompleteMeta,
    s.autocompleteAllMeta,
  ]);

  const updateAgentAvatar = useAgentStore((s) => s.updateAgentAvatar);

  const loading = useStore((s) => s.autocompleteLoading);
  const meta = useStore((s) => s.meta, isEqual);

  const basic = [
    {
      Render: AutoGenerateInput,
      key: 'title',
      label: '비서 이름',  // 변경된 부분
      onChange: (e: any) => updateMeta({ title: e.target.value }),
      placeholder: '비서의 이름을 입력하세요',  // 변경된 부분
    },
    {
      Render: AutoGenerateInput,
      key: 'description',
      label: '비서 설명',  // 변경된 부분
      onChange: (e: any) => updateMeta({ description: e.target.value }),
      placeholder: '비서 설명을 입력하세요',  // 변경된 부분
    },
    {
      Render: AutoGenerateSelect,
      key: 'tags',
      label: '태그',  // 변경된 부분
      onChange: (e: any) => updateMeta({ tags: isString(e) ? e.split(',') : e }),
      placeholder: '태그를 입력하세요',  // 변경된 부분
    },
  ];

  const autocompleteItems: FormItemProps[] = basic.map((item) => {
    const AutoGenerate = item.Render;
    return {
      children: (
        <AutoGenerate
          canAutoGenerate={hasSystemRole}
          loading={loading[item.key as keyof SessionLoadingState]}
          onChange={item.onChange}
          onGenerate={() => {
            autocompleteMeta(item.key as keyof typeof meta);
          }}
          placeholder={item.placeholder}
          value={meta[item.key as keyof typeof meta]}
        />
      ),
      label: item.label,
    };
  });

  const metaData: ItemGroup = {
    children: [
      {
        children: (
          <AvatarWithUpload
            avatar={meta.avatar}
            background={meta.backgroundColor}
            isAgentAvatar // 추가된 부분
            onUpload={(avatar) => {
              updateMeta({ avatar });
              updateAgentAvatar(avatar);
            }}
          />
        ),
        label: t('settingAgent.avatar.title'),
        minWidth: undefined,
      },
      {
        children: (
          <BackgroundSwatches
            backgroundColor={meta.backgroundColor}
            onChange={(backgroundColor) => updateMeta({ backgroundColor })}
          />
        ),
        label: t('settingAgent.backgroundColor.title'),
        minWidth: undefined,
      },
      ...autocompleteItems,
    ],
    extra: (
      <Tooltip
        title={
          !hasSystemRole
            ? t('autoGenerateTooltipDisabled', { ns: 'common' })
            : t('autoGenerateTooltip', { ns: 'common' })
        }
      >
        <Button
          disabled={!hasSystemRole}
          icon={<Icon icon={Wand2} />}
          loading={Object.values(loading).some((i) => !!i)}
          onClick={(e: any) => {
            e.stopPropagation();

            autocompleteAllMeta(true);
          }}
          size={'small'}
        >
          {t('autoGenerate', { ns: 'common' })}
        </Button>
      </Tooltip>
    ),
    title: '비서 정보',  // 변경된 부분
  };

  return <Form items={[metaData]} itemsType={'group'} variant={'pure'} {...FORM_STYLE} />;
});

export default AgentMeta;
