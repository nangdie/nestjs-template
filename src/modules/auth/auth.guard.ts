import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

// 自定义身份认证，替代AuthGuard('jwt')

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 判断是否使用nnoAuth装饰器
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    const guard = RoleAuthGuard.getAuthGuard(noAuth);
    // Guard执行原来的canActivate方法
    return guard.canActivate(context);
  }

  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    return noAuth ? new (AuthGuard('local'))() : new (AuthGuard('jwt'))();
  }
}
