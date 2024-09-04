import { Button, Form } from "react-bootstrap";
import './scss/reservacion.scss';
import { ChangeEvent, FormEvent, useState, useEffect} from 'react';
import RegistrarReservacionTask from "../tasks/RegistrarReservacionTask";
import { useNavigate } from 'react-router-dom';
import Lugar from "../models/Lugar";
import LugaresService from "../services/LugaresService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

export default function FormularioReservacion() {
    const [lugares, setLugares] = useState<Lugar[]>([]);

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [evento, setEvento] = useState('');
    const [numPersonas, setNumPersonas] = useState(0);
    const [fechaEvento, setFechaEvento] = useState('');
    const [horaEvento, setHoraEvento] = useState('');
    const [lugarId, setLugarId] = useState(1);
    const [mensaje, setMensaje] = useState('');

    const navigate = useNavigate();

    const[ isLoaded, setIsLoaded ] = useState(false);

    async function cargarLugares() {
        const servicioLugar = new LugaresService();
        const listaLugares = await servicioLugar.obtenerLugares();
        setLugares(listaLugares)
    }

    function handleFormControlChange(event: ChangeEvent<HTMLInputElement>) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'nombreCompleto':
                setNombreCompleto(valor);
                break;
            case 'correo': 
                setCorreo(valor);
                break;
            case 'marca':
                setCorreo(valor);
                break;
            case 'telefono':
                setTelefono(valor);
                break;
            case 'evento':
                setEvento(valor);
                break;
            case 'numPersonas':
                setNumPersonas(parseFloat(valor));
                break;
            case 'fechaEvento':
                setFechaEvento(valor);
                break;
            case 'horaEvento':
                setHoraEvento(valor);
                break;
            case 'mensaje':
                setMensaje(valor);
                break;
            case 'lugarId':
                setLugarId(parseInt(valor));
                break;
        }
    }

    function handleSelectControlChange(event: ChangeEvent<HTMLSelectElement>){
        const valor = event.target.value;
        setLugarId(parseInt(valor));
    }

    const notify = () =>{
        toast(
            'Registro Exitoso',
            { type: 'success'}
        );
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        try {

            const registrarReservacionTask = new RegistrarReservacionTask({
                nombreCompleto,
                telefono,
                numPersonas,
                horaEvento,
                mensaje,
                correo,
                evento,  
                fechaEvento,
                lugarId });
            await registrarReservacionTask.execute();
            notify()
            navigate('/index');
        } catch (e) {
            switch ((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert(
                        'Olvidaste llenar todos los campos del formulario'
                    );
                    break;
                case 'ErrorReservacionNoDisponible':
                    window.alert(
                        'Ya existe una reservacion'
                    );
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    useEffect(() => {
        if(!isLoaded)
        {
            cargarLugares();
        }
    });

    return (
        <>
            <div>
                <h1 className="titulo"><span>Haz tu Reservacion!</span></h1>
                <div className="contact-wrapper animated bounceInUp">
                    <div className="contact-form">
                        <h3>Reservaciones</h3>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtName">Nombre Completo: </Form.Label>
                                <Form.Control size="sm" type="text" name="nombreCompleto" id="txtName" value={nombreCompleto} onChange={handleFormControlChange} required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtEmail">Correo Electronico: </Form.Label>
                                <Form.Control size="sm" type="email" name="correo" id="txtEmail" value={correo} onChange={handleFormControlChange} required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtTelefono">Telefono: </Form.Label>
                                <Form.Control size="sm" type="phone" name="telefono" id="txtTelefono" value={telefono} onChange={handleFormControlChange} placeholder="000 000 00 00" required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtEvento">Evento: </Form.Label>
                                <Form.Control size="sm" type="text" name="evento" id="txtEvento" value={evento} onChange={handleFormControlChange} required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtNumPersonas">Numero de Personas Aprox. </Form.Label>
                                <Form.Control size="sm" type="number" name="numPersonas" id="txtNumPersonas"  value={numPersonas} onChange={handleFormControlChange} required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtFechaEvento">Fecha del evento: </Form.Label>
                                <Form.Control size="sm" type="date" name="fechaEvento" id="txtFechaEvento"  value={fechaEvento} onChange={handleFormControlChange} required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtHoraEvento">Hora de Inicio: </Form.Label>
                                <Form.Control size="sm" type="time" name="horaEvento" id="txtHoraEvento" value={horaEvento} onChange={handleFormControlChange} required/>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtLugar">Lugar</Form.Label>
                                <Form.Select name="lugarId" id="txtLugar" required onChange={handleSelectControlChange}>
                                    <option value='Sel. una opción' disabled>Sel. una opción</option>
                                    {
                                        lugares.map(lugar => (
                                            <option key={lugar.id} value={lugar.id}>{lugar.nombre}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="orilla">
                                <Form.Label htmlFor="txtMensaje">Mensaje</Form.Label>
                                <Form.Control size="sm" as="textarea" type="text" rows={3} name="mensaje" id="txtMensaje" value={mensaje} onChange={handleFormControlChange} />
                            </Form.Group>
                            <p>
                                <Button type="submit"><FontAwesomeIcon icon={faSquarePlus}/> Reservar</Button>
                            </p>
                        </Form>
                    </div>
                    <div className="contact-info">
                    <h4>Informacion de Contacto</h4>
                        <ul>
                            <li><i className="fas fa-phone"></i> (462)2179231<br />Alberto Jaramillo<br />(Gerente General)<br /></li>
                            <br />
                            <li><i className="fas fa-envelope-open-text"></i>reservaciones@xtas1s.com</li>
                        </ul>
                        <p>XT4S1S podrás encontrar algún lugar de tu agrado para celebrar cualquier tipo de evento o hasta pasar un buen rato entre amigos.</p>
                    </div>
                </div>
            </div>
        </>
    )
}