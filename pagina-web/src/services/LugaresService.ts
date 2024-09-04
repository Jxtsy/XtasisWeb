import axios, { AxiosError} from "axios";
import Lugar from "../models/Lugar";

interface LugarBackend{
    Id: number;
    nombre: string;
    descripcion: string;
    direccion: string;
    telefono: string;
    imagen: string
}

export default class LugaresService{
    private baseUrl: string;

    public constructor()
    {
        this.baseUrl = 'http://localhost:3001/lugares';
    }


    public async obtenerLugares(): Promise<Lugar[]> {
        try {
            const respuesta = await axios.get(this.baseUrl);
            const listLugar = respuesta.data.map((lugar: LugarBackend) => (
                new Lugar(
                    lugar.Id, lugar.nombre, lugar.descripcion, lugar.direccion, lugar.telefono, lugar.imagen)
            ));
            return listLugar;
        } catch (e) {
            if(e instanceof AxiosError && e.response) {
                switch(e.response.status) {
                    case 404: 
                        throw new Error('NoSeEncontraronLugares')
                    default:
                        throw e;
                }
            }
            throw e;
        }
    }

    public async registrarLugar(lugar: Lugar): Promise<void> {

        try {
            const respuesta = await axios.post(
                this.baseUrl,
                lugar
            );
            const {
                nombre,
                descripcion,
                direccion,
                telefono,
                imagen
            } =  respuesta.data as LugarBackend;

        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 400: // Bad Request
                        throw new Error('ErrorFormularioIncompleto');
                    case 401: // Unauthorized
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 409: // Conflict
                        throw new Error('ErrorLugarExistente');
                    default:
                        throw e;
                }
            }
            throw e;
        }
    }

    public async obtenerPorId(id: number): Promise<Lugar> {
        try {
            const respuesta = await axios.get(
                `${this.baseUrl}/${id}`
            );
    
            const {
                nombre,
                descripcion,
                direccion,
                telefono,
                imagen
            } = respuesta.data as LugarBackend;
    
            return new Lugar(
                id,
                nombre,
                descripcion,
                direccion,
                telefono,
                imagen,
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:
                        throw new Error('ErrorLugarNoEncontrado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async actualizarLugar(lugar: Lugar): Promise<void> {
        try {
            await axios.put(
                `${this.baseUrl}/${lugar.id}`,
                lugar
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

    //Eliminar Lugar
    public async eliminarLugar(id: number): Promise<void> {
        try {
            await axios.delete(
                `${this.baseUrl}/${id}`
            );
        } catch (e) {
            throw e;
        }
    }
}