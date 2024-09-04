import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AppNavBar from "../AppNavBar";
import FormularioReservacion from "../FormularioReservacion";

export default function Reservacion() {
    return(
        <>
            <Container fluid>
                <AppNavBar/>
                <Outlet/>
            </Container>
        </>
    )
}