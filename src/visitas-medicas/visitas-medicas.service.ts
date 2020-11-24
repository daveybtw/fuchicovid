import { Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitasMedicasEntity } from './visitas-medicas.entity';
import { visitasDto } from './dto/visitas-medicas.dto';

@Injectable()
export class VisitasMedicasService {
    constructor(
        @InjectRepository(VisitasMedicasEntity)
        private visitasRepository: Repository<VisitasMedicasEntity>
    ){}

    public async createNewVisita(parametros){
        const newVisita = new VisitasMedicasEntity;
        newVisita.id_visita = 0;
        newVisita.temperatura_paciente = parametros.temperatura_paciente;
        newVisita.presion_paciente = parametros.presion_paciente;
        newVisita.id_doctor = parametros.id_doctor;
        newVisita.id_paciente = parametros.id_paciente;
        newVisita.fecha_visita = parametros.fecha_visita;
        return this.visitasRepository.save(newVisita);
    }

    public async findVisitaPaciente(id: number): Promise<any>{
        return await this.visitasRepository.find({
            where: [
                {id_paciente: id}
            ]
        })
    }

    public async findVisitaDoctor(id: number): Promise<any>{
        return await this.visitasRepository.find({
            where: [
                {id_doctor: id}
            ]
        })
    }

    public async findAllVisits(){
        return await this.visitasRepository.find();
    }
}
