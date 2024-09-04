import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnetion';

@Entity({ name: 'lugar' })
export default class Lugares
{
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true})
    public Id: number;

    @Column({ type: "varchar", length: 30, nullable: false})
    public nombre: string;

    @Column({ type: "varchar", length: 150, nullable: false})
    public descripcion: string;

    @Column({ type: "varchar", length: 100, nullable: false})
    public direccion: string;

    @Column({ type: "varchar", length: 30, nullable: false})
    public imagen: string;

    @Column({ type: "varchar", length: 20})
    public telefono: string;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: true })
    public fechaActualizacion: Date;
    
    @Column({ type: 'int', nullable: false })
    public codigoEstado: boolean;
    
    private constructor(
        nombre: string,
        descripcion: string,
        direccion: string,
        telefono: string,
        imagen: string
    ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.codigoEstado = true;
        this.imagen = imagen;
    }

    public async actualizar(
        nombre: string,
        descripcion: string,
        direccion: string,
        telefono: string
    ): Promise<void> {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.fechaActualizacion = new Date();

        const repositorioUsuarios = await Lugares.obtenerRepositorioLugares();

        try {
            await repositorioUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async inactivarLugar(Id: number): Promise<void> {
        const repositorioLugar = await Lugares.obtenerRepositorioLugares();
        const lugar = await repositorioLugar.findOneBy({ Id });
        if (!lugar) {
            throw new Error('ErrorLugarNoEncontrado');
        } else {
            if(lugar.codigoEstado == true) lugar.codigoEstado = false;
            else throw new Error('El lugar no se encuentra disponible')
            await repositorioLugar.save(lugar);
        }
    }

    public static async consultaLugares(): Promise<Lugares[]> {
        const repositorioLugar = await Lugares.obtenerRepositorioLugares();
        return repositorioLugar.findBy({codigoEstado: true});
    }

    public static async consultaLugarId(Id: number): Promise<Lugares> {
        const repositorioLugar = await Lugares.obtenerRepositorioLugares();

        const lugar = await repositorioLugar.findOneBy({ Id, codigoEstado: true});

        if (!lugar) {
            throw new Error('ErrorLugarNoEncontrado');
        }

        return lugar;
    }



    public static async nuevoLugar(
        nombre: string,
        descripcion: string,
        direccion: string,
        telefono: string, 
        imagen: string
    ): Promise<Lugares> {
        const repositorioLugar = await Lugares.obtenerRepositorioLugares();
        var lugar = new Lugares(
            nombre,
            descripcion,
            direccion,
            telefono,
            imagen
        );
        lugar.fechaCreacion = new Date;
        lugar.codigoEstado = true;

        try {
            await repositorioLugar.save(lugar);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return lugar;
    }

    private static async obtenerRepositorioLugares(): Promise<Repository<Lugares>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Lugares);
    }
}