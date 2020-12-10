import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PublicEntity } from 'src/common/public.entity';

@Entity('graph')
export class Graph extends PublicEntity {

    @Column({ comment: '名称' })
    name: string;

    @Column({ comment: '年龄' })
    age: number;

    @Column({ comment: '地址' })
    address: string;
}