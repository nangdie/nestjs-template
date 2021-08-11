 import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(10, { message: '密码最长为10位数' })
  @MinLength(6, { message: '密码最少6位数' })
  @ApiPropertyOptional({
    required: true,
    description: '密码',
    default: '123456',
  })
  public readonly password: string;

  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须为字符串' })
  @ApiPropertyOptional({
    required: true,
    description: '用户名',
    default: 'user',
  })
  public readonly name: string;

//   @IsNotEmpty({ message: '用户名2不能为空' })
//   @IsString({ message: '用户名2必须为字符串' })
//   @ApiPropertyOptional({
//     required: true,
//     description: '用户名2',
//     default: 'user',
//   })
//   public readonly username: string;
}
