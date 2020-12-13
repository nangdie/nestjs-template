import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { NoAuth } from 'src/common/decorators/customize';

@Controller()
@ApiTags('auto')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * [ 登录 ] 执行login返回 access_token 令牌，用于验证登陆
   * @param req 
   * @param body 必须包含username和password，负责不会通过AuthGuard('local')。也可以修改LocalStrategy实现
   */
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '登陆', description: '执行登陆' })
  @Post('login')
  // @NoAuth()
  async login(@Request() req, @Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.name, body.password);
    return this.authService.createToken(user);
  }

  // [ 获取用户信息 ] 使用JWT验证。访问这个接口时会先验证access_token是否能够访问
  @ApiOperation({ summary: '当前用户信息', description: '当前用户信息' })
  @ApiHeader({
    name: 'Token',
    description: '验证用户的身份',
    required: true,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
