import { ObjectType, Field } from '@nestjs/graphql';
import { ResultPublicModel } from 'src/common/public.module';

@ObjectType()
export class authModule {
  @Field({ nullable: true, description: '用户ID' })
  public readonly id: string;

  @Field({ nullable: true, description: '年龄' })
  public readonly age: number;

  @Field({ nullable: true, description: '姓名' })
  public readonly name: string;
}

@ObjectType()
export class ResultAuthModule extends ResultPublicModel {
  @Field()
  public readonly result: authModule;
}

@ObjectType()
export class ResultAuth {
  @Field()
  public readonly access_token: string;
}

@ObjectType()
export class ResultAuthToken extends ResultPublicModel {
  @Field()
  public readonly result: ResultAuth;
}
