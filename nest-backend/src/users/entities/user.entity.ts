import {
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  MinLength,
} from 'class-validator';
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
  @IsNotEmpty()
  @IsAlphanumeric()
  @Unique(['username'])
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
