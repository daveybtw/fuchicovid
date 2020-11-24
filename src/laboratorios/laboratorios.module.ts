import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoriosController } from './laboratorios.controller';
import { LaboratoriosEntity } from './laboratorios.entity';
import { LaboratoriosService } from './laboratorios.service';

@Module({
  imports: [TypeOrmModule.forFeature([LaboratoriosEntity])],
  controllers: [LaboratoriosController],
  providers: [LaboratoriosService]
})
export class LaboratoriosModule {}
