import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

// 需要实现 ExceptionFilter 接口，里面有一个catch方法需要实现
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();			//获取状态信息
        const response = ctx.getResponse();
        const request = ctx.getRequest()
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionRes = exception.getResponse() as { error: string, message: string }

        const { error, message } = exceptionRes
        const errorResponse = {
            timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            message: message || exceptionRes,
            path: request?.url,
            status,
            error,
        }
        Logger.error(
            `${request?.method} ${request?.url}`,
            JSON.stringify(errorResponse),
            'HttpExceptionFilter',
        );
        response.status(status).json(errorResponse);
    }
}