import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'xxx' }) // name 填入表名称，会自动创建这个表
export class XxxEntity {
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

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

}