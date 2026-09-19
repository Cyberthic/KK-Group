import { request } from '../../api-client';
import type { User, UserRole } from '../../types';

export interface DashboardStats {
  totalUsers: number;
  totalEmployees: number;
  totalWorkers: number;
  totalOfficeStaff: number;
  totalCustomers: number;
  totalAdmins: number;
  activeUsers: number;
  inactiveUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  newUsersThisMonth: number;
  newUsersLastMonth: number;
  userGrowthRate: number;
  newEmployeesThisMonth: number;
  newEmployeesLastMonth: number;
  employeeGrowthRate: number;
  verificationRate: number;
}

export interface MonthlyTrendItem {
  month: string;
  year: number;
  label: string;
  customers: number;
  employees: number;
  total: number;
}

export interface RoleBreakdownItem {
  role: UserRole;
  count: number;
  percentage: number;
}

export interface DashboardOverview {
  stats: DashboardStats;
  trends: MonthlyTrendItem[];
  roleBreakdown: RoleBreakdownItem[];
  recentActivity: User[];
  otpMetrics: {
    total: number;
    used: number;
    unused: number;
  };
}

export const adminDashboardService = {
  getOverview: (
    token: string,
    params?: { months?: number; limit?: number },
  ) => {
    const query = new URLSearchParams();
    if (params?.months) query.append('months', params.months.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    const qs = query.toString() ? `?${query.toString()}` : '';

    return request<DashboardOverview>(`/admin/dashboard/overview${qs}`, { method: 'GET' }, token);
  },

  getStats: (token: string) =>
    request<DashboardStats>('/admin/dashboard/stats', { method: 'GET' }, token),

  getTrends: (token: string, months = 6) =>
    request<MonthlyTrendItem[]>(`/admin/dashboard/trends?months=${months}`, { method: 'GET' }, token),

  getRoles: (token: string) =>
    request<RoleBreakdownItem[]>('/admin/dashboard/roles', { method: 'GET' }, token),

  getRecentActivity: (token: string, limit = 10) =>
    request<User[]>(`/admin/dashboard/recent-activity?limit=${limit}`, { method: 'GET' }, token),
};
