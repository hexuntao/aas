import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_task_log' })
export default class SysTaskLog extends BaseEntity {
  @Column({ name: 'task_id', comment: '任务id' })
  @ApiProperty({ description: '任务id' })
  taskId: number;

  @Column({ type: 'tinyint', default: 0, comment: '状态；0=失败；1=成功' })
  @ApiProperty({ description: '状态；0=失败；1=成功' })
  status: number;

  @Column({ type: 'text', nullable: true, comment: '异常信息' })
  @ApiProperty({ description: '异常信息' })
  detail: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'consume_time',
    default: 0,
    comment: '耗时',
  })
  @ApiProperty({ description: '耗时' })
  consumeTime: number;
}
