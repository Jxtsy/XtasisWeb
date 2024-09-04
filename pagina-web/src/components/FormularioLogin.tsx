import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginUsuarioTask from '../tasks/LoginUsuarioTask';
import './scss/RegistroLogin.scss';

export default function FormularioLogin() {

    const [ usuario, setUsuario] =  useState('');
    const [ password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleFormControlChange(event: ChangeEvent<HTMLInputElement>)
    {
        const valor = event.target.value;

        switch(event.target.name)
        {
            case 'txtUsuario':
                setUsuario(valor);
                break;
            case 'txtPassword':
                setPassword(valor);
                break;
        }
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const loginUsuarioTask = new LoginUsuarioTask({usuario, password});
            await loginUsuarioTask.execute();
            navigate('/');
        } catch (e) {
            switch(e)
            {
                case 'ErrorFaltanDatos':
                    toast(
                        'Olvidaste datos.',
                        { type: 'info' }
                    );
                    break;
                case 'ErrorUsuarioNoEncontrado':
                    toast(
                        'No te encuentras registrado',
                        { type: 'warning'}
                    );
                    break;
            }
        }
    }

    return(
        <>
            <Container>
                <div className='bodyContainer'>
                    <section className='login'>
                        <div className='formulario'>
                            <h2 className='title'>BIENVENIDO!</h2>
                            <p className='paragraph'>Inicia sesion para continuar!</p>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='Usuario' className='inputStyle' name='txtUsuario' value={usuario} onChange={handleFormControlChange} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type='password' placeholder='Contraseña' className='inputStyle' name='txtPassword' value={password} onChange={handleFormControlChange} required/>
                                </Form.Group>
                                <p>
                                    <Button type='submit' className='btnSubmit'>Iniciar Sesion</Button>
                                </p>
                            </Form>
                        </div>
                    </section>
                    <section className='registro'>
                        <div className='contact'>
                            <h2 className='title'>REGISTRATE</h2>
                            <p className='paragraph'>
                                Registrate y dsifruta de todas las ventajas de tener una cuenta:
                                Últimas noticias y ofertas exclusivas
                                Realizar reservaciones en los diferentes lugares
                                Guardar lugares en favoritos
                            </p>
                            <Button className='btnSubmit' href='/auth/'>Registrarme</Button>
                            <Button className='btnSubmit' href='/Reservacion'>Reservar lugar</Button>
                        </div>
                    </section>
                </div>
            </Container>
        </>
    )
}