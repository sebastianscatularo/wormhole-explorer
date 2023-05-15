import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import { LoaderFunctionArgs, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export function configurationLoader(args: LoaderFunctionArgs) {
    return {
        explorers: {}
    }
}

export default function Root() {
    return (
        <>
            <NavBar />
            <Divider />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}