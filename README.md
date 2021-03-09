# nestjs-template
nestjs模板构建、使用教程、功能的实现与封装

> 前提需要安装Node.js环境

## 概览

- [x] 定时执行任务
- [x] 文件上传和下载
- [x] 邮件服务（发送邮件）
- [x] 任务队列 （排队处理数据）
- [x] 监控服务器的性能、接口等
- [x] 封装异常处理（统一返回错误格式）
- [x] JWT鉴权，权限相关控制（注册/登陆）
- [x] HttpModule请求第三方接口（Axios封装）
- [x] 使用swagger生成API文档（提供给前端）
- [x] 使用GraphQL做接口 （前端可自定义数据）
- [x] 使用Typeorm操作数据库（Mysql的操作）
- [x] logger监听接口请求（打印前端请求详情）
- [x] 守卫验证角色 （ 判断是否有权限调用 ）
- [x] pipe管道转换参数类型（转换前端传递的值）

......

- [语雀](https://www.yuque.com/nangdie/datrmc)
- [Github](https://github.com/nangdie/nestjs-template)

## 1. 安装启动项目
```git
npm i -g @nestjs/cli
```
### 1.1 构建项目
> 将 service-nest 替换成你自己的项目名称

```git
nest new service-nest
```
不出意外你的项目文件如下
![image.png](https://cdn.nlark.com/yuque/0/2020/png/2991766/1607409404633-1d3f6622-5c60-4f26-8bde-eafe5afaf461.png#align=left&display=inline&height=388&margin=%5Bobject%20Object%5D&name=image.png&originHeight=388&originWidth=273&size=17783&status=done&style=none&width=273)
### 1.2 启动项目
> 更多命令查看 package.json文件

```git
yarn start
or
npm start
如你希望文件变化项目便自动重启，就在后面加:dev
yarn start:dev
or
npm start:dev
```
> 访问 [http://localhost:3000/](http://localhost:3000/) ，当你看到 Hello World! ，说明已正常运行。

### 1.3 路由加前缀
```typescript
import { NestFactory } from '@nestjs/core';

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api'); // 配置路由前缀 http://xxx:3000/api/*
await app.listen(3000);
```
## 3. 在src下多创建几个文件
> 在src下几个重要的文件介绍

| **文件夹/文件** | **说明** |
| --- | --- |
| main.ts 项目入口 | 整个项目的入口文件 |
| app.module.ts 模块集合 | 所有项目模块的集合 |
| modules 主要工作 | 路由模块存放/前端请求的接口可能都在这 |
| common 公共函数 | 存放公共方法/模块/类 |
| config 配置文件 | 存放固定参数配置文件，如：数据库/邮件/微信等 |
| tasks 定时任务 | 存放定时任务，如：定时更新任务、爬取页面等 |
| templates 模板文件 | 存放模板，如：邮件/HTML/短信模板等 |

## 4. 关于modules的几个约定文件
| **文件** | **快捷命令** | **说明** |
| --- | --- | --- |
| controller | nest g co modules/ | 控制器处理get|put|post等请求的参数，定义路由 |
| module | nest g mo modules/ | 负责功能模块引入、关联 |
| service | nest g s modules/ | 负责返回结果、查询数据库、查询其他接口 |
| resolver | nest g r modules/ | graphql |
| entity | 不支持 | 管理数据库表结构 |
| dto/ | 不支持 | 定义数据类型 |
| *.spec.ts | 自动 | 相关测试文件 |
|  |  |  |

### 4.1 module 示例
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { XxxController } from './xxx.controller';
import { XxxService } from './xxx.service';;
import { XxxEntity } from './xxx.entity';

@Module({
    imports: [TypeOrmModule.forFeature([XxxEntity])],
    controllers: [XxxController],
    providers: [XxxService],
    exports: [
        TypeOrmModule.forFeature([XxxEntity]),
    ],
})
export class XxxModule { }
```
### 4.2 entity 示例
```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BeforeInsert } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';


@Entity({ name: 'xxx' }) // name 填入表名称，会自动创建这个表
export class XxxEntity {

    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    @Column('tinyint', {
        nullable: false,
        default: () => 0,
        name: 'is_admin',
        comment: '是否管理员？ 1：是, 0：不是'
    })
    is_admin: number;

    @Column({
        length: 500,
        comment: '名字'
    })
    name: string;

    @Column('text')
    description: string;

    @Column()
    filename: string;

    @Column('int', {
        nullable: false,
        default: () => 1,
        name: 'sort',
        comment: '排序'
    })
    sort: number;

    @Column('varchar', {
        nullable: true,
        length: 100,
        name: 'url',
        comment: 'url地址'
    })
    url: string | null;

    @Exclude() // 表示排除字段
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'password',
        comment: '密码'
    })
    password: string;

    // 插入数据库前先给密码加密
    @BeforeInsert()
    public makePassword() {
        // this.password = makePassword(this.password)
    }

    // 检查密码是否正确
    public checkPassword(password: string, sqlPassword: string) {
        // return checkPassword(password, sqlPassword);
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
```
### 4.3 service 示例
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateXxxDto } from './dto/create.xxx.dto';
import { XxxEntity } from './xxx.entity';

@Injectable()
export class XxxService {
    constructor(@InjectRepository(XxxEntity) private readonly xxxRepository: Repository<XxxEntity>, ) { }
    
    get(id: string): string {
        return '使用了Get方法，传入ID为：' + id
    }
    create(body: CreateXxxDto): string {
        return '使用了post请求，传入内容' + JSON.stringify(body)
    }

    query(): Promise<any> {
        return this.xxxRepository.find() // 查询数据库
    }
}
```
### 4.4 controller 示例
```typescript
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
```
### 4.5 dto/xxx 示例
> dto/create.xxx.dto.ts

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateXxxDto {
    @IsString({ message: '用户名必须为字符类型' })
    @IsNotEmpty({ message: '用户名不能为空' })
    readonly name: string


    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly pwd: string
}
```


## 5. 补充需要用到的依赖
```typescript
npm i nestjs-config class-transformer class-validator
```
### nestjs-config 示例
> 将src/config/* 下面的文件导入

```typescript
ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')), // 配置导入路径
*.forRootAsync({
  		// useFactory 和 inject 一起使用
      useFactory: (config: ConfigService) => config.get('database'), 
      inject: [ConfigService]
})
// 相当于
import xxx from "src/config/xxx";
```
### class-transformer 示例
```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'xxx' }) // name 填入表名称，会自动创建这个表
export class XxxEntity {
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    @Exclude() // 表示排除字段
    @Column('varchar', {
        nullable: false,
        length: 100,
        name: 'password',
        comment: '密码'
    })
    password: string;

}
```
### class-validator 示例
> 验证数据

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateXxxDto {
    @IsString({ message: '用户名必须为字符类型' })
    @IsNotEmpty({ message: '用户名不能为空' })
    readonly name: string


    @IsString({ message: '密码必须为字符串类型' })
    @IsNotEmpty({ message: '密码不能为空' })
    readonly pwd: string
}
```
## 6. 路由模块导入到app.module.ts
> 基本上所有提供给前端的路由都导入到src/app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { XxxModule } from './modules/xxx/xxx.module';
@Module({
  imports: [
    XxxModule
  ],
})
export class AppModule { }
```
## 总结
```git
npm i -g @nestjs/cli
nest new x
yarn start:dev
```
### 流程

1.  yarn start:dev
1. 创建**logger**监听请求
1. 使用异常处理 **ExceptionFilter **封装统一格式
1. 添加**pipe**处理数据类型
1. **swagger **或者** GraphQL **提供API给前端
1. 构建路由常用四件套 [** controller + module + entity + service **]
1. **JWT** 或者**session** 登陆/注册
1. 守卫验证权限
