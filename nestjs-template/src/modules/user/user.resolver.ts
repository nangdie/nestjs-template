import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation, Query, ID } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ResultUserModel, UserModel } from './dtos/user.model';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserService } from './user.service';
import { UsersModule } from './user.module';
import { CreateUserInput } from './dtos/create-user.input';
import { ModifyUserPwdInput } from './dtos/modify-user-pwd.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { GqlCurrentUser } from 'src/common/decorators/gql.user';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly usersService: UserService) {
    this.usersService = usersService;
  }

  @Query(() => ResultUserModel)
  //   @UseGuards(GqlAuthGuard)  // graphql专属身份验证
  public async getAnnouncements(
    @Args({ name: 'id', type: () => ID }) id: string,
    @GqlCurrentUser() user: any,
  ): Promise<UsersModule> {
    console.log(user, '当前用户');
    return this.usersService.findOneUser(id);
  }

  @Mutation(() => ResultUserModel)
  public createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserInput> {
    return this.usersService.createUser(input);
  }

  @Mutation(() => ResultUserModel)
  modifyPassword(@Args('input') input: ModifyUserPwdInput) {
    return this.usersService.modifyPassword(input);
  }
}
