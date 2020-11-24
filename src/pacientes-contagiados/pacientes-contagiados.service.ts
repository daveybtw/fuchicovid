import { Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacientesContagiadosEntity } from './pacientes-contagiados.entity';
import { pacientesDto } from './dto/pacientes-contagiados.dto';

@Injectable()
export class PacientesContagiadosService {
    constructor(
        @InjectRepository(PacientesContagiadosEntity)
        private pacientesRepository: Repository<PacientesContagiadosEntity>,
    ){}

    public async createNewPaciente(parametros){
        const newPaciente = new PacientesContagiadosEntity;
        newPaciente.id_persona = parametros.id_persona;
        newPaciente.tipo_id = parametros.tipo_id;
        newPaciente.id_doctor = parametros.id_doctor;
        newPaciente.ciudad_contagio = parametros.ciudad_contagio;
        newPaciente.telefono_emergencias1 = parametros.telefono_emergencias1;
        newPaciente.telefono_emergencias2 = parametros.telefono_emergencias2;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        newPaciente.fecha_registro_paciente = dd + '/' + mm + '/' + yyyy;
        newPaciente.geo_paciente = parametros.geo_paciente;
        var pacienteCreado = this.pacientesRepository.save(newPaciente);
        return pacienteCreado;
    }

    public async findPaciente(documento: number): Promise<any>{
        return await this.pacientesRepository.find({
            where: [
                {id_persona: documento}
            ]
        })
    }
}
