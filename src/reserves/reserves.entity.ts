import { Books } from 'src/books/books.entity';
import { Users } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Reserves {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  period: string;

  @ManyToOne(() => Users, (user) => user.reserves) user: Users;
}
