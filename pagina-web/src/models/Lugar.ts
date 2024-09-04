export default class Lugar{
    public id: number;
    public nombre: string;
    public descripcion: string;
    public direccion: string;
    public telefono: string;
    public imagen: string;

    public constructor(
        id: number | undefined,
        nombre: string,
        descripcion: string,
        direccion: string,
        telefono: string,
        imagen: string
    ){
        this.id = id as number;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.imagen = imagen;
    }
}