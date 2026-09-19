import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SECURITY_CONSTANTS, VALIDATION_MESSAGES } from '../../../../common';

export class CheckUsernameDto {
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.USERNAME_REQUIRED })
  @MinLength(SECURITY_CONSTANTS.USERNAME_MIN_LENGTH, {
    message: VALIDATION_MESSAGES.USERNAME_MIN_LENGTH,
  })
  username: string;
}

export class CheckEmailDto {
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INVALID })
  email: string;
}
