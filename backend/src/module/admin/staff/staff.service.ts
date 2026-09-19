import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { StaffRepository } from './staff.repository';
import { CreateStaffDto, ListStaffDto } from './dto';
import {
  AUTH_MESSAGES,
  SECURITY_CONSTANTS,
  VALIDATION_MESSAGES,
  resolveUniqueUsername,
} from '../../../common';
import { Role } from '../../../database';

@Injectable()
export class StaffService {
  constructor(private readonly staffRepo: StaffRepository) {}

  async createStaff(dto: CreateStaffDto) {
    if (dto.role !== Role.WORKER && dto.role !== Role.OFFICE_STAFF && dto.role !== Role.CUSTOMER) {
      throw new BadRequestException(
        'Can only create WORKER, OFFICE_STAFF, or CUSTOMER roles',
      );
    }

    let finalUsername = dto.username?.trim();
    if (!finalUsername) {
      if (dto.email) {
        finalUsername = await resolveUniqueUsername(dto.email, async (candidate) => {
          const found = await this.staffRepo.findByUsername(candidate);
          return !!found;
        });
      } else {
        throw new BadRequestException(VALIDATION_MESSAGES.USERNAME_REQUIRED);
      }
    } else {
      const existingUser = await this.staffRepo.findByUsername(finalUsername);
      if (existingUser) {
        throw new BadRequestException(
          AUTH_MESSAGES.USERNAME_ALREADY_EXISTS(finalUsername),
        );
      }
    }

    if (dto.email) {
      const existingEmail = await this.staffRepo.findByEmail(
        dto.email.toLowerCase().trim(),
      );
      if (existingEmail) {
        throw new BadRequestException(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      SECURITY_CONSTANTS.BCRYPT_SALT_ROUNDS,
    );

    const user = await this.staffRepo.create({
      username: finalUsername,
      email: dto.email ? dto.email.toLowerCase().trim() : undefined,
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

  async getStaffByUsername(username: string) {
    const user = await this.staffRepo.findByUsername(username);
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    if (
      user.role !== Role.WORKER &&
      user.role !== Role.OFFICE_STAFF &&
      user.role !== Role.CUSTOMER
    ) {
      throw new NotFoundException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deleteStaff(id: string) {
    const user = await this.staffRepo.findById(id);
    if (!user) {
      throw new NotFoundException(AUTH_MESSAGES.STAFF_NOT_FOUND);
    }

    if (user.role !== Role.WORKER && user.role !== Role.OFFICE_STAFF && user.role !== Role.CUSTOMER) {
      throw new BadRequestException('Can only delete WORKER, OFFICE_STAFF, or CUSTOMER');
    }

    await this.staffRepo.delete(id);
    return { message: AUTH_MESSAGES.STAFF_DELETED_SUCCESS };
  }
}
