import Reservacion from '../models/Reservacion';
import './scss/RenglonTablaReservaciones.scss';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import ReservacionesService from '../services/ReservacionesService';
import { useState } from 'react';

interface RenglonTablaReservacionProps {
    reservacion: Reservacion
}

export default function RenglonTablaReservaciones({ reservacion }: RenglonTablaReservacionProps) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () =>  setShow(false);
    const handleShow = () => setShow(true);

    const tokenSesion = localStorage.getItem('tokenSession');
    async function eliminarReservacion() {
        const id = reservacion.id;
        try {
            if(tokenSesion){
                const servicioLugares = new ReservacionesService(tokenSesion);
                await servicioLugares.eliminarReservacion(id);
            }
            window.location.reload();
            navigate('/reservacion/listaReservaciones');
        } catch (e) {
            switch((e as Error).message)
            {
                case 'ErrorReservacionNoEncontrado':
                    window.alert('Ya no existe la reservacion');
                    break;
                default: 
                    window.alert('Algo paso..');
                    break;
            }
        }
    }
    return (
        <>
            <tr>
                <td>{reservacion.nombreCompleto}</td>
                <td>{reservacion.telefono}</td>
                <td>{reservacion.numPersonas}</td>
                <td>{reservacion.horaEvento}</td>
                <td>{reservacion.mensaje}</td>
                <td>{reservacion.correo}</td>
                <td>{reservacion.evento}</td>
                <td>{reservacion.fechaEvento.toDateString()}</td>
                <td>{reservacion.lugarNombre}</td>
                <td>{reservacion.fechaCreacion.toDateString()}</td>
                <td><Button className='btnStyle' onClick={handleShow}><FontAwesomeIcon icon={faTrashAlt}/></Button></td>
            </tr>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar reservacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Desea eliminar la reservacion?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" name="txtAceptar" onClick={eliminarReservacion}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
