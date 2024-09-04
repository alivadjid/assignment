import { Column, Entity, ObjectId, ObjectIdColumn, Unique } from 'typeorm';
@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;
}
