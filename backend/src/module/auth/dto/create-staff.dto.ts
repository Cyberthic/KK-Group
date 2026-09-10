import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '../../../database';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Username can only contain letters, numbers, underscores, and dashes',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(Role, {
    message: 'Role must be either WORKER or OFFICE_STAFF',
  })
  role: Role;
}
