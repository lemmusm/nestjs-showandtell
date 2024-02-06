import { Developer } from 'src/developers/entities/developer.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'positions' })
export class Position {
  @PrimaryColumn({ type: 'binary', length: 16 })
  id_position: Buffer | string;
  @Column()
  position: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
  @OneToMany(() => Developer, (developer) => developer.id_developer)
  @JoinColumn({
    name: 'id_position',
    referencedColumnName: 'position_id',
  })
  developer: Developer;
}
