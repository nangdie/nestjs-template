import { resolve, join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './modules/xxx/xxx.module';
import { CatModule } from './modules/cat/cat.module';
import { GraphModule } from './modules/graph/graph.module';



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
    XxxModule,
    CatModule,
    GraphModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

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
