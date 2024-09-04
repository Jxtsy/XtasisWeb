import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AppNavBar from "../AppNavBar";
import CardsLugares from "../CardsLugares";

export default function Lugares() {
    return(
        <>
            <Container fluid>
                <AppNavBar/>
                <Outlet/>
            </Container>
        </>
    )
}