import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
// import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { resolve } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    OrderModule,
    GlobalModule,
    // SessionModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService): Promise<NestSessionOptions> => config.get('session'),
    // }),

    // SessionModule.forRoot({
    //   session: {
    //     saveUninitialized: true,
    //     resave: false,
    //     // secret: 'keyboard cat',
    //     secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC',
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
