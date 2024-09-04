import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import Reservacion from '../models/Reservacion';
import RenglonTablaReservaciones from './RenglonTablaReservaciones';
import ReservacionesService from '../services/ReservacionesService';
import Loader from './Loader';

export default function TablaReservaciones() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [reservaciones, setReservaciones] = useState<Reservacion[]>([]);
    const navigate = useNavigate();

    async function cargarReservaciones() {
        try {
            const tokenSesion = localStorage.getItem('tokenSession');

            if(tokenSesion)
            {
                const servicioReservaciones = new ReservacionesService(tokenSesion);
                const listaRservaciones = await servicioReservaciones.obtenerLista();
                setReservaciones(listaRservaciones);
                setIsLoaded(true);
            } else {
                navigate('/auth/login');
            }
            
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/auth/login');
                return;
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarReservaciones();
        }
    });

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                <br></br>
                <Table bordered className='tablaR'>
                    <thead>
                        <tr className='Title'>
                            <th>Reservacion</th>
                            <th>Telefono</th>
                            <th>No.Personas</th>
                            <th>Hora del evento</th>
                            <th>Mensaje</th>
                            <th>Correo Electronico</th>
                            <th>Tipo de evento</th>
                            <th>Fecha del Evento</th>
                            <th>Lugar Seleccionado</th>
                            <th>Fecha de Reservación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservaciones.map(reservacion => (
                                <RenglonTablaReservaciones
                                    key={reservacion.id}
                                    reservacion={reservacion}
                                />
                            ))
                        }
                    </tbody>
                </Table>
                </Col>
            </Row>
        </>
    );
}
