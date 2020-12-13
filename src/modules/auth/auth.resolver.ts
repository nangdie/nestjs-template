import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dtos/login.input';
import { NoAuth } from 'src/common/decorators/customize';
import { ResultAuthModule, ResultAuthToken } from './dtos/auth.module';
import { GqlCurrentUser } from 'src/common/decorators/gql.user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => LoginInputDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ResultAuthToken)
  async login(@Args('input') input: LoginInputDto) {
    const user = await this.authService.validateUser(
      input.name,
      input.password,
    );
    return this.authService.createToken(user);
  }

  @Query(() => ResultAuthModule)
  @UseGuards(GqlAuthGuard)
  getProfile(@GqlCurrentUser() user: any) {
    return user;
  }
}
