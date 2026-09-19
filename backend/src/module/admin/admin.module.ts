import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [PeopleModule, DashboardModule],
  exports: [PeopleModule, DashboardModule],
})
export class AdminModule {}


