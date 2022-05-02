import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role' })
export default class SysRole extends BaseEntity {
  @Column({ name: 'user_id', comment: '用户id' })
  @ApiProperty({ description: '用户id' })
  userId: string;

  @Column({ unique: true, comment: '名称' })
  @ApiProperty({ description: '名称' })
  name: string;

  @Column({ length: 50, unique: true, comment: '标识' })
  @ApiProperty({ description: '标识' })
  label: string;

  @Column({ nullable: true, comment: '备注' })
  @ApiProperty({ description: '备注' })
  remark: string;
}
