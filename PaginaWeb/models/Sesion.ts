import jwt from 'jsonwebtoken';
import Usuario from "./entities/Usuario";
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from 'http-status-codes';

export default class Sesion{
    public tokenSesion: string;
    private static readonly secret = 'Les mamites hot';

    private constructor(tokenSesion: string){
        this.tokenSesion = tokenSesion;
    }

    public static crearParaUsuario(usuario: Usuario):Sesion{
        const data={
            Id: usuario.Id,
            RolMaster: usuario.RolMaster,
            nombre: usuario.nombre,
            apellidoPaterno: usuario.apellidoPaterno,
            apellidoMaterno: usuario.apellidoMaterno,
            fechaNacimiento:usuario.fechaNacimiento,
            correo: usuario.correo,
            password: usuario.password,
            telefono: usuario.telefono,
            fechaCreacion: usuario.fechaCreacion,
            fechaActualizacion: usuario.fechaActualizacion

        }
    
        const tokenSesion = jwt.sign({data}, Sesion.secret, {expiresIn: '1d'});
    
        return new Sesion(tokenSesion);
    }

    public static verificarTokenSesion(
        req:Request,
        res:Response,
        next: NextFunction
    ): void{
        try {
            const tokenSesion = <string>req.headers['Token-Sesion'.toLowerCase()];//extraer el header token-sesion de la peticion
            if(!tokenSesion){
                res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    mensaje: "No se envio token de sesion;"
                })
                return;
            }
            jwt.verify(tokenSesion, Sesion.secret); //verificar si el token se envio
            next();  //verificar que el token sea valido
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCodes.UNAUTHORIZED).json({
                mensaje: 'Token de sesión invalido o expirado'
            });
            //responder con 401
        }
    }

    
}