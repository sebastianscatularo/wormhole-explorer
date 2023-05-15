import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { InspectoTabSelector, useCurrentView, View } from "../components/InspectorTabSelector";
import { VaaRawFormat, useVaa } from "../hooks/useVaa";
import { VaaRawView } from "../components/VaaRawView";
import { VaaPrettyView } from "../components/VaaPrettyView";
import { VaaJsonView } from "../components/VaaJsonView";

export default function Inpector() {
    const { vaa, hex, base64, json, format, setValue } = useVaa();
    const view = useCurrentView();
    return (
        <Grid paddingTop={1} spacing={2} container flexDirection='column'>
            <Grid item>
                <InspectoTabSelector current={view} />
            </Grid>
            <Grid item xs={12} flexDirection='row' width={1200}>
                {format !== VaaRawFormat.UNKNOWN
                    ? (
                        <>
                            {view === View.Hex && <VaaRawView value={hex} title={view} onChange={setValue} />}
                            {view === View.Base64 && <VaaRawView value={base64} title={view} onChange={setValue} />}
                            {view === View.JSON && <VaaJsonView value={json} title={view} />}
                            {view === View.Pretty && <VaaPrettyView value={vaa} title={view} />}
                        </>
                    ) : <Typography alignContent={"center"} variant="h6">Unable to parse Vaa - Could be and invalid VAA</Typography>
                }
            </Grid>
        </Grid>
    );
}