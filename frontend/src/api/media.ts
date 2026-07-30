import { apiClient, resolveImageUrl } from './client';

export interface UploadMediaResponse {
  filename: string;
  url: string;
  content_type: string;
}

export const mediaApi = {
  uploadFile: async (file: File): Promise<UploadMediaResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadMediaResponse>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = response.data;
    return {
      ...data,
      url: resolveImageUrl(data.url),
    };
  },
};
