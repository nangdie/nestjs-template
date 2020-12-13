import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel {
  @Field(() => ID)
  public readonly id: string

  @Field()
  public readonly name: string

  @Field()
  public readonly age: number

  @Field()
  public readonly address: string

}

@ObjectType()
export class ResultUserModel {
  @Field()
  public readonly result: UserModel

  @Field()
  public readonly code: number

  @Field()
  public readonly message: string

}