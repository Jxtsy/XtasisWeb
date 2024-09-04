import Lugar from "../models/Lugar";
import LugaresService from "../services/LugaresService";

export default class ActualizarLugarTask {
    private lugar: Lugar;

    public constructor(lugar: Lugar) {
        this.lugar = lugar;
    }

    public async execute(): Promise<void> {
        this.validar();
        await new LugaresService().actualizarLugar(this.lugar);
    }

    private validar(): void {
        const {  nombre, descripcion, direccion, telefono } = this.lugar;

        if ( !nombre|| !descripcion || !direccion || !telefono) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }
}