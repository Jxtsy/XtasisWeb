export default class Reservacion{
    public id: number;
    public nombreCompleto: string;
    public correo: string;
    public telefono: string;
    public evento: string;
    public numPersonas: number;
    public fechaEvento: Date;
    public horaEvento: string;
    public lugarId: number;
    public lugarNombre: string;
    public mensaje: string;
    public fechaCreacion: Date;
    public fechaActualizacion: Date;

    public constructor(
        id: number | undefined,
        nombreCompleto: string,
        telefono: string,
        numPersonas: number,
        horaEvento: string,
        mensaje: string,
        correo: string,
        evento: string,
        fechaEvento: Date,
        lugarId: number,
        lugarNombre: string,
        fechaCreacion?: Date,
        fechaActualizacion?: Date
    ){
        this.id = id as number;
        this.nombreCompleto = nombreCompleto;
        this.telefono = telefono;
        this.numPersonas = numPersonas;
        this.horaEvento=horaEvento;
        this.mensaje= mensaje;
        this.correo = correo;
        this.evento = evento;
        this.fechaEvento = fechaEvento;
        this.lugarId = lugarId;
        this.lugarNombre = lugarNombre;
        this.fechaCreacion = fechaCreacion as Date;
        this.fechaActualizacion = fechaActualizacion as Date;
    }
}