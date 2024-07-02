import { DeepPartial } from 'utility-types';
import { BaseModel } from '@/database/client/core';
import { uuid } from '@/utils/uuid';
import { DB_Agent, DB_AgentSchema } from '../schemas/agent';

class _AgentModel extends BaseModel {
  constructor() {
    super('agents', DB_AgentSchema);
  }

  getAgent = async (): Promise<DB_Agent & { id: string }> => {
    const noAgent = (await this.table.count()) === 0;

    if (noAgent) await this.table.put({ avatar: null, id: uuid(), name: 'Default Agent' }); // 알파벳 순으로 변경

    const list = (await this.table.toArray()) as (DB_Agent & { id: string })[];

    return list[0];
  };

  create = async (agent: DB_Agent) => {
    return this.table.put(agent);
  };

  clear() {
    return this.table.clear();
  }

  async updateAgentAvatar(avatar: string) {
    const agent = await this.getAgent();
    return this.update(agent.id, { avatar });
  }

  private update = async (id: string, value: DeepPartial<DB_Agent>) => {
    return this.table.update(id, value);
  };
}

export const AgentModel = new _AgentModel();
