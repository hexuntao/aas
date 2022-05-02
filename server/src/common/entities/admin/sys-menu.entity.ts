import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_menu' })
export default class SysMenu extends BaseEntity {
  @Column({ name: 'parent_id', nullable: true, comment: '上级id' })
  @ApiProperty({ description: '上级id' })
  parentId: number;

  @Column({ comment: '名称' })
  @ApiProperty({ description: '名称' })
  name: string;

  @Column({ nullable: true, comment: '菜单路由' })
  @ApiProperty({ description: '菜单路由' })
  router: string;

  @Column({ nullable: true, comment: '菜单权限' })
  @ApiProperty({ description: '菜单权限' })
  perms: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '菜单类型：0=目录；1=菜单；2=权限',
  })
  @ApiProperty({ description: '菜单类型：0=目录；1=菜单；2=权限' })
  type: number;

  @Column({ nullable: true, comment: '图标' })
  @ApiProperty({ description: '图标' })
  icon: string;

  @Column({
    name: 'order_num',
    type: 'int',
    default: 0,
    nullable: true,
    comment: '排序',
  })
  @ApiProperty({ description: '排序' })
  orderNum: number;

  @Column({ name: 'view_path', nullable: true, comment: '节点路径' })
  @ApiProperty({ description: '节点路径' })
  viewPath: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: true,
    comment: '是否缓存',
  })
  @ApiProperty({ description: '是否缓存' })
  keepalive: boolean;

  @Column({
    name: 'is_show',
    type: 'boolean',
    nullable: true,
    default: true,
    comment: '是否显示',
  })
  @ApiProperty({ description: '是否显示' })
  isShow: boolean;
}
