import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class LoginInputDto {
  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(10, { message: '密码最长为10位数' })
  @MinLength(6, { message: '密码最少6位数' })
  @Field({ nullable: false, description: "用户名", defaultValue: 'user' })
  public readonly password: string;

  @Field({ nullable: false, description: "用户名", defaultValue: '123456' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须为字符串' })
  public readonly name: string;

  // @Field({ nullable: false, description: "用户名2", defaultValue: 'user' })
//   @IsNotEmpty({ message: '用户名2不能为空' })
//   @IsString({ message: '用户名2必须为字符串' })
//   public readonly username: string;
}
