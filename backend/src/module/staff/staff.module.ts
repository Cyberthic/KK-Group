import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { StaffRepository } from './staff.repository';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StaffController],
  providers: [StaffRepository, StaffService],
  exports: [StaffRepository, StaffService],
})
export class StaffModule {}
