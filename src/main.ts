import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as requestIp from 'request-ip';
import * as rateLimit from 'express-rate-limit';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerGlobal } from './common/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformReturnInterceptor } from './common/transform.return';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { GraphQLExceptionFilter } from './common/graqhql-exception.filter';

const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const PORT = process.env.PORT || 3000;
const PREFIX = 'api'
const SWAGGER_V1 = `${PREFIX}/v1/swagger`
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(PREFIX);

  const options = new DocumentBuilder()  // 创建并配置文档信息
    .setTitle('标题')
    .setDescription('描述信息')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 会自动将所有路由显示出来
  SwaggerModule.setup(SWAGGER_V1, app, document); // api/swagger = API文档的路径，访问：http://localhost:3000/api/swagger

  // 跨域资源共享
  app.enableCors()

  // 限制访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 500, // 限制15分钟内最多只能访问500次
    }),
  );

  app.use(bodyParser.xml({
    limit: '1MB',   // 拒绝大于1 MB的有效负载
    xmlParseOptions: {
      normalize: true,     // 在文本节点内修剪空格
      normalizeTags: true, // 将标签转换为小写
      explicitArray: false // 如果> 1，则仅将节点放入数组
    }
  }));

  // web安全
  // app.use(helmet())

  // 拦截处理-错误异常
  // graphQL专属异常过滤
  // app.useGlobalFilters(new GraphQLExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  // 拦截处理-返回格式
  app.useGlobalInterceptors(new TransformReturnInterceptor());

  // 获取访问者ip地址
  app.use(requestIp.mw());

  // 全局监听路由请求
  app.use(LoggerGlobal);

  // 使用管道验证数据
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.log(`已启动，接口： http://localhost:${PORT}/${PREFIX} ， API文档：http://localhost:${PORT}/${SWAGGER_V1}`);
  });

}

bootstrap().catch(err => Logger.error('启动错误：', err));
