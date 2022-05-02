import 'dotenv/config';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationError } from 'class-validator';
import { flatten } from 'lodash';

import { AppModule } from './app.module';

import { ApiExceptionFilter } from '@/common/filters/api-exception.filter';
import { ApiTransformInterceptor } from '@/common/interceptors/api-transform.interceptor';
import { LoggerService } from '@/modules/logger/logger.service';

import { setupSwagger } from './setup-swagger';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );

  // 跨源资源共享
  app.enableCors();

  // 自定义日志 logger
  app.useLogger(app.get(LoggerService));

  // 管道 数据参数验证器
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          flatten(
            errors
              .filter((item) => !!item.constraints)
              .map((item) => Object.values(item.constraints)),
          ).join('; '),
        );
      },
    }),
  );

  // http 过滤器
  app.useGlobalFilters(new ApiExceptionFilter(app.get(LoggerService)));

  // http 拦截器
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));

  // websocket 通信
  app.useWebSocketAdapter(new IoAdapter());

  // swagger
  setupSwagger(app);

  // 启动
  await app.listen(PORT);
}

bootstrap().then(() => {
  Logger.log(`API服务已经启动: http://localhost:${PORT}`);
  Logger.log(
    `WS服务已经启动: http://localhost:${process.env.WS_PORT}${process.env.WS_PATH}`,
  );
  Logger.log(
    `API文档已生成: http://localhost:${PORT}${process.env.DOCS_PREFIX}`,
  );
});
