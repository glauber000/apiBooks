import { Reserves } from 'src/reserves/reserves.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @OneToMany(() => Reserves, (Reserve) => Reserve.book)
  reserves: Reserves[];

  @Column({ default: 'N' })
  sn_reserved: string;
}
