import { apiClient } from './client';
import type { WardrobeItem } from '../types/wardrobe';

export interface OutfitCreateDTO {
  name: string;
  description?: string;
  occasion?: string;
  season?: string;
  vibe_score?: number;
  item_ids: string[];
  canvas_layout?: Record<string, any>;
}

export interface OutfitDTO {
  id: string;
  name: string;
  description?: string;
  occasion?: string;
  season?: string;
  vibe_score: number;
  items: WardrobeItem[];
  created_at: string;
}

export const outfitsApi = {
  getOutfits: async (): Promise<OutfitDTO[]> => {
    const response = await apiClient.get<OutfitDTO[]>('/outfits');
    return response.data;
  },

  createOutfit: async (dto: OutfitCreateDTO): Promise<OutfitDTO> => {
    const response = await apiClient.post<OutfitDTO>('/outfits', dto);
    return response.data;
  },

  deleteOutfit: async (id: string): Promise<void> => {
    await apiClient.delete(`/outfits/${id}`);
  },
};
