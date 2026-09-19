import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AssignWorkerDto {
  @IsString()
  @IsNotEmpty({ message: 'Worker ID is required' })
  workerId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
