import { apiClient } from './client';

export interface UserProfileDTO {
  id: string;
  email: string;
  full_name?: string;
  style_dna?: Record<string, any>;
  body_measurements?: Record<string, any>;
}

export const userApi = {
  getProfile: async (): Promise<UserProfileDTO> => {
    const response = await apiClient.get<UserProfileDTO>('/users/me');
    return response.data;
  },

  updateProfile: async (dto: Partial<UserProfileDTO>): Promise<UserProfileDTO> => {
    const response = await apiClient.patch<UserProfileDTO>('/users/me', dto);
    return response.data;
  },
};
