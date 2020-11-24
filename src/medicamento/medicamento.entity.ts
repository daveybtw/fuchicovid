import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';
// -------------------------------------------
@Entity('medicamentos')
// -------------------------------------------
export class MedicamentoEntity{
    @PrimaryColumn()
    id_medicamento: number;

    @Column('varchar', {length: 250})
    nombre_medicamento: string;

    @Column({type: 'bigint'})
    reserva_medicamento: number;

    @Column({type: 'bigint'})
    id_lab: number;
}