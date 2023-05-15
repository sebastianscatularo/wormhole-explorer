import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

export type EncodedInputProps = {
  value: string;
  onChange: (vaa: string) => void;
}

export function EncodedInput({ onChange, value }: EncodedInputProps) {
    const [network, setNetwork] = useState('mainnet');
    return (
        <Card sx={{ height: "100%" }}>
          <CardHeader title="Encoded" />
          <CardContent>
            <ToggleButtonGroup
              value={network}
              exclusive
              aria-label="Platform"
              sx={{ color: 'inherit' }}
            >
              <ToggleButton sx={{ color: 'inherit' }} disabled={network === 'mainnet'} value="mainnet">Pretty</ToggleButton>
              <ToggleButton sx={{ color: 'inherit' }} disabled={network === 'mainnet'} value="mainnet">Hex</ToggleButton>
              <ToggleButton sx={{ color: 'inherit' }} disabled={network === 'testnet'} value="testnet">Base64</ToggleButton>
              <ToggleButton sx={{ color: 'inherit' }} disabled={network === 'testnet'} value="testnet">Base64</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          <CardContent>
            <TextField
              multiline
              rows={20}
              placeholder={
                "Paste a VAA in base64 or hex (with or without prefix)"
              }
              fullWidth
              value={value}
              onChange={({ target: { value }}) => onChange(value)}
              sx={{ "& ::selection": { background: "rgba(255,255,0,0.2)" } }}
            />
          </CardContent>
        </Card>
    )
}