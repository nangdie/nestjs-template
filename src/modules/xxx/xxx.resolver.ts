import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { XxxEntity } from './xxx.entity';
import { XxxService } from './xxx.service';

@Resolver('xxx')
export class GraphResolver {
    constructor(@Inject(XxxService) private readonly xxxService: XxxService, ) { }

    // 创建
    @Mutation('createGraph')
    createXxx(@Args('graph') xxx: XxxEntity): Promise<XxxEntity> {
        return this.xxxService.create(xxx)
    }

    // 查询
    @Query('findOneGraph')
    findOneXxx(@Args('id') id: string): Promise<any> {
        return this.xxxService.get(id)
    }

}
