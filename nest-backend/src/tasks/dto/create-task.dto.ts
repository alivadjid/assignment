export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly status: 'pending' | 'inProgress' | 'completed';
}
