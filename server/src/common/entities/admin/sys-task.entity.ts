import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_task' })
export default class SysTask extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true, comment: '任务名称' })
  @ApiProperty({ description: '任务名称' })
  name: string;

  @Column({ comment: '调用服务' })
  @ApiProperty({ description: '调用服务' })
  service: string;

  @Column({ type: 'tinyint', default: 0, comment: '任务类型：0=Cron；1=间隔' })
  @ApiProperty({ description: '任务类型：0=Cron；1=间隔' })
  type: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1=运行；0=停止' })
  @ApiProperty({ description: '状态：1=运行；0=停止' })
  status: number;

  @Column({ name: 'start_time', type: 'datetime', nullable: true })
  @ApiProperty()
  startTime: Date;

  @Column({ name: 'end_time', type: 'datetime', nullable: true })
  @ApiProperty()
  endTime: Date;

  @Column({ type: 'int', nullable: true, default: 0 })
  @ApiProperty()
  limit: number;

  @Column({ nullable: true })
  @ApiProperty()
  cron: string;

  @Column({ type: 'int', nullable: true })
  @ApiProperty()
  every: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  data: string;

  @Column({ name: 'job_opts', type: 'text', nullable: true })
  @ApiProperty()
  jobOpts: string;

  @Column({ nullable: true })
  @ApiProperty()
  remark: string;
}
