import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role_menu' })
export default class SysRoleMenu extends BaseEntity {
  @Column({ name: 'role_id', comment: '关联的角色id' })
  @ApiProperty({ description: '关联的角色id' })
  roleId: number;

  @Column({ name: 'menu_id', comment: '关联的菜单id' })
  @ApiProperty({ description: '关联的菜单id' })
  menuId: number;
}
