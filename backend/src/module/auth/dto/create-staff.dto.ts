import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import {
  REGEX_PATTERNS,
  SECURITY_CONSTANTS,
  VALIDATION_MESSAGES,
} from '../../../common';
import { Role } from '../../../database';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.USERNAME_REQUIRED })
  @MinLength(SECURITY_CONSTANTS.USERNAME_MIN_LENGTH, {
    message: VALIDATION_MESSAGES.USERNAME_MIN_LENGTH,
  })
  @Matches(REGEX_PATTERNS.USERNAME, {
    message: VALIDATION_MESSAGES.USERNAME_FORMAT,
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  @MinLength(SECURITY_CONSTANTS.PASSWORD_MIN_LENGTH, {
    message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH,
  })
  @Matches(REGEX_PATTERNS.PASSWORD, {
    message: VALIDATION_MESSAGES.PASSWORD_COMPLEXITY,
  })
  password: string;

  @IsEnum(Role, {
    message: VALIDATION_MESSAGES.ROLE_INVALID_STAFF,
  })
  role: Role;
}
