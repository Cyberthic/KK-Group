import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from '../../common';
import { Role } from '../../database';
import { StaffService } from './staff.service';
import { CreateStaffDto, ListStaffDto } from './dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStaff(@Body() dto: CreateStaffDto) {
    return this.staffService.createStaff(dto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get()
  async listStaff(@Query() query: ListStaffDto) {
    return this.staffService.listStaff(query);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get(':username')
  async getStaffByUsername(@Param('username') username: string) {
    return this.staffService.getStaffByUsername(username);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  async deleteStaff(@Param('id') id: string) {
    return this.staffService.deleteStaff(id);
  }
}
