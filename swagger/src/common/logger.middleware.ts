import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from "dayjs";
import { isEmpty } from 'class-validator';

/**
* 局部监听客户端访问日志
*/
@Injectable()  // 使用Injectable装饰器
export class LoggerMiddleware implements NestMiddleware {  // 使用NestMiddleware实现
    oldPath: string
    number = 1
    use(req: Request, res: Response, next: Function) { 			//  重写方法
        const { method, path, baseUrl } = req;
        if (path === this.oldPath) this.number++
        else this.number = 1
        this.oldPath = path
        Logger.log(`${method} ${baseUrl} * ${this.number}`, 'LoggerMiddleware')
        // 必须调用next()将控制权传递给下一个中间件功能。否则请求将被挂起
        next();
    }
}


/**
 * 全局监听客户端访问日志
 */
export const LoggerGlobal = function () {
    let oldPath: string
    let number = 1
    return (req: Request, res: Response, next: Function) => {
        const { method, path } = req;
        if (path === oldPath) number++
        else number = 1
        oldPath = path
        Logger.log(`${method} ${path} * ${number}`, 'LoggerGlobal');
        next();
    };
}()