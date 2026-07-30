import { apiClient } from './client';
import type { WardrobeItem } from '../types/wardrobe';

export interface GenerateRecommendationDTO {
  prompt?: string;
  occasion?: string;
  weather?: string;
}

export interface RecommendationResponseDTO {
  title: string;
  vibe: string;
  match_score: number;
  reasoning: string;
  items: WardrobeItem[];
}

export const recommendationsApi = {
  generate: async (dto: GenerateRecommendationDTO): Promise<RecommendationResponseDTO[]> => {
    const response = await apiClient.post<RecommendationResponseDTO[]>('/recommendations/generate', dto);
    return response.data;
  },
};
