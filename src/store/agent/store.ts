import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { createDevtools } from '../middleware/createDevtools';
import { type AgentState, initialState } from './initialState';
import { type AgentChatAction, createChatSlice } from './slices/chat/action';
import { ClientService } from '@/services/agent/client';  // 수정

export interface AgentStore extends AgentChatAction, AgentState {
  activeId: string; // 추가
  defaultAgentConfig: any; // 추가
  updateAgentAvatar: (avatar: string) => Promise<void>;
}

const createStore: StateCreator<AgentStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createChatSlice(...parameters),
  activeId: initialState.activeId, // 추가
  defaultAgentConfig: initialState.defaultAgentConfig, // 추가
  updateAgentAvatar: async (avatar) => {
    const clientService = new ClientService();
    await clientService.updateAgentAvatar(avatar);  // 수정
    // 필요에 따라 다른 로직 추가
  },
});

const devtools = createDevtools('agent');

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  subscribeWithSelector(devtools(createStore)),
  shallow,
);
