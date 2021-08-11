import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import jwtSecret from '../../config/jwtSecret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,  //是否忽略过期token
      secretOrKey: jwtSecret.secret,
    });
  }

  async validate(payload: any) {
    return payload
  }
}
