import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role_department' })
export default class SysRoleDepartment extends BaseEntity {
  @Column({ name: 'role_id', comment: '关联的角色id' })
  @ApiProperty({ description: '关联的角色id' })
  roleId: number;

  @Column({ name: 'department_id', comment: '关联的部门id' })
  @ApiProperty({ description: '关联的部门id' })
  departmentId: number;
}
