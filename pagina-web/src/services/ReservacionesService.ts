import axios, { AxiosError } from "axios";
import Reservacion from "../models/Reservacion";

interface ReservacionBackend {
    nombreCompleto: string; 
    correo:string;
    telefono: string;
    evento:string;
    numPersonas: number;
    fechaEvento: string;
    horaEvento: string;
    lugarId: number;
    mensaje: string;
}

interface ReservacionBackendDto {
    Id: number;
    nombreCompleto: string; 
    correo:string;
    telefono: string;
    evento:string;
    numPersonas: number;
    fechaEvento: Date;
    horaEvento: string;
    lugarId: number;
    lugarNombre: string;
    mensaje: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}

export default class ReservacionesService {
    private baseUrl: string;
    private tokenSesion: string;

    public constructor(tokenSesion: string) {
        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/reservacion'
    }

    private get headers() {
        return {
            'tokenSession': this.tokenSesion
        };
    }

    //Registrar Reservaciones
    public async registrar(reservacion: ReservacionBackend): Promise<void> {
        try {
            const respuesta = await axios.post(
                `${this.baseUrl}/`,
                reservacion
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 400: // Bad Request
                        throw new Error('ErrorFormularioIncompleto');
                    case 401: // Unauthorized
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    default:
                        throw e;
                }
            }
            throw e;
        }
    }

    public async obtenerLista(): Promise<Reservacion[]> {
        try {
            const respuesta = await axios.get(
                this.baseUrl,
                { headers: this.headers }
            );
            const listaReservaciones = respuesta.data.map(
                (reservacion: ReservacionBackendDto) => (
                    new Reservacion(
                        reservacion.Id,
                        reservacion.nombreCompleto,
                        reservacion.telefono,
                        reservacion.numPersonas,
                        reservacion.horaEvento,
                        reservacion.mensaje,
                        reservacion.correo,
                        reservacion.evento,
                        new Date(reservacion.fechaEvento),
                        reservacion.lugarId,
                        reservacion.lugarNombre,
                        new Date(reservacion.fechaCreacion)
                    )

                )
            );
            return listaReservaciones;
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    //Actualizar Reservaciones
    public async actualizar(reservacion: Reservacion): Promise<void> {
        try {
            await axios.put(
                `${this.baseUrl}/${reservacion.id}`,
                reservacion,
                { headers: this.headers }
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 409: 
                        throw new Error('ErrorReservacionExistente')
                    default:
                        throw e;
                }
            }
            throw e;
        }
    }

    //Eliminar Reservaciones
    public async eliminarReservacion(id: number): Promise<void>{
        try {
            await axios.delete(
                `${this.baseUrl}/${id}`
            );

        } catch (e){
            throw e;
        }
    }
}