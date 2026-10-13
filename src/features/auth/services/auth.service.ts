import apiClient from '../../../app/api/apiClient';
import type { AuthResponse } from '../types/auth.types';
import type { LoginFormInputs } from '../schemas/login.schema';

export const authService = {
  login: async (credentials: LoginFormInputs): Promise<AuthResponse> => {
    // Apunta al endpoint típico de Spring Security: /api/v1/auth/login
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const response = await apiClient.get<AuthResponse['user']>('/auth/me');
    return response.data;
  }
};