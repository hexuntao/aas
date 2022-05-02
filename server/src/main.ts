import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { flatten } from 'lodash';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

import { LoggerService } from '@/shared/logger/logger.service';

import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { TransformInterceptor } from '@/interceptors/transform.interceptor';

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

  // 日志 logger
  app.useLogger(app.get(LoggerService));

  // 管道验证器
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

  // 过滤器
  app.useGlobalFilters(new HttpExceptionFilter(app.get(LoggerService)));

  // 拦截器
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));

  // socket
  app.useWebSocketAdapter(new IoAdapter());

  // swagger
  setupSwagger(app);

  await app.listen(PORT);
}

bootstrap().then(() => {
  Logger.log(`API服务已经启动: http://localhost:${PORT}`);
  Logger.log(
    `WS服务已经启动: http://localhost:${process.env.WS_PORT}${process.env.WS_PATH}`,
  );
  Logger.log(
    `API文档已生成: http://localhost:${PORT}/${process.env.DOCS_PREFIX}/`,
  );
});
