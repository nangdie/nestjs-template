import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { PublicEntity } from 'src/common/public.entity';
import { hashSync, compareSync } from 'bcrypt'


@Entity('user')
export class User extends PublicEntity {

    @Column({ comment: '名称' })
    name: string;

    @Column({ comment: '年龄' })
    age: number;

    @Column({ comment: '地址', nullable: true })
    address: string;

    @Column({ comment: '密码' })
    password: string;

    /**
     * 插入数据库前先给密码加密
     * 必须要对模型进行更新，才能触发
     * https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md#beforeupdate
     */
    @BeforeInsert()
    @BeforeUpdate()
    public makePassword() {
        this.password = hashSync(this.password, 10)
    }

    // 密码与数据库是否一致
    public isValidPassword(password: string): boolean {
        return compareSync(password, this.password)
    }
}