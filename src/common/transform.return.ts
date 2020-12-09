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
    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(transformValue))
    }
}
