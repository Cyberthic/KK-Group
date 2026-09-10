import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../database';

export class StaffLoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  @IsEnum(Role, {
    message: 'portalRole must be WORKER or OFFICE_STAFF',
  })
  portalRole?: Role;
}
