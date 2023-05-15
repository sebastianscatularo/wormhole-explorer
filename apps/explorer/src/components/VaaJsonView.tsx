import AceEditor from "react-ace";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

export type VaaJsonViewProps = {
    value: string
    title: string
}
export function VaaJsonView({ value = "{}", title }: VaaJsonViewProps) {
    return (
        <Card sx={{ height: "100%" }}>
          <CardContent>
                <AceEditor
                    width="100%"
                    mode="json"
                    theme="github"
                    name="json-view"
                    defaultValue={value}
                    value={value}
                    readOnly={true}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{ useWorker: false }}
                />
          </CardContent>
        </Card>
    )
}