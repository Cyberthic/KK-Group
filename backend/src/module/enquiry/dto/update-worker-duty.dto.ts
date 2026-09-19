import { IsEnum, IsNotEmpty } from 'class-validator';
import { WorkerStatus } from '../../../database';

export class UpdateWorkerDutyDto {
  @IsEnum(WorkerStatus, { message: 'Worker status must be AVAILABLE or OFF_DUTY' })
  @IsNotEmpty({ message: 'Worker status is required' })
  workerStatus: WorkerStatus;
}
