import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ comment: '主键id' })
  @ApiProperty()
  id: number;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
