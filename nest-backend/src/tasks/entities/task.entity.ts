import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'in-progress' | 'completed';
}
