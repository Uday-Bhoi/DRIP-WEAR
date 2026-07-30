import { apiClient } from './client';

export interface UserRegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface TokenResponseDTO {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserDTO {
  id: string;
  full_name?: string;
  email: string;
  style_dna?: Record<string, any>;
  avatar_url?: string;
}

export interface AuthSyncRequestDTO {
  firebase_uid: string;
  email: string;
  full_name?: string;
}

export interface AuthSyncResponseDTO {
  user: UserDTO;
  token: TokenResponseDTO;
}

export const authApi = {
  login: async (credentials: UserLoginDTO): Promise<TokenResponseDTO> => {
    const response = await apiClient.post<TokenResponseDTO>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: UserRegisterDTO): Promise<UserDTO> => {
    const response = await apiClient.post<UserDTO>('/auth/register', data);
    return response.data;
  },

  syncUser: async (data: AuthSyncRequestDTO): Promise<AuthSyncResponseDTO> => {
    const response = await apiClient.post<AuthSyncResponseDTO>('/auth/sync', data);
    return response.data;
  },

  getMe: async (): Promise<UserDTO> => {
    const response = await apiClient.get<UserDTO>('/auth/me');
    return response.data;
  },
};
