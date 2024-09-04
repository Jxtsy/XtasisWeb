import AuthenticationService from "../services/AuthenticationService";
import jwt_decode from "jwt-decode";

interface LoginUsuario{
    usuario: string;
    password: string;
}

export default class LoginUsuarioTask{
    private _dtoLoginUsuario: LoginUsuario;

    public constructor(_dtoLoginUsuario: LoginUsuario)
    {
        this._dtoLoginUsuario = _dtoLoginUsuario;
    }

    public async execute(): Promise<void>{
        this.validarDatos();
        const tokenSesion = await this.loginUsuario();
        localStorage.setItem('tokenSession', tokenSesion);
    }

    private validarDatos(): void {
        const { usuario, password } = this._dtoLoginUsuario;
        console.log(usuario, password);
        if(!usuario || !password) throw new Error('ErrorFaltanDatos');
    }

    private async loginUsuario(): Promise<string>
    {
        const servicioAuthentication = new AuthenticationService();
        const { usuario, password} = this._dtoLoginUsuario;
        return servicioAuthentication.loginUsuario({usuario, password});
    }
}