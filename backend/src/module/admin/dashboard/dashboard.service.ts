import { Injectable } from '@nestjs/common';
import { DashboardRepository, RecentUserEntity } from './dashboard.repository';
import { Role } from '../../../database';
import { DashboardRecentActivityDto, DashboardTrendsDto } from './dto';

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
  role: Role;
  count: number;
  percentage: number;
}

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepo: DashboardRepository) {}

  async getStats(): Promise<DashboardStats> {
    const { currentMonthStart, currentMonthEnd, prevMonthStart, prevMonthEnd } =
      this.getMonthDateRanges();

    const [
      totalUsers,
      roleCounts,
      statusCounts,
      verificationCounts,
      newUsersThisMonth,
      newUsersLastMonth,
      newEmployeesThisMonth,
      newEmployeesLastMonth,
    ] = await Promise.all([
      this.dashboardRepo.countTotalUsers(),
      this.dashboardRepo.countUsersByRole(),
      this.dashboardRepo.countUsersByStatus(),
      this.dashboardRepo.countUsersByEmailVerification(),
      this.dashboardRepo.countUsersInDateRange(
        currentMonthStart,
        currentMonthEnd,
      ),
      this.dashboardRepo.countUsersInDateRange(prevMonthStart, prevMonthEnd),
      this.dashboardRepo.countUsersInDateRange(
        currentMonthStart,
        currentMonthEnd,
        [Role.WORKER, Role.OFFICE_STAFF],
      ),
      this.dashboardRepo.countUsersInDateRange(prevMonthStart, prevMonthEnd, [
        Role.WORKER,
        Role.OFFICE_STAFF,
      ]),
    ]);

    const roleMap: Record<Role, number> = {
      [Role.SUPER_ADMIN]: 0,
      [Role.WORKER]: 0,
      [Role.OFFICE_STAFF]: 0,
      [Role.CUSTOMER]: 0,
    };
    for (const item of roleCounts) {
      roleMap[item.role] = item._count.id;
    }

    let activeUsers = 0;
    let inactiveUsers = 0;
    for (const item of statusCounts) {
      if (item.isActive) {
        activeUsers = item._count.id;
      } else {
        inactiveUsers = item._count.id;
      }
    }

    let verifiedUsers = 0;
    let unverifiedUsers = 0;
    for (const item of verificationCounts) {
      if (item.isEmailVerified) {
        verifiedUsers = item._count.id;
      } else {
        unverifiedUsers = item._count.id;
      }
    }

    const totalEmployees = roleMap[Role.WORKER] + roleMap[Role.OFFICE_STAFF];
    const userGrowthRate = this.calculateGrowthRate(
      newUsersThisMonth,
      newUsersLastMonth,
    );
    const employeeGrowthRate = this.calculateGrowthRate(
      newEmployeesThisMonth,
      newEmployeesLastMonth,
    );
    const verificationRate =
      totalUsers > 0
        ? Math.round((verifiedUsers / totalUsers) * 1000) / 10
        : 0;

    return {
      totalUsers,
      totalEmployees,
      totalWorkers: roleMap[Role.WORKER],
      totalOfficeStaff: roleMap[Role.OFFICE_STAFF],
      totalCustomers: roleMap[Role.CUSTOMER],
      totalAdmins: roleMap[Role.SUPER_ADMIN],
      activeUsers,
      inactiveUsers,
      verifiedUsers,
      unverifiedUsers,
      newUsersThisMonth,
      newUsersLastMonth,
      userGrowthRate,
      newEmployeesThisMonth,
      newEmployeesLastMonth,
      employeeGrowthRate,
      verificationRate,
    };
  }

  async getTrends(dto?: DashboardTrendsDto): Promise<MonthlyTrendItem[]> {
    const monthsCount = dto?.months ?? 6;
    const now = new Date();
    const sinceDate = new Date(
      now.getFullYear(),
      now.getMonth() - (monthsCount - 1),
      1,
    );

    const users = await this.dashboardRepo.getUsersSince(sinceDate);

    // Initialize month slots in chronological order
    const trends: MonthlyTrendItem[] = [];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mIdx = d.getMonth();
      const year = d.getFullYear();
      const monthName = monthNames[mIdx];
      trends.push({
        month: monthName,
        year,
        label: `${monthName} ${year}`,
        customers: 0,
        employees: 0,
        total: 0,
      });
    }

    // Populate counts from retrieved registrations
    for (const u of users) {
      const uDate = new Date(u.createdAt);
      const mIdx = uDate.getMonth();
      const year = uDate.getFullYear();
      const monthName = monthNames[mIdx];

      const item = trends.find((t) => t.month === monthName && t.year === year);
      if (item) {
        item.total++;
        if (u.role === Role.CUSTOMER) {
          item.customers++;
        } else if (u.role === Role.WORKER || u.role === Role.OFFICE_STAFF) {
          item.employees++;
        }
      }
    }

    return trends;
  }

  async getRolesBreakdown(): Promise<RoleBreakdownItem[]> {
    const [totalUsers, roleCounts] = await Promise.all([
      this.dashboardRepo.countTotalUsers(),
      this.dashboardRepo.countUsersByRole(),
    ]);

    const allRoles = [
      Role.CUSTOMER,
      Role.WORKER,
      Role.OFFICE_STAFF,
      Role.SUPER_ADMIN,
    ];
    const roleCountMap = new Map<Role, number>();
    for (const rc of roleCounts) {
      roleCountMap.set(rc.role, rc._count.id);
    }

    return allRoles.map((role) => {
      const count = roleCountMap.get(role) ?? 0;
      const percentage =
        totalUsers > 0 ? Math.round((count / totalUsers) * 1000) / 10 : 0;
      return {
        role,
        count,
        percentage,
      };
    });
  }

  async getRecentActivity(
    dto?: DashboardRecentActivityDto,
  ): Promise<RecentUserEntity[]> {
    const limit = dto?.limit ?? 10;
    return this.dashboardRepo.getRecentUsers(limit);
  }

  async getOverview(monthsDto?: DashboardTrendsDto, activityDto?: DashboardRecentActivityDto) {
    const [stats, trends, roleBreakdown, recentActivity, otpMetrics] =
      await Promise.all([
        this.getStats(),
        this.getTrends(monthsDto),
        this.getRolesBreakdown(),
        this.getRecentActivity(activityDto),
        this.dashboardRepo.getOtpMetrics(),
      ]);

    return {
      stats,
      trends,
      roleBreakdown,
      recentActivity,
      otpMetrics,
    };
  }

  private getMonthDateRanges() {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999,
    );

    return { currentMonthStart, currentMonthEnd, prevMonthStart, prevMonthEnd };
  }

  private calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    const growth = ((current - previous) / previous) * 100;
    return Math.round(growth * 10) / 10;
  }
}
