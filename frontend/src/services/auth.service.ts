import { request } from './api-client';
import type { AuthResponse, User, UserRole } from './types';

export const authService = {
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

  // Current User Profile
  getMe: (token: string) =>
    request<User>('/auth/me', { method: 'GET' }, token),
};
