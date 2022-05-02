import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_config' })
export default class SysConfig extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true, comment: '参数键名' })
  @ApiProperty({ description: '参数键名' })
  key: string;

  @Column({ type: 'varchar', length: 50, comment: '参数名称' })
  @ApiProperty({ description: '参数名称' })
  name: string;

  @Column({ type: 'varchar', nullable: true, comment: '参数值' })
  @ApiProperty({ description: '参数值' })
  value: string;

  @Column({ type: 'varchar', nullable: true, comment: '备注' })
  @ApiProperty({ description: '备注' })
  remark: string;
}
