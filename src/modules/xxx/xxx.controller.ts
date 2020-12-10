import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
  UsePipes,
} from '@nestjs/common';
import { XxxService } from './xxx.service';
import { CreateXxxDto } from './dto/create.xxx.dto';
import { IpAddress } from 'src/common/decorators/ip.address';
import { ApiTags, ApiHeader, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@ApiTags('xxx') // 在swagger API文档添加标签名称，独立的一项列表
@ApiHeader({
  name: 'X-MyHeader',
  description: '自定义标题',
})
@Controller('xxx')
export class XxxController {
  constructor(private readonly xxxService: XxxService) {}

  @Post('login')
  login() {
    
  }

  // 创建 用户
  @ApiOperation({ summary: '创建用户', description: '创建用户' })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.xxxService.create(createUserDto);
  }

  // 错误的接口
  @ApiOperation({ summary: '错误的请求', description: '这个接口是错误的' })
  @Get('error')
  error() {
    throw new HttpException(
      {
        status: HttpStatus.OK,
        message: '这个接口不可能正确',
        error: '错误的原因，本就是因错误而错误',
      },
      HttpStatus.OK,
    );
  }

  // 查询全部
  @Get('all')
  query(@IpAddress() ip: string) {
    // 查询数据库
    console.log('访问者IP：', ip);
    return this.xxxService.query();
  }

  // 动态路由
  @Get(':id')
  get(@Param('id') id: string): Promise<CreateUserDto> {
    return this.xxxService.get(id);
  }
}
