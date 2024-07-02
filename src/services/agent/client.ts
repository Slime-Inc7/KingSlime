import { AgentModel } from '@/database/client/models/agent';

export class ClientService {
  updateAgentAvatar(avatar: string) {
    return AgentModel.updateAgentAvatar(avatar);
  }
}
