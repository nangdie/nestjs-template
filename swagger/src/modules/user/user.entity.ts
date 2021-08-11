import { Entity, Column, BeforeInsert, AfterLoad } from 'typeorm';
import { PublicEntity } from 'src/common/public.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Entity({ name: 'user' })
export class UserEntity extends PublicEntity {
    @ApiProperty({
        description: '真实姓名',
        default: '张三'
    })
    @Column({
        length: 10,
        comment: '真实姓名'
    })
    name: string;

    @ApiProperty({
        nullable: true,
        default: "",
        description: '所属部门ID'
    })
    @Column({
        nullable: true,
        comment: '所属部门ID',
    })
    classifyId?: string;

    @ApiProperty({
        nullable: true,
        default: "张Ⅲ的别名",
        description: '别名、昵称'
    })
    @Column({
        nullable: true,
        length: 500,
        comment: '别名、昵称',
        default: '别名'
    })
    nickname?: string;


    @ApiProperty({
        nullable: true,
        description: '年龄',
        default: 18
    })
    @Column('tinyint', {
        nullable: true,
        comment: '年龄'
    })
    age?: number;


    @ApiProperty({
        nullable: true,
        default: 'http://localhost:3000/avatar.png',
        description: '头像URL'
    })
    @Column('varchar', {
        nullable: true,
        default: 'http://localhost:3000/avatar.png',
        comment: '头像URL'
    })
    avatar?: string;


    @ApiProperty({
        nullable: true,
        description: '是否管理员？ 1：是, 0：不是'
    })
    @Column('tinyint', {
        nullable: false,
        default: () => 0,
        name: 'is_admin',
        comment: '是否管理员？ 1：是, 0：不是'
    })
    is_admin: number;

    @IsNotEmpty({ message: '密码不能为空' })
    @MaxLength(10, { message: '密码最长为10位数' })
    @MinLength(3, { message: '密码最少3位数' })
    @ApiProperty({ default: '123456', description: '密码' })
    @Column('varchar', {
        length: 100,
        comment: '密码',
        select: false,
    })
    password: string;

    /**
     * 插入数据库前先给密码加密
     * 想要触发BeforeInsert； 使用xx.create(xx)， 然后调用XxxEntity.save() 保存
     */
    @BeforeInsert()
    public makePassword() {
        const password = bcrypt.hashSync(this.password, 10)
        this.password = password
    }

    @AfterLoad() // 查询时隐藏密码
    hidePassword() {
        // delete this.password
    }

    // 密码与数据库是否一致
    public isValidPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }

    // 重新定义返回数据结构, 注意: 会导致上面的Exclude和Expose失效 !!!
    public toResponseObject(isShowPassword = false): object {
        const { password, ...params } = this;
        if (isShowPassword) {
            return Object.assign(isShowPassword, { password });
        } else {
            return params;
        }
    }

}