import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { Vaa } from "../model/Vaa";
import { useEffect, useState } from "react";

export type VaaRawViewProps = {
    title: string;
    value?: string;
    onChange?: (vaa: string) => void;
}

export function VaaRawView({ onChange = () => {}, value, title }: VaaRawViewProps) {
    const [internalValue, setInternalValue] = useState<string | undefined>();
    useEffect(() => {
        setInternalValue(value);
    }, [value])
    useEffect(() => {
        onChange(internalValue || '');
    }, [internalValue])
    return (
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <TextField
              multiline
              rows={20}
              placeholder={
                "Paste a VAA in base64 or hex (with or without prefix)"
              }
              fullWidth
              value={internalValue}
              onChange={({ target: { value }}) => setInternalValue(value)}
              sx={{ "& ::selection": { background: "rgba(255,255,0,0.2)" } }}
            />
          </CardContent>
        </Card>
    )
}