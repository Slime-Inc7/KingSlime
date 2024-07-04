import { DalleManifest } from '@/tools/dalle';
import { LobeToolMeta } from '@/types/tool/tool';

import type { ToolStoreState } from '../../initialState';

const metaList =
  (showDalle?: boolean) =>
    (s: ToolStoreState): LobeToolMeta[] =>
      s.builtinTools
        .filter((item) => (!showDalle ? item.identifier !== DalleManifest.identifier : true))
        .map((t) => ({
          author: 'Slime.Inc', // 변경된 부분
          identifier: t.identifier,
          meta: t.manifest.meta,
          type: 'builtin',
        }));

export const builtinToolSelectors = {
  metaList,
};
