import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../components/NavBar";

const SeachInput = styled(TextField)`
    width: 600px;
`;

const SearchButton = styled(Button)`
    min-width: 300px;
`

export function Root() {
    const [value, setValue] = useState<string | undefined>();
    const navigate = useNavigate();
    return (
        <>
            <NavBar />

            <Container maxWidth="sm">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Grid>
                        <SeachInput id="standard-basic" label="transaction" variant="standard" value={value} onChange={({ target: { value } }) => setValue(value)} />
                        <Grid
                            mt={2}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <SearchButton variant="outlined" onClick={() => value && navigate(value)}>Search</SearchButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}