import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {

  @Field({ nullable: true })
  public readonly name?: string

  @Field({ nullable: true })
  public readonly age?: number


  @Field({ nullable: true })
  public readonly address?: string

}
