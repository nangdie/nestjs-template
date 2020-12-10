import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Resolver('Cat')
export class CatResolver {
    constructor(@Inject(CatService) private readonly catService: CatService, ) { }

    @Mutation('createCat')
    async createCat(@Args('cat') cat: Cat): Promise<any> {
        return this.catService.createCat(cat);

    }

    @Mutation('deleteCat')
    async deleteCat(@Args('id') id: number): Promise<any> {
        return this.catService.deleteCat(id);

    }

    @Mutation('updateCat')
    async updateCat(@Args() updateInput: { id: number, cat: Cat }): Promise<any> {
        return this.catService.updateCat(updateInput.id, updateInput.cat);

    }

    @Query('findOneCat')
    async findOneCat(@Args('id') id: number): Promise<any> {
        return this.catService.findOneCat(id);

    }

    @Query('findCats')
    async findCats(): Promise<any> {
        return this.catService.findCats();
    }
}