import { ApiProperty } from "@nestjs/swagger";
import { SaveOptions, RemoveOptions } from "typeorm";
import { UserEntity } from "../user.entity";

export class CreateUserDto extends UserEntity {

}


export class FindUserDto implements Partial<UserEntity>{
    @ApiProperty({
        required: false,
        description: '关键字查询'
    })
    nickname?: string
    @ApiProperty({
        required: false,
        description: '关键字查询'
    })
    name?: string
    @ApiProperty({
        required: false,
        description: '关键字查询'
    })
    id?: string

}