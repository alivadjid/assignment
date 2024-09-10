import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
}
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly dueDate: string;

  @IsEnum(TaskStatus)
  readonly status: 'pending' | 'inProgress' | 'completed';
}
