import { Catch, ArgumentsHost, HttpException, } from '@nestjs/common'
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host)
    return exception
  }
}
