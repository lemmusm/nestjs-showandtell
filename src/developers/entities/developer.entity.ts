import { Position } from 'src/positions/entities/position.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'developers' })
export class Developer {
  @PrimaryColumn({ type: 'binary', length: 16 })
  id_developer: Buffer | string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  position_id: Buffer | string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
  @ManyToOne(() => Position, (position) => position.id_position)
  @JoinColumn({
    name: 'position_id',
    referencedColumnName: 'id_position',
  })
  position: Position;
}
