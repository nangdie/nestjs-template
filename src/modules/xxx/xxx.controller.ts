import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create.xxx.dto';

@Controller('xxx')
export class XxxController {
    constructor(
        private readonly xxxService: XxxService,
    ) { }

    @Get('all')
    query() {   // 查询数据库
        return this.xxxService.query()
    }
    
    // 处理前端传过来的数据
    @Get(':id')
    get(@Param('id') id: string): string {
        return this.xxxService.get(id)
    }

    @Post()
    create(@Body() body: CreateXxxDto): string {
        return this.xxxService.create(body)
    }
}
