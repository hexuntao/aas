import './polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import Configuration from '@/config/configuration';

import { LoggerModule } from '@/shared/logger/logger.module';
import { TypeORMLoggerService } from '@/shared/logger/typeorm-logger.service';
import {
  WinstonLogLevel,
  LoggerModuleOptions,
} from '@/shared/logger/logger.interface';
import { LOGGER_MODULE_OPTIONS } from '@/shared/logger/logger.constants';

import { SharedModule } from '@/shared/shared.module';
import { WSModule } from '@/ws/ws.module';
import { MissionModule } from '@/mission/mission.module';
import { AdminModule } from '@/modules/admin/admin.module';

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
    // 日志模块
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
    // socket模块
    WSModule,
    // 定时模块
    MissionModule.forRoot(),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
