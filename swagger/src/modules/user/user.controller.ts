import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { CreateUserDto, FindUserDto } from './dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        try {
            const user = await this.userService.create(body)
            return user
        } catch (error) {
            throw new HttpException(
                { message: '创建用户失败', error: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('all')
    @ApiQuery({
        type: FindUserDto
    })
    @ApiResponse({                                      // 处理响应
        status: 200,
        description: '返回用户信息对象',
        type: [UserEntity]
    })
    async findAll(@Query() query: FindUserDto) {
        return this.userService.findAll()
    }

    @Get(':id')
    @ApiResponse({                                      // 处理响应
        status: 200,
        description: '返回用户信息对象',
        type: UserEntity
    })
    async findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

}
