import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Graph } from './graph.entity';
import { GraphService } from './graph.service';
import { GraphResolver } from './graph.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Graph])],
    providers: [GraphResolver, GraphService],
})
export class GraphModule { }
