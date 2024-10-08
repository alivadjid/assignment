import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ObjectId, ObjectIdColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'inProgress' | 'completed';

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
