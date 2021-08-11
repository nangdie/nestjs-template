import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiPropertyOptional({
    required: true,
    description: '是否是管理员',
    enum: [0, 1],
  })
  @IsEnum(
    { 普通用户: 0, 管理员: 1 },
    { message: '是否管理员？ 1：是, 0：不是' },
  )
  @IsNumber()
  @Transform((value) => parseInt(value, 10))
  @IsNotEmpty({ message: '身份不能为空' })
  readonly is_admin?: number;

  @ApiPropertyOptional({ required: true, description: '用户名' })
  @MaxLength(10, { message: '名字最长10位数' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '名字必须是字符串' })
  readonly name: string;

  @ApiPropertyOptional({ required: false, description: '备注信息' })
  @IsString({ message: '备注信息必须是字符串' })
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ required: true, description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MaxLength(10, { message: '密码最长为10位数' })
  @MinLength(6, { message: '密码最少6位数' })
  readonly password: string;
}
