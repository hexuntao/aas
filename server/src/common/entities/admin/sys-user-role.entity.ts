import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_user_role' })
export default class SysUserRole extends BaseEntity {
  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

  @Column({ name: 'role_id', comment: '角色id' })
  @ApiProperty({ description: '角色id' })
  roleId: number;
}
