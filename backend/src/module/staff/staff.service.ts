import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto, ListStaffDto } from './dto';
import { AUTH_MESSAGES, SECURITY_CONSTANTS } from '../../common';
import { Role } from '../../database';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async createStaff(dto: CreateStaffDto) {
    if (dto.role !== Role.WORKER && dto.role !== Role.OFFICE_STAFF && dto.role !== Role.CUSTOMER) {
      throw new BadRequestException(
        'Can only create WORKER, OFFICE_STAFF, or CUSTOMER roles',
      );
    }

    const existingUser = await this.staffRepo.findByUsername(dto.username);
    if (existingUser) {
      throw new BadRequestException(AUTH_MESSAGES.USERNAME_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      SECURITY_CONSTANTS.BCRYPT_SALT_ROUNDS,
    );

    const user = await this.staffRepo.create({
      username: dto.username,
      password: hashedPassword,
      role: dto.role,
      isEmailVerified: true,
      isActive: true,
    });

    const { password: _, ...userWithoutPassword } = user;
    return {
      message: 'Staff created successfully',
      staff: userWithoutPassword,
    };
  }

  async listStaff(dto: ListStaffDto) {
    if (dto.role && dto.role !== Role.WORKER && dto.role !== Role.OFFICE_STAFF && dto.role !== Role.CUSTOMER) {
      throw new BadRequestException(
        'Can only list WORKER, OFFICE_STAFF, or CUSTOMER roles',
      );
    }
    const result = await this.staffRepo.findManyPaginated(dto);
    
    return {
      ...result,
      data: result.data.map(({ password, ...user }) => user),
    };
  }

  async deleteStaff(id: string) {
    const user = await this.staffRepo.findById(id);
    if (!user) {
      throw new NotFoundException('Staff not found');
    }

    if (user.role !== Role.WORKER && user.role !== Role.OFFICE_STAFF && user.role !== Role.CUSTOMER) {
      throw new BadRequestException('Can only delete WORKER, OFFICE_STAFF, or CUSTOMER');
    }

    await this.staffRepo.delete(id);
    return { message: 'Staff deleted successfully' };
  }
}
