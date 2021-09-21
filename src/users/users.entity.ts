import { Reserves } from 'src/reserves/reserves.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @OneToMany(() => Reserves, (Reserve) => Reserve.user)
  reserves: Reserves[];
}
