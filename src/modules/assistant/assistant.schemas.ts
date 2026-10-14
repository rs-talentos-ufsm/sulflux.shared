import { z, registry } from '../../lib/registry';

export const citationSchema = z.object({
  label: z.string(),
  category: z.string(),
});

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  text: z.string(),
  citations: z.array(citationSchema).optional(),
  createdAt: z.union([z.string(), z.date()]).optional(),
});

export const assistantChatRequestSchema = registry.register(
  'AssistantChatRequest',
  z.object({
    message: z.string().min(1).max(2000).trim(),
  }),
);

export const assistantChatResponseSchema = registry.register(
  'AssistantChatResponse',
  z.object({
    id: z.string(),
    role: z.literal('assistant'),
    text: z.string(),
    citations: z.array(citationSchema).optional(),
  }),
);

export const assistantHistoryResponseSchema = registry.register(
  'AssistantHistoryResponse',
  z.array(chatMessageSchema),
);

export const assistantClearResponseSchema = registry.register(
  'AssistantClearResponse',
  z.object({
    success: z.boolean(),
    message: z.string(),
  }),
);

export const suggestedPromptSchema = z.object({
  label: z.string(),
  query: z.string(),
  group: z.enum(['Carbono', 'Hídrico', 'Talhões', 'Manejo']),
});

export const assistantContextResponseSchema = registry.register(
  'AssistantContextResponse',
  z.object({
    producerName: z.string(),
    organization: z.string(),
    totalProperties: z.number(),
    activeSeason: z.string(),
    totalCarbonBalance: z.string(),
    readyFieldsCount: z.number(),
    suggestedPrompts: z.array(suggestedPromptSchema),
  }),
);
