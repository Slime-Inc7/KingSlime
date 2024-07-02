import { DeepPartial } from 'utility-types';
import { DEFAULT_AGENT_CONFIG } from '@/const/settings'; // 필요한 import만 남깁니다.
import { LobeAgentConfig } from '@/types/agent';

export interface AgentState {
  activeId: string;
  agentAvatar: string | null; // 정렬 수정
  agentMap: Record<string, DeepPartial<LobeAgentConfig>>;
  defaultAgentConfig: LobeAgentConfig;
  isInboxAgentConfigInit: boolean;
  updateAgentChatConfigSignal?: AbortController;
  updateAgentConfigSignal?: AbortController;
}

export const initialAgentChatState: AgentState = {
  activeId: 'inbox',
  agentAvatar: null, // 정렬 수정
  agentMap: {},
  defaultAgentConfig: DEFAULT_AGENT_CONFIG,
  isInboxAgentConfigInit: false,
};

export const initialState = initialAgentChatState; // 추가
