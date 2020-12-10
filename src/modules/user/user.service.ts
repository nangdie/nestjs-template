import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UpdateUserInput } from './dtos/update-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,  // 使用泛型注入对应类型的存储库实例
    ) { }

    createUser(user: UpdateUserInput) {
        return this.userRepo.save(user)
    }

    findOneUser(id: string) {
        return this.userRepo.findOne(id)
    }
}
