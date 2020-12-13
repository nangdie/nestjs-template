import { Field, ObjectType } from '@nestjs/graphql'

// @ObjectType()
// export class ResultPublicModel<T> {
//   @Field()
//   public readonly result: T

//   @Field()
//   public readonly code: number

//   @Field()
//   public readonly message: string

// }

@ObjectType()
export class ResultPublicModel {
  @Field()
  public readonly code: number

  @Field()
  public readonly message: string

}