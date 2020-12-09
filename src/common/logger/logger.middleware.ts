import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()  // 使用Injectable装饰器
export class LoggerMiddleware implements NestMiddleware {  // 使用NestMiddleware实现
    use(req: Request, res: Response, next: Function) { 			//  重写方法
        const { method, path, baseUrl } = req;
        console.log(`${method} ${baseUrl}`);                    // 打印访问日志，根据需求修改
        // 必须调用next()将控制权传递给下一个中间件功能。否则请求将被挂起
        next();
    }
}