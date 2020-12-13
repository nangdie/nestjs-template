import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // LocalStrategy默认只接收username和password，传入这些字段修改默认值
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        { message: '授权失败', error: '请稍后在再试' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
