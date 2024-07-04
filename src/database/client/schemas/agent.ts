// src/database/client/schemas/agent.ts

import { z } from 'zod';

export const DB_AgentSchema = z.object({
  avatar: z.string().nullable(), // Move this line before 'name'
  id: z.string(),
  name: z.string(),
  // Add other fields as necessary
});

export type DB_Agent = z.infer<typeof DB_AgentSchema>;
