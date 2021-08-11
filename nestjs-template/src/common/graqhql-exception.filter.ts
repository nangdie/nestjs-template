import { Catch, ArgumentsHost, HttpException, Logger, HttpStatus, } from '@nestjs/common'
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'
import * as dayjs from 'dayjs';

// 过滤graqhql的异常
@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = host.switchToHttp();
    const httpRequest = this.getRequestFromCtx(ctx)
    const message = exception.getResponse() as { error: string, message: string }
    exception.message = `${message.message || ''} ${message.error || ''}`
    // 异常错误
    let request: any = {
      graphql: {
        args: gqlHost.getArgs(),
        root: gqlHost.getRoot(),
      },
    }
    console.log(exception.message,'.exception.message')
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
    } catch (error) {
      Logger.error(
        `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${exception.message}`,
        'GraphQLExceptionFilter'
      )
    }
    return exception;
  }

  getRequestFromCtx(ctx) {
    for (let arg of ctx.args) {
      if (arg && arg.request && arg.request?.url) {
        return arg.request
      }
    }
  }
}
