import { Injectable } from '@nestjs/common';
import { CreateXxxDto } from './dto/create.xxx.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XxxEntity } from './xxx.entity';

@Injectable()
export class XxxService {
    constructor(@InjectRepository(XxxEntity) private readonly xxxRepository: Repository<XxxEntity>, ) { }
    
    get(id: string): string {
        return '使用了Get方法，传入ID为：' + id
    }
    create(body: CreateXxxDto): string {
        return '使用了post请求，传入内容' + JSON.stringify(body)
    }

    query(): Promise<any> {
        return this.xxxRepository.find() // 查询数据库
    }
}
