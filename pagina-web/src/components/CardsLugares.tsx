import { useEffect, useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import Lugar from "../models/Lugar";
import LugaresService from "../services/LugaresService";
import CardLugar from "./CardLugar";
import './scss/CardsLugares.scss';

export default function CardsLugares() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [lugares, setLugares] = useState<Lugar[]>([]);

    async function LoadLugar() {
        try {
            const servicioLugar = new LugaresService();
            const listaLugares = await servicioLugar.obtenerLugares();
            setLugares(listaLugares);
            setIsLoaded(true);
        } catch (e) {
            switch((e as Error).message)
            {
                case 'NoSeEncontraronLugares':
                    window.alert('No hay lugares');
                    break;
                default:
                    window.alert('Algo salio mal');
                    break;
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            LoadLugar();
        }
    });

    if (!isLoaded) return <><Container><Alert variant="warning">No hay lugares disponibles!</Alert></Container></>

    return (
        <>
            <Container className="contenedor-cards">
                <Row xs={1} md={2} className="g-2">
                    {
                        lugares.map((lugar) => (
                            <CardLugar key={lugar.id} lugar={lugar}/>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}