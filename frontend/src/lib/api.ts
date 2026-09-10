const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export type UserRole = 'CUSTOMER' | 'SUPER_ADMIN' | 'WORKER' | 'OFFICE_STAFF';

export interface User {
  id: string;
  email?: string | null;
  username?: string | null;
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

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    let errorMsg = 'An unexpected error occurred';
    if (Array.isArray(body?.message)) {
      errorMsg = body.message.join(', ');
    } else if (body?.message) {
      errorMsg = body.message;
    } else if (body?.error) {
      errorMsg = body.error;
    }

    const err = new Error(errorMsg) as Error & {
      statusCode?: number;
      data?: any;
    };
    err.statusCode = res.status;
    err.data = body;
    throw err;
  }

  // If backend wraps in { success: true, data: ... }
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T;
  }

  return body as T;
}

export const api = {
  // Customer Auth
  customerRegister: (data: { email: string; password: string }) =>
    request<{ message: string; email: string }>('/auth/customer/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  customerVerifyOtp: (data: { email: string; code: string }) =>
    request<AuthResponse>('/auth/customer/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  customerResendOtp: (data: { email: string }) =>
    request<{ message: string; email: string }>('/auth/customer/resend-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  customerLogin: (data: { email: string; password: string }) =>
    request<AuthResponse>('/auth/customer/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Worker & Office Staff Login
  staffLogin: (data: {
    username: string;
    password: string;
    portalRole?: UserRole;
  }) =>
    request<AuthResponse>('/auth/staff/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Super Admin Login
  adminLogin: (data: { identifier: string; password: string }) =>
    request<AuthResponse>('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Super Admin Staff Management
  createStaff: (
    data: { username: string; password: string; role: 'WORKER' | 'OFFICE_STAFF' },
    token: string,
  ) =>
    request<{ message: string; staff: User }>('/auth/admin/create-staff', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),

  listStaff: (token: string, role?: string) =>
    request<User[]>(
      role ? `/auth/admin/staff?role=${role}` : '/auth/admin/staff',
      { method: 'GET' },
      token,
    ),

  deleteStaff: (id: string, token: string) =>
    request<{ message: string }>(`/auth/admin/staff/${id}`, {
      method: 'DELETE',
    }, token),

  // Current User Profile
  getMe: (token: string) =>
    request<User>('/auth/me', { method: 'GET' }, token),
};
