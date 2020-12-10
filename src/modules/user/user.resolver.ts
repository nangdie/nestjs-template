import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Mutation, Query, ID } from '@nestjs/graphql'

import { ResultUserModel, UserModel } from './dtos/user.model'
import { UpdateUserInput } from './dtos/update-user.input'
import { UserService } from './user.service'
import { UsersModule } from './user.module'

@Resolver(() => UserModel)
export class UserResolver {
    constructor(private readonly usersService: UserService) {
        this.usersService = usersService
    }


    @Mutation(() => ResultUserModel)
    public updateUser(@Args('input') input: UpdateUserInput): Promise<UsersModule> {
        return this.usersService.createUser(input)
    }

    @Query(() => UserModel)
    public async getAnnouncements(
        @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<UsersModule> {
        return this.usersService.findOneUser(id)
    }
}
