import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

// 需要实现 ExceptionFilter 接口，里面有一个catch方法需要实现
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();			//获取状态信息
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const exceptionRes: any = exception.getResponse();
        const {
            error,
            message,
        } = exceptionRes;

        // 返回的格式
        response.status(status).json({
            status,
            timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            error,
            message,
        });
    }
}