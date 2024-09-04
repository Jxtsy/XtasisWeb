import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import AppNavBar from "../AppNavBar";

export default function Usuario() {

    return(
        <>
            <Container fluid>
                <AppNavBar/>
                <Outlet/>
            </Container>
        </>
    )
}