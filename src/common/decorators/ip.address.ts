import { createParamDecorator } from '@nestjs/common';
import * as requestIp from 'request-ip';

/*
 * @Description: 自定义获取ip地址的装饰器
 * @Github: https://github.com/nangdie
 * @Email: nangdie.a@gmail.com
 */
export const IpAddress = createParamDecorator((_, req) => {
    if (req.clientIp) return req.clientIp;
    return requestIp.getClientIp(req);
});