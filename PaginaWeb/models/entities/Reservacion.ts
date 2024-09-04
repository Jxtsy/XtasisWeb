import { Entity, PrimaryGeneratedColumn, Column, Repository, ManyToOne} from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnetion';
import Lugares from './Lugar';

@Entity({ name: 'reservacion' })
export default class Reservacion
{
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true})
    public Id: number;

    @Column({ type: "varchar", length: 30, nullable: false})
    public nombreCompleto: string;

    @Column({ type: "varchar", length: 30, nullable: false})
    public correo: string;

    @Column({ type: "varchar", length: 12, nullable: false})
    public telefono: string;

    @Column({ type: "varchar", length: 30})
    public evento: string;

    @Column({ type: "int"})
    public numPersonas: number;

    @Column({ type: 'varchar', nullable: false })
    public fechaEvento: string;

    @Column({ type: 'time', nullable: false })
    public horaEvento: string;

    @ManyToOne(() => Lugares)
    lugar: Lugares

    @Column({ type: "varchar", nullable: true})
    public mensaje: string;

    @Column({type: 'date', nullable: false})
    public fechaCreacion: Date;

    @Column({ type: 'varchar', nullable: false})
    public lugarNombre: string;
    
    @Column({ type: 'int', nullable: false })
    public codigoEstado: boolean;
}