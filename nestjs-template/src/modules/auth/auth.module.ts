import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from 'nestjs-config';
import { UsersModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UsersModule, // 引入user的module
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('jwtSecret'),
      inject: [ConfigService],
    }), //导入配置 config/jwtSecret
  ],
  // controllers: [AuthController],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
