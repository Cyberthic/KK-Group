import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VALIDATION_MESSAGES } from '../../../common';
import { Role } from '../../../database';

export class StaffLoginDto {
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.USERNAME_REQUIRED })
  username: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: VALIDATION_MESSAGES.PORTAL_ROLE_INVALID,
  })
  portalRole?: Role;
}
