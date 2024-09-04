import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from '../img/descarga.jpg';
import Corazon from '../img/corazon.png';
import Perfil from '../img/perfil.png';
import './scss/style.scss';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AppNavBar() {

    const [tokenSesion, settokenSesion] = useState(localStorage.getItem('tokenSession'));

    function cerrarSesion()
    {
        localStorage.removeItem('tokenSession');
        window.location.reload();
    }

    return (
        <>
            <Navbar variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="logo">
                        <img src={Logo}></img>
                        X T 4 S 1 S
                    </Navbar.Brand>
                    <Nav className="justify-content-center">
                        <Nav.Item>
                            <Nav.Link as={Link} to='/lugares' className="logoItem" >
                                Lugares
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to='/reservacion' className="logoItem">
                                Reservaciones
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="iconos">
                        <Nav.Item>
                            <Nav.Link className="nav-link" as={Link} to='/reservacion/listaReservaciones'>
                                <img src={Corazon}></img>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-link" as={Link} to='/auth'>
                                <img src={Perfil} />
                            </Nav.Link>
                        </Nav.Item>
                        {
                            tokenSesion ? (
                                <Nav.Item>
                                <Nav.Link className="logoItem" onClick={cerrarSesion}>Cerrar Sesion</Nav.Link>
                            </Nav.Item>  
                            ):(
                                <></>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}