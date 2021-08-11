import { Global, Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [GlobalController],
  providers: [GlobalService]
})
export class GlobalModule { }
