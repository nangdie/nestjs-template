import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreateUserInput {

    @Field({ nullable: false, description: "用户名", defaultValue: 'zhangsan' })
    public readonly name: string

    @Field({ nullable: false, description: "年龄" })
    public readonly age: number

    @IsNotEmpty({ message: '密码不能为空' })
    @MaxLength(10, { message: '密码最长为10位数' })
    @MinLength(6, { message: '密码最少6位数' })
    @Field({ nullable: false, description: '用户密码' })
    public readonly password: string

    @Field({ nullable: true, description: "地址" })
    public readonly address?: string

}
