import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { XxxEntity } from './xxx.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class XxxService {
  constructor(
    @InjectRepository(XxxEntity)
    private readonly xxxRepository: Repository<XxxEntity>,
  ) {}

  get(id: string): Promise<XxxEntity> {
    return this.xxxRepository.findOne(id)
  }
  create(body: CreateUserDto): Promise<XxxEntity> {
    return this.xxxRepository.save(body);
  }

  query(): Promise<any> {
    return this.xxxRepository.find(); // 查询数据库
  }
}
