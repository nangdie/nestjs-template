import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
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
        if (response?.status) {
            const { error, message } = exceptionRes
            const errorResponse = {
                timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                message: message || exceptionRes,
                path: request?.url,
                status,
                error,
            }
            Logger.error(
                `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${request?.method} ${request?.url}`,
                JSON.stringify(errorResponse),
                'HttpExceptionFilter',
            );
            response.status(status).json(errorResponse);
        } else {
            // 单独处理过滤graqhql的异常
            const gqlHost = GqlArgumentsHost.create(host);
            const httpRequest = this.getRequestFromCtx(ctx)
            exception.message = `${exceptionRes.message || ''} ${exceptionRes.error || ''}`
            // 异常错误
            let request: any = {
                graphql: {
                    args: gqlHost.getArgs(),
                    root: gqlHost.getRoot(),
                },
            }
            try {
                if (httpRequest) {
                    request = Object.assign(request, {
                        url: httpRequest.url,
                        body: httpRequest.body,
                        query: httpRequest.query,
                        params: httpRequest.params,
                        headers: httpRequest.headers,
                        currentUser: httpRequest.currentUser
                    })
                }
                request = JSON.stringify(request)
                Logger.error(
                    `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${exception.message}`,
                    JSON.stringify(request),
                    'GraphQLExceptionFilter'
                )
            } catch {
                Logger.error(
                    `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${exception.message}`,
                    '处理graqhql异常时',
                    'GraphQLExceptionFilter'
                )
            }
            return exception;
        }
    }

    getRequestFromCtx(ctx) {
        for (let arg of ctx.args) {
            if (arg && arg.request && arg.request?.url) {
                return arg.request
            }
        }
    }


}