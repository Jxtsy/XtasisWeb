import { Outlet } from "react-router-dom";
import AppNavBar from "../AppNavBar";

export default function Home() {
    return(
        <>
            <AppNavBar/>
            <Outlet/>
        </>
    )
}