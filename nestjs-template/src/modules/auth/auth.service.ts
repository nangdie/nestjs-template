import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService, // 引入用户的服务
        private readonly jwtService: JwtService,
    ) { }

    // 验证用户
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.nameFindUser(username);
        if (!user) throw new HttpException({
            message: "验证失败",
            error: '没有找到有效用户'
        }, HttpStatus.OK)
        if (!user.isValidPassword(password)) throw new HttpException({
            message: "验证失败",
            error: '密码错误'
        }, HttpStatus.OK)
        return user
    }

    // 使用jwt加密用户的信息到access_token返回
    async createToken(user: any,): Promise<{ access_token: string }> {
        const { password, ...payload } = user
        return { access_token: this.jwtService.sign(payload) };
    }
}