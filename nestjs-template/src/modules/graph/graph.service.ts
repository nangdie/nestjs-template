import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Graph } from './graph.entity';

@Injectable()
export class GraphService {
    constructor(
        @InjectRepository(Graph) private readonly graphRepo: Repository<Graph>,  // 使用泛型注入对应类型的存储库实例
    ) { }

    createGraph(graph: Graph) {
        return this.graphRepo.save(graph)
    }

    findOneGraph(id: number) {
        return this.graphRepo.findOne(id)
    }
}
