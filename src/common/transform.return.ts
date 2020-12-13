import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';
import systemConfig from "../config/system";


const transformValue = (result: any, code: number = 0, message: string = '请求成功') => {
    const { returnFormat } = systemConfig
    return {
        [returnFormat.result]: classToPlain(result),
        [returnFormat.code]: code,
        [returnFormat.message]: message,
    }
}

// 处理统一成功返回值
@Injectable()
export class TransformReturnInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const host = context.switchToHttp();
        const request = host.getRequest();

        // 不需要格式化的接口
        if (['/api/status'].includes(request?.url)) {
            return next.handle();
        }

        return next.handle().pipe(map(transformValue))
    }
}
