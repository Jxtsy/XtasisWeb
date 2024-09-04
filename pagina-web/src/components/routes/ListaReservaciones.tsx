import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './scss/ListaReservacion.scss';
import TablaReservaciones from '../TablaReservaciones';

export default function ListaReservacion() {
    const navigate = useNavigate();

    function navegarARegistroReservacion() {
        navigate('/reservacion');
    }

    return (
        <>
            <div className="lista-reservacion">
                <div className="encabezado">
                    <h3>Lista de Reservaciones</h3>
                    <Button variant="primary" onClick={navegarARegistroReservacion}>
                    <FontAwesomeIcon icon={faPlusCircle} />&nbsp;
                    </Button>
                </div>
                <TablaReservaciones/>
            </div>
        </>
    );
}