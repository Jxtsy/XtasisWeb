import FormularioActualizarLugar from '../components/FormularioActualizarLugar'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Lugar from '../models/Lugar';
import LugaresService from '../services/LugaresService';

export default function ActualizarReservacion() {
    const { idLugar } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [lugar, setLugar] = useState<Lugar | undefined>(undefined);

    async function loadLugar() {
        const id = parseInt(idLugar as string);

        if (isNaN(id)) {
            navigate('/lugares');
            return;
        }

        try {
            const servicioLugares = new LugaresService();
            const lugarEncontrado = await servicioLugares.obtenerPorId(id);
            setLugar(lugarEncontrado);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorLugarNoEncontrado') {
                // do nothing
            } else {
                window.alert('A ocurrido un error desconocido');
                navigate('/lugares');
                return;
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadLugar();
        }
    });


    if (!lugar) {
        return (
            <>
                <h3>Error 404: Lugar no encontrado.</h3>
            </>
        );
    }

    return (
        <>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Link to="/lugares">&lt; Regresar</Link>
                    <Card>
                        <Card.Body>
                            <FormularioActualizarLugar lugar={lugar} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}