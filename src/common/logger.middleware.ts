import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from "dayjs";
import { isEmpty } from 'class-validator';

@Injectable()  // 使用Injectable装饰器
export class LoggerMiddleware implements NestMiddleware {  // 使用NestMiddleware实现
    use(req: Request, res: Response, next: Function) { 			//  重写方法
        const { method, path, baseUrl } = req;
        Logger.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${method} ${baseUrl}`, 'LoggerMiddleware')
        // 必须调用next()将控制权传递给下一个中间件功能。否则请求将被挂起
        next();
    }
}


// 全局监听
export function LoggerGlobal(req: Request, res: Response, next: Function) {
    const { method, path } = req;
    Logger.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${method} ${path}`, 'LoggerGlobal');
    next();
};
