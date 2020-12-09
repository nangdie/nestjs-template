import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxService } from './modules/xxx/xxx.service';
import { XxxController } from './modules/xxx/xxx.controller';
import { XxxModule } from './modules/xxx/xxx.module';


@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    XxxModule
  ],
  controllers: [AppController, XxxController],
  providers: [AppService, XxxService],
})
export class AppModule { }
