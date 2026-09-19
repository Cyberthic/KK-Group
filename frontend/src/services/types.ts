export type UserRole = 'CUSTOMER' | 'SUPER_ADMIN' | 'WORKER' | 'OFFICE_STAFF';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  username?: string | null;
  phone?: string | null;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
  requiresVerification?: boolean;
  email?: string;
}

export interface ApiStandardResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}
