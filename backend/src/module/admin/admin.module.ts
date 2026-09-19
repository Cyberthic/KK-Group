import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [StaffModule, DashboardModule],
  exports: [StaffModule, DashboardModule],
})
export class AdminModule {}

