import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ServiceStatus } from '../../../database';

export class UpdateEnquiryStatusDto {
  @IsEnum(ServiceStatus, { message: 'Invalid service status' })
  @IsNotEmpty({ message: 'Status is required' })
  status: ServiceStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
