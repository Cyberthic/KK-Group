import { request } from './api-client';
import type { User } from './types';

export const staffService = {
  createStaff: (
    data: {
      username?: string;
      email?: string;
      password: string;
      role: 'WORKER' | 'OFFICE_STAFF' | 'CUSTOMER';
    },
    token: string,
  ) =>
    request<{ message: string; staff: User }>('/staff', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),

  listStaff: (
    token: string,
    params?: { role?: string; search?: string; page?: number; limit?: number },
  ) => {
    const query = new URLSearchParams();
    if (params?.role) query.append('role', params.role);
    if (params?.search) query.append('search', params.search);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return request<{ data: User[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(
      `/staff?${query.toString()}`,
      { method: 'GET' },
      token,
    );
  },

  getStaffByUsername: (username: string, token: string) =>
    request<User>(`/staff/${username}`, {
      method: 'GET',
    }, token),

  deleteStaff: (id: string, token: string) =>
    request<{ message: string }>(`/staff/${id}`, {
      method: 'DELETE',
    }, token),
};
