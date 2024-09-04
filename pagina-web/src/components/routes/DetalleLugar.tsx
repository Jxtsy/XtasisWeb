import FormularioActualizarLugar from "../FormularioActualizarLugar";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Lugar from "../../models/Lugar";
import '../scss/RegistroLogin.scss';
import LugaresService from "../../services/LugaresService";
import { toast } from "react-toastify";
import CardsLugares from "../CardsLugares";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

export default function DetalleLugar() {
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
        toast(
            'No se encontro el lugar.',
            { type: 'warning' }
        );
        return(
            <>
                <CardsLugares/>
            </>
        )
    }

    return (
        <>
        <Container>
            <Row>
            <Button variant="primary" href="/lugares" className="inputLink"><FontAwesomeIcon icon={faArrowAltCircleLeft}/> Regresar</Button>
                <Col md={{ span: 10, offset: 1 }}>
                    <br></br>
                    <FormularioActualizarLugar lugar={lugar} />
                </Col>
            </Row>
        </Container>
        </>
    );
}