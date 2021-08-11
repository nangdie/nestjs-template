import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getManager, Repository } from 'typeorm';

import { User } from './user.entity';
import { UpdateUserInput } from './dtos/update-user.input';
import { CreateUserInput } from './dtos/create-user.input';
import { ModifyUserPwdInput } from './dtos/modify-user-pwd.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,  // 使用泛型注入对应类型的存储库实例
    ) { }

    createUser(user: CreateUserInput) {
        return this.userRepo.save(this.userRepo.create(user))
    }

    nameFindUser(name: string) {
        return this.userRepo.findOne({
            where: {
                name
            }
        })
    }

    findOneUser(id: string) {
        return this.userRepo.findOne(id)
    }

    async modifyPassword(user: ModifyUserPwdInput) {
        const currentUser = await this.userRepo.findOne(user.id)
        if (!currentUser) throw new HttpException({
            message: "系统繁忙",
        }, HttpStatus.OK)
        const status = currentUser.isValidPassword(user.password)
        if (!status) throw new HttpException({
            message: "当前密码不正确",
        }, HttpStatus.OK)
        currentUser.password = user.newPassword
        return this.userRepo.save(currentUser)
    }
    
}
