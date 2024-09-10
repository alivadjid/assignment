import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  Unique,
  OneToMany,
} from 'typeorm';
@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
