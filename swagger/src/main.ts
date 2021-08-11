import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerGlobal } from './common/logger.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { TransformReturnInterceptor } from './common/transform.return';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = process.env.PORT || 3000;
const PREFIX = 'api'
const SWAGGER_V1 = `${PREFIX}/v1/swagger`

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 访问静态文件
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.enableShutdownHooks(); // 开启监听生命周期

  app.setGlobalPrefix(PREFIX);
  const options = new DocumentBuilder()  // 创建并配置文档信息
    .setTitle('标题')
    .setDescription('描述信息')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 会自动将所有路由显示出来
  SwaggerModule.setup(SWAGGER_V1, app, document); // api/swagger = API文档的路径，访问：http://localhost:3000/api/swagger

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // 跨域资源共享
  app.enableCors()

  // 全局监听请求的接口
  app.use(LoggerGlobal);
  // 使用管道验证数据
  app.useGlobalPipes(new ValidationPipe());
  // 拦截错误的请求，返回统一格式
  app.useGlobalFilters(new HttpExceptionFilter());
  // 拦截返回数据-返回统一格式
  app.useGlobalInterceptors(new TransformReturnInterceptor());



  await app.listen(PORT, () => {
    Logger.debug(`
    测试页面：http://localhost:${PORT}
    启动成功：http://localhost:${PORT}/${PREFIX}
    API 文档：http://localhost:${PORT}/${SWAGGER_V1}`);

  });
}
bootstrap();
