
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Sessions = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.session?.[data] : request.session;
    },
);