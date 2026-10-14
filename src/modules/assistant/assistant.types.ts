import { z } from 'zod';
import {
  citationSchema,
  chatMessageSchema,
  assistantChatRequestSchema,
  assistantChatResponseSchema,
  assistantHistoryResponseSchema,
  assistantClearResponseSchema,
  suggestedPromptSchema,
  assistantContextResponseSchema,
} from './assistant.schemas';

export type CitationDTO = z.infer<typeof citationSchema>;
export type ChatMessageDTO = z.infer<typeof chatMessageSchema>;
export type AssistantChatRequestDTO = z.infer<
  typeof assistantChatRequestSchema
>;
export type AssistantChatResponseDTO = z.infer<
  typeof assistantChatResponseSchema
>;
export type AssistantHistoryResponseDTO = z.infer<
  typeof assistantHistoryResponseSchema
>;
export type AssistantClearResponseDTO = z.infer<
  typeof assistantClearResponseSchema
>;
export type SuggestedPromptDTO = z.infer<typeof suggestedPromptSchema>;
export type AssistantContextResponseDTO = z.infer<
  typeof assistantContextResponseSchema
>;
