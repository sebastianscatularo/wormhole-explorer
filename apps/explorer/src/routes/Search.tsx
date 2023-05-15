import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouteLoaderData, ActionFunctionArgs, redirect, useSearchParams } from "react-router-dom";
import { Form } from 'react-router-dom'
import axios from "axios";

const networks: Record<string, string> = {
    mainnet: 'https://api.wormscan.io',
    testnet: 'https://api.testnet.wormscan.io'
}

export async function searchAction({ request, params }: ActionFunctionArgs) {
    const { network = 'mainnet' } = params;
    const url = new URL(request.url);
    const tx = url.searchParams.get("tx");
    const { data: { data } } = await axios.get(`${networks[network]}/api/v1/vaas?txHash=${tx}`);
    const vaa = data[0].vaa;
    return redirect(`/${network}/inspector/${encodeURIComponent(vaa)}`);
  }

const SeachInput = styled(TextField)`
    width: 600px;
`;

const SearchButton = styled(Button)`
    min-width: 300px;
`

export default function Search() {
    const data = useRouteLoaderData('root');
    const [searchParams, setSearchParams] = useSearchParams();
    return <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        <Grid>
            <Form id="search-form" role="search" method="post">
                <SeachInput id="standard-basic" label="transaction" variant="standard" value={searchParams.get('tx')} onChange={({ target: { value } }) => setSearchParams({ tx: value })} />
                <Grid
                    mt={2}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <SearchButton type="submit" variant="outlined" >Search</SearchButton>
                </Grid>
            </Form>
        </Grid>
    </Grid>
}