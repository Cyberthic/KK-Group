import { authService } from './auth.service';
import { adminDashboardService, peopleService } from './Admin';
import { EnquiryService } from './enquiry.service';

export * from './types';
export * from './api-client';
export * from './auth.service';
export * from './Admin';
export * from './enquiry.service';

// Combined API object for backward compatibility and centralized access
export const api = {
  ...authService,
  ...peopleService,
  ...adminDashboardService,
  ...EnquiryService,
};
