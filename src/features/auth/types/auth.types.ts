export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  roles: ('ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MANAGER')[];
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}