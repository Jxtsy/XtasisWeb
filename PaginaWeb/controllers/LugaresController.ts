import { Application, Router, Request, Response} from "express";
import Lugar from '../models/entities/Lugar';
import HttpStatusCodes from 'http-status-codes';

interface RegistrarActualizarRequestBody {
    nombre: string;
    descripcion: string;
    direccion: string;
    telefono: string;
    imagen: string;
}
export default class LugaresController
{
    private router: Router;

    private constructor(app: Application)
    {
        this.router = Router();
        this.initializeRoutes();
        app.use('/lugares', this.router);
    }

    private initializeRoutes(): void {
        this.router.get('/', this.consultaLugares);
        this.router.get('/:id', this.consultaLugarId);
        this.router.post('/', this.nuevoLugar);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.eliminar);

    }

    private async consultaLugares(req: Request, res: Response): Promise<void>
    {
        try {
            const autos = await Lugar.consultaLugares();
    
            res.status(HttpStatusCodes.OK).json(autos);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async nuevoLugar(req: Request, res: Response): Promise<void>
    {
        try {
            const {
                nombre,
                descripcion,
                direccion,
                telefono,
                imagen
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !descripcion || !direccion || !telefono || !imagen) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            await Lugar.nuevoLugar(nombre,
                descripcion,
                direccion,
                telefono, 
                imagen);
    
            res.status(HttpStatusCodes.OK).json({message: "Registro Exitoso"});
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un lugar con los mismos datos.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }

    }

    private async consultaLugarId(req: Request, res: Response): Promise<void>
    {
        try {
            const id = parseInt(req.params.id);

            const lugar = await Lugar.consultaLugarId(id);

            res.status(HttpStatusCodes.OK).json(lugar);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorLugarNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }

    }

    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombre,
                descripcion,
                direccion,
                telefono
            } = <RegistrarActualizarRequestBody>req.body;

            if (!nombre || !descripcion || !direccion || !telefono) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const lugar = await Lugar.consultaLugarId(id);

            await lugar.actualizar(nombre,
                descripcion,
                direccion,
                telefono);
    
            res.status(HttpStatusCodes.OK).json(lugar);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un auto con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            await Lugar.inactivarLugar(id);
    
            res.status(HttpStatusCodes.OK).json({ message: "Lugar eliminado"});
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount (app: Application): LugaresController
    {
        return new LugaresController(app);
    }
}