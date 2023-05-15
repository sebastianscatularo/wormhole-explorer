import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { GuardianSignature, Vaa } from "../model";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type GuardianSignatureProps = {
  signatures: GuardianSignature[]
}

function GuardianSignatureRow({ signatures }: GuardianSignatureProps) {
  const [open, setOpen] = useState(false);
  return (
    <TableRow>
      <TableCell scope="row" sx={{ verticalAlign: 'top', minWidth: '200px' }} >
        <Box>
          Guardian Signatures
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
      </TableCell>
      <TableCell scope="row">
        {!open && <>{signatures.length}</>}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Table size="small" aria-label="purchases">
            <TableBody>
              {signatures.map(({ index, signature }) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ textOverflow: 'ellipsis' }}>
                    {signature.toString('hex')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export type VaaPrettyViewProps = {
  value?: Vaa;
  title: string
}

export function VaaPrettyView({ value }: VaaPrettyViewProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <TableContainer component={CardContent}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell scope="row">Version</TableCell>
              <TableCell scope="row">{value?.version}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Guardian Set Index</TableCell>
              <TableCell scope="row">{value?.guardianSetIndex}</TableCell>
            </TableRow>
            <GuardianSignatureRow signatures={value?.guardianSignatures || []} />
            <TableRow>
              <TableCell scope="row">Emitter Chain</TableCell>
              <TableCell scope="row">{value?.emitterChain}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Emitter Address</TableCell>
              <TableCell scope="row">{value?.emitterAddress.toString('hex')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">Consistency Level</TableCell>
              <TableCell scope="row">{value?.consistencyLevel}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}