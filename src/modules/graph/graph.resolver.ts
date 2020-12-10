import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject, Controller } from '@nestjs/common';
import { Graph } from './graph.entity';
import { GraphService } from './graph.service';

@Resolver('graph')
export class GraphResolver {
    constructor(@Inject(GraphService) private readonly graphService: GraphService, ) { }

    // 创建
    @Mutation('createGraph')
    createGraph(@Args('graph') graph: Graph): Promise<Graph> {
        return this.graphService.createGraph(graph)
    }

    // 查询
    @Query('findOneGraph')
    findOneCat(@Args('id') id: number): Promise<any> {
        return this.graphService.findOneGraph(id)
    }

   

}
