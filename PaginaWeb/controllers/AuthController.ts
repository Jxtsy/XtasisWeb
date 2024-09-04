import { Application, Request, Response, Router } from 'express';
import Usuario from '../models/entities/Usuario';
import Sesion from '../models/Sesion';
import DatabaseConnection from '../database/DatabaseConnetion';
import HttpStatusCodes from 'http-status-codes';

interface RegistroRequestBody{
    rolMaster: boolean,
    nombre: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    fechaNacimiento: Date,
    correo: string,
    usuario: string,
    password: string,
    telefono: string,
}

interface LoginRequestBody
{
    usuario: string;
    password: string;
}

export default class AuthController{
    private router: Router;

    private constructor(app: Application){
        this.router = Router();
        this.initializeRoutes();
        app.use('/auth', this.router);
    }

    private initializeRoutes(): void {
        this.router.post('/registro', this.registro);
        this.router.post('/login', this.login);
    }

    private async registro(req: Request, res: Response): Promise<void>
    {
        try {
            const {rolMaster, nombre, apellidoPaterno, apellidoMaterno,
                fechaNacimiento, correo, usuario, password, telefono} = <RegistroRequestBody> req.body;

            if(!nombre || !apellidoPaterno || !apellidoMaterno|| !fechaNacimiento
                || !correo || !usuario || !password || !telefono){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
        await DatabaseConnection.getRepository(Usuario);
        const nuevoUsuario = await Usuario.nuevoUsuario( rolMaster, nombre, apellidoMaterno, apellidoPaterno, fechaNacimiento
            , correo, usuario, password, telefono);

        const sesion = await Sesion.crearParaUsuario(nuevoUsuario);

        res.status(200).json(sesion);
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    }

    private async login(req: Request, res: Response): Promise<void>
    {
        try {
            const{usuario, password} = <LoginRequestBody> req.body;
            if(!usuario || !password){
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
        const repositorioUsuario = await DatabaseConnection.getRepository(Usuario);
        

        const user =  await repositorioUsuario.findOneBy({
         usuario: usuario,
         password: password   
        });

        

        if(!user){
            res.status(401).end();
        } 
        else{
            const sesion = Sesion.crearParaUsuario(user);
            res.status(200).json(sesion);
        }
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    }

    public static mount(app: Application): AuthController
    {
        return new AuthController(app);
    }
}