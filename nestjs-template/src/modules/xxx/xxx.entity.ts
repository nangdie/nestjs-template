import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import bcrypt from 'bcrypt'
import { PublicEntity } from 'src/common/public.entity';

// name 填入表名称，会自动创建这个表
@Entity({ name: 'xxx' })
export class XxxEntity extends PublicEntity {
  @Column('int', {
    nullable: false,
    default: () => 0,
    name: 'is_admin',
    comment: '是否管理员？ 1：是, 0：不是',
  })
  is_admin: number;

  @Column('varchar', {
    length: 10,
    comment: '名字',
  })
  name: string;

  @Column('text', {
    nullable: true
  })
  description: string;

  @Exclude() // 表示排除字段
  @Column('varchar', {
    nullable: false,
    length: 16,
    name: 'password',
    comment: '密码',
  })
  password: string;


  // 插入数据库前先给密码加密
  @BeforeInsert()
  public makePassword() {
    return bcrypt.hashSync(this.password, 10)
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
