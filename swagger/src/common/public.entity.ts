import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PublicEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
        comment: '主键id',
    })
    id: string;


    @Exclude()
    @Column('tinyint', {
        nullable: false,
        default: () => 0,
        name: 'is_del',
        comment: '是否删除,1表示删除,0表示正常'
    })
    isDel?: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'created_at',
        comment: '创建时间'
    })
    createdAt?: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'updated_at',
        comment: '更新时间',
    })
    updatedAt?: Date;

    @ApiProperty({
        nullable: true,
        default: "",
        description: '备注信息'
    })
    @Column({
        nullable: true,
        comment: "备注信息"
    })
    remark?: string

    @ApiProperty({
        nullable: true,
        description: '排序 - 控制是否置顶'
    })
    @Column('tinyint', {
        nullable: true,
        default: () => 0,
        name: 'sort',
        comment: '排序 - 控制是否置顶'
    })
    sort?: number;
}