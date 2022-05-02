import './polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import Configuration from '@/config/configuration';

import { AdminModule } from '@/modules/admin/admin.module';
import { SharedModule } from '@/modules/shared/shared.module';
import { MissionModule } from '@/modules/mission/mission.module';
import { WSModule } from '@/modules/ws/ws.module';
import { LoggerModule } from '@/modules/logger/logger.module';

import {
  LoggerModuleOptions,
  WinstonLogLevel,
} from '@/modules/logger/logger.interface';
import { TypeORMLoggerService } from '@/modules/logger/typeorm-logger.service';
import { LOGGER_MODULE_OPTIONS } from '@/modules/logger/logger.constants';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    // orm模块
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: (
        configService: ConfigService,
        loggerOptions: LoggerModuleOptions,
      ) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get('database.logging'),
        timezone: configService.get('database.timezone'), // 时区
        // 自定义日志
        logger: new TypeORMLoggerService(
          configService.get('database.logging'),
          loggerOptions,
        ),
      }),
      inject: [ConfigService, LOGGER_MODULE_OPTIONS],
    }),
    // 队列模块
    BullModule.forRoot({}),
    // 自定义日志模块
    LoggerModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            level: configService.get<WinstonLogLevel>('logger.level'),
            consoleLevel: configService.get<WinstonLogLevel>(
              'logger.consoleLevel',
            ),
            timestamp: configService.get<boolean>('logger.timestamp'),
            maxFiles: configService.get<string>('logger.maxFiles'),
            maxFileSize: configService.get<string>('logger.maxFileSize'),
            disableConsoleAtProd: configService.get<boolean>(
              'logger.disableConsoleAtProd',
            ),
            dir: configService.get<string>('logger.dir'),
            errorLogName: configService.get<string>('logger.errorLogName'),
            appLogName: configService.get<string>('logger.appLogName'),
          };
        },
        inject: [ConfigService],
      },
      // global module
      true,
    ),
    // 共享模块
    SharedModule,
    // 定时/任务 模块
    MissionModule.forRoot(),
    // 后台系统模块
    AdminModule,
    // websocket 模块
    WSModule,
  ],
})
export class AppModule {}
