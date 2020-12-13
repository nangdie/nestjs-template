import { resolve, join } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './modules/xxx/xxx.module';
// import { GraphModule } from './modules/graph/graph.module';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
 
import { RoleAuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('graphQL'),
      inject: [ConfigService],
    }),

    // 路由模块
    AuthModule,
    XxxModule,
    UsersModule, // graphql   代码优先
    // GraphModule, // graphql 模式优先
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 使用全局 JWT 守卫 ，默认开启，关闭时使用装饰器: @noAuth()
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleAuthGuard,
    // },
  ],
})
export class AppModule {}

/* 局部监听 */
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware)
//       // 不监听的路由
//       .exclude()
//       // 需要监听的路由
//       .forRoutes({
//         path: '*',
//         method: RequestMethod.ALL
//       })
//   }
// }
