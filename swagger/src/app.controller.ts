import { Controller, Get, Logger, Req, Res, Session } from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { Request, Response } from "express";

import { AppService } from './app.service';
import { Sessions } from './common/decorators/sessions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@RealIP() ip: string, @Session() session: Record<string, any>, @Sessions('user') visits: string): string {
    console.log(visits, '自定义装饰器获取的值')
    session.visits = session.visits ? session.visits + 1 : 1;
    Logger.log(`访问者IP：${ip} , session内容: ${session.visits}`)
    return this.appService.getHello() + session.visits;
  }
}
