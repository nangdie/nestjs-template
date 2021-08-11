import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {

    }
    async create(body: UserEntity) {
        const user = await this.userRepository.create(body)
        return user.save()
    }

    async findOne(id: string) {
        return this.userRepository.findOne(id)
    }

    findAll() {
        return this.userRepository.find()
    }
}
