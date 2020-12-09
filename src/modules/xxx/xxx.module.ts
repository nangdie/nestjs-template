import { Module } from '@nestjs/common';
import { XxxController } from './xxx.controller';
import { XxxService } from './xxx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XxxEntity } from './xxx.entity';

@Module({
    imports: [TypeOrmModule.forFeature([XxxEntity])],
    controllers: [XxxController],
    providers: [XxxService],
    exports: [
        TypeOrmModule.forFeature([XxxEntity]),
    ],
})
export class XxxModule { }