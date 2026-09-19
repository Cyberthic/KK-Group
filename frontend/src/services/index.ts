import { authService } from './auth.service';
import { staffService } from './staff.service';
import { adminDashboardService } from './Admin/dashboard.service';

export * from './types';
export * from './api-client';
export * from './auth.service';
export * from './staff.service';
export * from './Admin/dashboard.service';

// Combined API object for backward compatibility and centralized access
export const api = {
  ...authService,
  ...staffService,
  ...adminDashboardService,
};

