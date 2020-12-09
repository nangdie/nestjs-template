import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create.xxx.dto';
import { IpAddress } from 'src/common/decorators/ip.address';

@Controller('xxx')
export class XxxController {
    constructor(
        private readonly xxxService: XxxService,
    ) { }

    @Get('all')
    query(@IpAddress() ip: string) {   // 查询数据库
        console.log('访问者IP：',ip)
        return this.xxxService.query()
    }

    // 处理前端传过来的数据
    @Get(':id')
    get(@Param('id') id: string): string {
        return this.xxxService.get(id)
    }

    @Post()
    create(@Body() body: CreateXxxDto, @IpAddress() ip: string): string {
        return this.xxxService.create(body)
    }
}
