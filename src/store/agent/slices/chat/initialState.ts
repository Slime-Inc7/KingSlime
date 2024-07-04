import { DeepPartial } from 'utility-types';

import { DEFAULT_AGENT_CONFIG } from '@/const/settings';
import { LobeAgentConfig } from '@/types/agent';

export interface AgentState {
  activeId: string;
  agentAvatar: string | null; // 이동된 부분
  agentMap: Record<string, DeepPartial<LobeAgentConfig>>;
  defaultAgentConfig: LobeAgentConfig;
  isInboxAgentConfigInit: boolean;
  updateAgentChatConfigSignal?: AbortController;
  updateAgentConfigSignal?: AbortController;
}

export const initialAgentChatState: AgentState = {
  activeId: 'inbox',
  agentAvatar: null, // 이동된 부분
  agentMap: {},
  defaultAgentConfig: DEFAULT_AGENT_CONFIG,
  isInboxAgentConfigInit: false,
};
