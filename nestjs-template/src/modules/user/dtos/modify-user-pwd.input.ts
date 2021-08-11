import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

@InputType()
export class ModifyUserPwdInput {

    @Field({ nullable: false })
    public readonly id: string

    @IsNotEmpty({ message: '当前密码不能为空' })
    @MaxLength(10, { message: '当前密码最长为10位数' })
    @MinLength(6, { message: '当前密码最少6位数' })
    @Field({ nullable: false })
    public readonly password: string


    @IsNotEmpty({ message: '新密码不能为空' })
    @MaxLength(10, { message: '新密码最长为10位数' })
    @MinLength(6, { message: '新密码最少6位数' })
    @Field({ nullable: false })
    public readonly newPassword: string

}
