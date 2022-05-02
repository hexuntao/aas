import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_department' })
export default class SysDepartment extends BaseEntity {
  @Column({ name: 'parent_id', nullable: true, comment: '上级部门id' })
  @ApiProperty({ description: '上级部门id' })
  parentId: number;

  @Column({ comment: '名称' })
  @ApiProperty({ description: '名称' })
  name: string;

  @Column({
    name: 'order_num',
    type: 'int',
    nullable: true,
    default: 0,
    comment: '排序',
  })
  @ApiProperty({ description: '排序' })
  orderNum: number;
}
