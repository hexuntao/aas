import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_user' })
export default class SysUser extends BaseEntity {
  @Column({ name: 'department_id', comment: '部门id' })
  @ApiProperty({ description: '部门id' })
  departmentId: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ length: 32 })
  @ApiProperty()
  psalt: string;

  @Column({ name: 'nick_name', nullable: true })
  @ApiProperty()
  nickName: string;

  @Column({ name: 'head_img', nullable: true })
  @ApiProperty()
  headImg: string;

  @Column({ nullable: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: true })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  remark: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
    comment: '状态：1=启用；0=停用',
  })
  @ApiProperty({ description: '状态：1=启用；0=停用' })
  status: number;
}
