import AuthenticationServices from '../services/AuthenticationService';
interface DtoFormularioRegirstoUsuario {
    nombre: string,
    apellidoMaterno: string,
    apellidoPaterno: string,
    fechaN: string,
    correo: string,
    usuario: string,
    password: string,
    telefono: string,
    verifyPassword: string;
}

export default class RegistroUsuarioTask {
    private _dtoFormularioRegistroUsuario: DtoFormularioRegirstoUsuario;

    public constructor(_dtoFormularioRegistroUsuario : DtoFormularioRegirstoUsuario) {
        this._dtoFormularioRegistroUsuario = _dtoFormularioRegistroUsuario;
    }

    public async execute(): Promise<void> {
        //validar los datos del formulario
        this.validarDtoFormulario();
        //llamar el servicio para registrar el usuario
        const tokenSession = await this.registrarUsuario();
        console.log(tokenSession);
        //guardar el token en el almacenamiento local del navegador
        localStorage.setItem('tokenSession', tokenSession);
    }

    private validarDtoFormulario(): void {
        const { nombre, apellidoPaterno, apellidoMaterno, fechaN, correo, usuario, password, telefono, verifyPassword} = this._dtoFormularioRegistroUsuario;

        if(!nombre || !apellidoPaterno || !apellidoMaterno || !fechaN || !correo || !usuario || !password || !telefono || !verifyPassword) {
            throw new Error('ErrorFormularioIncompleto');
        }

        if(password !== verifyPassword)
        {
            throw new Error('ErrorPasswordNoCoinciden');
        }
    }

    private async registrarUsuario(): Promise<string> {
        const servicioAuthentication = new AuthenticationServices();
        const rolMaster = false;
        const { nombre, apellidoPaterno, apellidoMaterno, fechaN, correo, usuario, password, telefono} = this._dtoFormularioRegistroUsuario;
        const fechaNacimiento = new Date(fechaN);
        return servicioAuthentication.registroUsuario( {
            rolMaster, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, correo, usuario, password, telefono
        });
    }
}