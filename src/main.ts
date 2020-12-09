import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/logger/logger.global';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // 全局监听路由请求
  app.use(logger);
  
  await app.listen(3000);
}
bootstrap();
