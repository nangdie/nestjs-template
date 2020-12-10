import { Column, Entity } from 'typeorm';
import { PublicEntity } from 'src/common/public.entity';

@Entity('user')
export class User extends PublicEntity {

    @Column({ comment: '名称' })
    name: string;

    @Column({ comment: '年龄' })
    age: number;

    @Column({ comment: '地址' })
    address: string;
}