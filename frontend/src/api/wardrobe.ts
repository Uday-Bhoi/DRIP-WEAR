import { apiClient, resolveImageUrl } from './client';
import type { WardrobeItem } from '../types/wardrobe';

export interface WardrobeItemCreateDTO {
  name: string;
  category: string;
  sub_category?: string;
  brand?: string;
  original_image_url: string;
  colors?: string[];
  season?: string;
  occasion?: string;
  fit?: string;
  purchase_price?: number;
}

export interface WardrobeItemUpdateDTO {
  name?: string;
  category?: string;
  sub_category?: string;
  brand?: string;
  original_image_url?: string;
  laundry_status?: 'clean' | 'laundry' | 'dirty';
  wear_count?: number;
  purchase_price?: number;
  colors?: string[];
  season?: string;
  occasion?: string;
  fit?: string;
}

export const wardrobeApi = {
  getItems: async (category?: string, laundryStatus?: string): Promise<WardrobeItem[]> => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (laundryStatus) params.append('laundry_status', laundryStatus);

    const response = await apiClient.get<WardrobeItem[]>(`/wardrobe/items?${params.toString()}`);
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      imageUrl: resolveImageUrl(item.original_image_url || item.imageUrl),
      price: item.purchase_price || item.price || 0,
      wearCount: item.wear_count || item.wearCount || 0,
      color: item.colors?.[0] || '#D92243',
      status: item.laundry_status || item.status || 'clean',
      brand: item.brand,
      season: item.season,
      occasion: item.occasion,
    }));
  },

  createItem: async (dto: WardrobeItemCreateDTO): Promise<WardrobeItem> => {
    const response = await apiClient.post('/wardrobe/items', dto);
    const item = response.data;
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      imageUrl: resolveImageUrl(item.original_image_url),
      price: item.purchase_price,
      wearCount: item.wear_count || 0,
      color: item.colors?.[0] || '#D92243',
      status: item.laundry_status || 'clean',
      brand: item.brand,
    };
  },

  updateItem: async (id: string, dto: WardrobeItemUpdateDTO): Promise<WardrobeItem> => {
    const response = await apiClient.patch(`/wardrobe/items/${id}`, dto);
    const item = response.data;
    return {
      id: item.id,
      name: item.name,
      category: item.category,
      imageUrl: resolveImageUrl(item.original_image_url),
      price: item.purchase_price,
      wearCount: item.wear_count,
      color: item.colors?.[0] || '#D92243',
      status: item.laundry_status || 'clean',
      brand: item.brand,
      season: item.season,
      occasion: item.occasion,
    };
  },

  deleteItem: async (id: string): Promise<void> => {
    await apiClient.delete(`/wardrobe/items/${id}`);
  },
};
