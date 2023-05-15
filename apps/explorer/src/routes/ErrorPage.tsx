import { useRouteError } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Container, Grid } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <>
      <NavBar />
      <Grid container flexGrow={1} justifyContent="center">
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </Grid>
    </>
  );
}