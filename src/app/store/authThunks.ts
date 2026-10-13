import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../features/auth/services/auth.service';
import type { LoginFormInputs } from '../../features/auth/schemas/login.schema';
import type { AuthResponse } from '../../features/auth/types/auth.types';

export const loginUserThunk = createAsyncThunk<AuthResponse, LoginFormInputs, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error: any) {
      // Captura el mensaje de error estructurado que suele enviar Spring Boot (Custom Error Handler)
      const errorMessage = error.response?.data?.message || 'Error de conexión con el servidor empresarial.';
      return rejectWithValue(errorMessage);
    }
  }
);