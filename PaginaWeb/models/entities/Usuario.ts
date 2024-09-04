import {Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError} from "typeorm";
import DatabaseConnection from "../../database/DatabaseConnetion";

@Entity({ name: 'usuario' })
export default class Usuario
{
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true})
    public Id: number;

    @Column({ type: "bit"})
    public RolMaster: boolean;

    @Column({ type: "varchar", length: 50, nullable: false})
    public nombre: string;

    @Column({ type: "varchar", length: 32, nullable: false})
    public apellidoMaterno: string;

    @Column({ type: "varchar", length: 32, nullable: false})
    public apellidoPaterno: string;

    @Column({ type: "varchar", length: 32, nullable: false})
    public nombreCompleto: string;

    @Column({ type: "datetime", nullable: false})
    public fechaNacimiento: Date;

    @Column({ type: "varchar", length: 32})
    public correo: string;

    @Column({ type: 'varchar', nullable: false})
    public usuario: string;

    @Column({ type: "varchar", length: 32, nullable: false})
    public password: string;

    @Column({ type: "varchar", nullable: false})
    public telefono: string;

    @Column({ type: "datetime", nullable: false})
    public fechaCreacion: Date;

    @Column({type: 'datetime', nullable: true})
    public fechaActualizacion: Date;

    private constructor(
        rolMaster: boolean,
        nombre: string,
        apellidoMaterno: string,
        apellidoPaterno: string,
        fechaNacimiento: Date,
        correo: string,
        usuario: string,
        password: string,
        telefono: string,
    ){
        this.RolMaster = rolMaster,
        this.nombre = nombre,
        this.apellidoPaterno = apellidoPaterno,
        this.apellidoMaterno = apellidoMaterno,
        this.nombreCompleto = nombre +" "+ apellidoPaterno +" "+ apellidoPaterno,
        this.fechaNacimiento = fechaNacimiento,
        this.correo = correo,
        this.usuario = usuario,
        this.password = password,
        this.telefono = telefono,
        this.fechaCreacion = new Date()
    }

    public static async nuevoUsuario(
        rolMaster: boolean,
        nombre: string,
        apellidoMaterno: string,
        apellidoPaterno: string,
        fechaNacimiento: Date,
        correo: string,
        usuario: string,
        password: string,
        telefono: string,
    ): Promise<Usuario>{
        const repositorioUsuario = await Usuario.obtenerRepositorioUsuario();
        const newUsuario = new Usuario(
            rolMaster, nombre, apellidoMaterno, apellidoPaterno, fechaNacimiento, 
            correo, usuario, password, telefono
        );
        try
        {
            await repositorioUsuario.save(newUsuario);
        }
        catch(e)
        {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }
            throw e;
        }
        return newUsuario;
    }

    public static async validarUsuario(usuario: string, password: string): Promise<Usuario | null>{
        const repositorioUsuario = await Usuario.obtenerRepositorioUsuario();
        const login: Usuario | null = await repositorioUsuario.findOneBy({usuario, password});
        return login;
    }

    private static async obtenerRepositorioUsuario(): Promise<Repository<Usuario>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Usuario);
    }
}