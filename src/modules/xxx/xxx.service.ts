import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XxxEntity } from './xxx.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class XxxService {
    constructor(@InjectRepository(XxxEntity) private readonly xxxRepository: Repository<XxxEntity>) {

    }

    get(id: string): string {
        return '使用了Get方法，传入ID为：' + id
    }
    create(body: CreateUserDto): any {
        return this.xxxRepository.create(body)

    }

    query(): Promise<any> {
        return this.xxxRepository.find() // 查询数据库
    }
}
