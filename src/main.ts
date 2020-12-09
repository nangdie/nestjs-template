import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as requestIp from 'request-ip';
import * as rateLimit from 'express-rate-limit';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerGlobal } from './common/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformReturnInterceptor } from './common/transform.return';


const PORT = process.env.PORT || 3000;
console.log(process.env.PORT)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // 跨域资源共享
  app.enableCors()

  // 限制访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 500, // 限制15分钟内最多只能访问500次
    }),
  );

  // web安全
  app.use(helmet())

  // 拦截处理-错误异常
  app.useGlobalFilters(new HttpExceptionFilter());

  // 拦截处理-返回格式
  app.useGlobalInterceptors(new TransformReturnInterceptor());

  // 获取访问者ip地址
  app.use(requestIp.mw());

  // 全局监听路由请求
  app.use(LoggerGlobal);

  await app.listen(PORT, () => {
    Logger.log(`已启动，请访问： http://localhost:${PORT}`);
  });

}

bootstrap().catch(err => Logger.error('启动错误：', err));
