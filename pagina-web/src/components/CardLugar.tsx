import { Button, Card, Col, Row } from "react-bootstrap";
import Lugar from "../models/Lugar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CardLugarProps{
    lugar: Lugar
}

export default function CardLugar( {lugar} : CardLugarProps) {
    const [tokenSesion, settokenSesion] = useState(localStorage.getItem('tokenSession'));

    const navigate = useNavigate();

    function navegarADetalleLugar() {
        navigate(`/lugares/${lugar.id}`);
    }

    return(
        <>
            <Col>
                <Card bg="dark" text="light" style={{ height: 'auto' }}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + lugar.imagen}/>
                    <Card.Body>
                        <Card.Title>{lugar.nombre}</Card.Title>
                        <Card.Text>{lugar.descripcion}</Card.Text>
                        <Button className="btnLugar" variant="primary" href="/reservacion">Reservar</Button>
                    </Card.Body>
                    {
                        tokenSesion ? (
                            <Card.Footer>
                            <Button className="" variant="primary" name="txtBtnModificar" onClick={navegarADetalleLugar}>Modificar</Button>
                        </Card.Footer>   
                        ):(
                            <></>
                        )
                    }
                </Card>
            </Col>
        </>
    )
}