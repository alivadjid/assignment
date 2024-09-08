export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly dueDate: Date;
  readonly status: 'pending' | 'in-progress' | 'completed';
}
