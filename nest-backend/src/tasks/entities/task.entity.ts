import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ObjectId, ObjectIdColumn, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty, IsDate, IsEnum } from 'class-validator';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  dueDate: string;

  @Column({ default: 'pending' })
  @IsEnum(['pending', 'inProgress', 'completed'])
  status: 'pending' | 'inProgress' | 'completed';

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
