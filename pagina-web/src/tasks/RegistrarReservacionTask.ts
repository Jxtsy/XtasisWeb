import ReservacionesService from "../services/ReservacionesService";

interface DtoReservacionRegistrar{
    nombreCompleto: string,
    telefono: string,
    numPersonas: number,
    horaEvento: string,
    mensaje: string,
    correo: string,
    evento: string,
    fechaEvento: string,
    lugarId: number
}

export default class RegistrarReservacionTask {
    private reservacion: DtoReservacionRegistrar;

    public constructor(reservacion: DtoReservacionRegistrar) {
        this.reservacion = reservacion;
    }

    public async execute(): Promise<void> {
        this.validar();
        this.registrarReservacion();
    }

    private validar(): void {
        const { 
            nombreCompleto,
            telefono,
            numPersonas,
            horaEvento,
            correo,
            evento,
            fechaEvento,
            lugarId} = this.reservacion;
        if (!nombreCompleto|| !telefono || !numPersonas || !horaEvento || !correo|| !evento || !fechaEvento || !lugarId) {
            debugger;
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async registrarReservacion(): Promise<void> {
        const tokenSesion = localStorage.getItem('tokenSession');

        if (!tokenSesion) {
            throw new Error('ErrorSesionExpiradaOInvalida');
        }
        const { nombreCompleto,
            telefono,
            numPersonas,
            horaEvento,
            mensaje,
            correo,
            evento,
            fechaEvento,
            lugarId } = this.reservacion;
        const servicioReservacion = new ReservacionesService(tokenSesion);
        servicioReservacion.registrar({nombreCompleto, correo, telefono, evento, numPersonas, fechaEvento, horaEvento, lugarId, mensaje});
    }
}