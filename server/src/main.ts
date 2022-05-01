import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

import { LoggerService } from '@/shared/logger/logger.service';

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

  // swagger
  setupSwagger(app);

  await app.listen(PORT);
}

bootstrap().then(() => {
  Logger.log(`API服务已经启动: http://localhost:${PORT}`);
  Logger.log(
    `API文档已生成: http://localhost:${PORT}/${process.env.DOCS_PREFIX}/`,
  );
});
