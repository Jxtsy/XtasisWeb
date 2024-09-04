import { Form, Button, Col, Row} from 'react-bootstrap';
import './scss/RegistroUsuario.scss';
import facebook from '../img/facebook.svg';
import apple from '../img/apple.svg';
import google from '../img/google-icon.svg';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegistroUsuarioTask from '../tasks/RegistrarUsuarioTask';
import { toast } from 'react-toastify';

export default function FormularioRegistro() {

    const [ nombre, setNombre] = useState('');
    const [ apellidoMaterno, setApellidoMaterno] = useState('');
    const [ apellidoPaterno, setApellidoPaterno] = useState('');
    const [ fechaN, setFechaNacimiento] = useState('');
    const [ correo, setCorreo] = useState('');
    const [ usuario, setUsuario] = useState('');
    const [ telefono, setTelefono] = useState('');
    const [ password, setPassword] = useState('');
    const [ verifyPassword, setVerifyPass] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    function handleFormControlChange(event: ChangeEvent<HTMLInputElement>)
    {
        const valor = event.target.value;

        switch(event.target.name)
        {
            case 'txtName':
                setNombre(valor);
                break;
            case 'txtApellidoP':
                setApellidoPaterno(valor);
                break;
            case 'txtApellidoM':
                setApellidoMaterno(valor);
                break;
            case 'txtFechaNacimiento':
                setFechaNacimiento(valor);
                break;
            case 'txtCorreo':
                setCorreo(valor);
                break;
            case 'txtUsuario':
                setUsuario(valor);
                break;
            case 'txtPassword':
                setPassword(valor);
                break;
            case 'txtVerifyPassword':
                setVerifyPass(valor);
                break;
            case 'txtPhone':
                setTelefono(valor);
                break;
        }
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        
        try {
            const registrarUsuarioTask = new RegistroUsuarioTask({
                nombre, apellidoPaterno, apellidoMaterno, fechaN, correo, usuario, password, telefono, verifyPassword
            });
            await registrarUsuarioTask.execute();
            navigate('/auth/login');
        } catch (e) {
            switch((e as Error).message)
            {
                case 'ErrorFormularioIncompleto':
                    toast(
                        'Olvidaste completar todos los campos del formulario.',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorNombreUsuarioDuplicado':
                    toast(
                        'Ya existe un usuario con el mismo correo.',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorPasswordNoCoinciden':
                    toast(
                        'Contraseña no coincide',
                        { type: 'warning' }
                    );
                    break;
                default:
                    toast(
                        'Algo salio mal.',
                        { type: 'error' }
                    );
                    break;
            }
        }
    }

    function LoadPage(){
        const tokenSesion = localStorage.getItem('tokenSession');
        if(tokenSesion)
        {
            setIsLoaded(true);
            navigate('/reservacion');
        }
    }

    useEffect(() => {
        if(!isLoaded)
        {
            LoadPage()
        }
    })

    return(
        <>
            <section className="main1">
                <div className="formulario">
                    <h2 className="main__title1">Hola de Nuevo!</h2>
                    <p className="main__paragraph1">Vamos a crear tu cuenta!</p>
                    <Form className='formContent' onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Nombre' name='txtName' className='main__input1' value={nombre}  onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Apellido Paterno' name='txtApellidoP' className='main__input1' value={apellidoPaterno} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Apellido Materno' name='txtApellidoM' className='main__input1' value={apellidoMaterno} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='date' placeholder='Fecha de nacimiento' name='txtFechaNacimiento' className='main__input1' value={fechaN} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='email' placeholder='Correo electronico' name='txtCorreo' className='main__input1' value={correo} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Usuario' name='txtUsuario' className='main__input1' value={usuario} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='password' placeholder='Contraseña' name='txtPassword' className='main__input1' value={password} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='password' placeholder='Confirmar contraseña' name='txtVerifyPassword' className='main__input1' value={verifyPassword} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='number' placeholder='Telefono' name='txtPhone' className='main__input1' value={telefono} onChange={handleFormControlChange} required/>
                        </Form.Group>
                        <p>
                            <Button type='submit' className='main__input main_input--send'>Registrarme</Button>
                        </p>
                    </Form>
                    <p className='main__paragraph1'>Inicia sesion <Link to = "/auth/login" className='linkRedireccion'>Haz click aqui!</Link></p>
                    <p className='main__paragraph1'>O continuar con</p>
                    <Row>
                      <Col><Button className='linkRedes' href='https://accounts.google.com/v3/signin/identifier?dsh=S184773115%3A1670218008883177&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=ARgdvAu3ZaiicuSx5KlmQbKb7B_tSK43VylwaYGGckGsTAQ7Pye4B8me1cMxvcH5XSWDUhAcS8rt5w'><img src={google} className="sizeImage"></img></Button></Col>
                      <Col><Button className='linkRedes' href='https://es-la.facebook.com/'><img src={facebook} className="sizeImage"></img></Button></Col>
                      <Col><Button className='linkRedes' href='https://www.icloud.com/'><img src={apple} className="sizeImage"></img></Button></Col>
                    </Row>
                </div>
            </section>
        </>
    )
}