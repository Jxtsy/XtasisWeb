import { Application, Router, Request, Response} from "express";
import HttpStatusCodes from 'http-status-codes';
import DatabaseConnection from "../database/DatabaseConnetion";
import Lugares from "../models/entities/Lugar";
import Reservacion from "../models/entities/Reservacion";

interface registrarReservacion {
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

export default class ReservacionController{

    private router: Router;

    private constructor(app: Application)
    {
        this.router = Router();
        this.initializeRouter();
        app.use('/reservacion', this.router);
    }

    protected initializeRouter(): void
    {
        this.router.post('/', this.nuevaReservacion);
        this.router.get('/', this.consultaReservacion);
        this.router.delete('/:id', this.inactivarReservacion);
    }
    //Complete
    public async consultaReservacion(req: Request, res: Response): Promise<void>
    {
        try
        {
            const repository = await DatabaseConnection.getRepository(Reservacion);
            const reservacion: Reservacion[] = await repository.findBy({ codigoEstado: true });

            res.status(HttpStatusCodes.OK).json(reservacion);
        }
        catch(e)
        {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    //Complete
    public async nuevaReservacion(req: Request, res: Response): Promise<void>
    {
        try
        {
            const{nombreCompleto, correo, telefono, evento, numPersonas, fechaEvento, horaEvento, lugarId, mensaje} = <registrarReservacion> req.body;

            if(!nombreCompleto || !correo || !telefono || !evento || !numPersonas 
                || !fechaEvento || !horaEvento || !lugarId)
            {
                res.status(HttpStatusCodes.BAD_REQUEST).json({message: "Faltan datos"});
                return;
            }

            const repository = await DatabaseConnection.getRepository(Reservacion);

            const lugar = await Lugares.consultaLugarId(lugarId);

            const reservacion = new Reservacion();
            reservacion.nombreCompleto = nombreCompleto;
            reservacion.correo = correo;
            reservacion.telefono = telefono;
            reservacion.evento = evento;
            reservacion.numPersonas = numPersonas;
            reservacion.fechaEvento = fechaEvento;
            reservacion.horaEvento = horaEvento;
            reservacion.lugar = lugar;
            reservacion.lugarNombre = lugar.nombre;
            reservacion.mensaje = mensaje;
            reservacion.fechaCreacion = new Date();
            reservacion.codigoEstado = true;
            
            await repository.save(reservacion);
            res.status(HttpStatusCodes.OK).json({message: "Registro Existoso"});
        }
        catch(e)
        {
            console.log(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(e);
        }
    }

    public async inactivarReservacion(req: Request, res: Response): Promise<void>
    {
        try {
            const Id = parseInt(req.params.id);

            const repository = await DatabaseConnection.getRepository(Reservacion);

            const reservacion = await repository.findOneBy({Id});

            if (!reservacion) {
                throw new Error('ErrorLugarNoEncontrado');
            } else {
                if(reservacion.codigoEstado == true) reservacion.codigoEstado = false;
                else throw new Error('El lugar no se encuentra disponible')
                await repository.save(reservacion);
            }
    
            res.status(HttpStatusCodes.OK).json({ message: "Reservacion eliminado"});
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount (app: Application): ReservacionController
    {
        return new ReservacionController(app);
    }
}

