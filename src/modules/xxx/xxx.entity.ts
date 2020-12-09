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
        length: 10,
        comment: '名字'
    })
    name: string;

    @Column('text')
    description: string;

 
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