import { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import { Vaa } from "../model";
import { toBuffer, parseVaa, isHex } from "../sdk/parseVaa";
import { type } from "superstruct";
import { useParams } from "react-router-dom";

export enum VaaRawFormat {
    HEX = "hex",
    BASE64 = "base64",
    UNKNOWN = "unknown",
}

function isBase64(str: string) {
    try {
        const buffer = Buffer.from(str, 'base64');
        return buffer.toString('base64') === str;
    } catch (_ignored) {
        return false;
    }
}
 

export function useVaa() {
    const { vaa: vaaParam } = useParams();
    const [value, setValue] = useState<string>("");
    const [hex, setHex] = useState<string>("");
    const [base64, setBase64] = useState<string>("");
    const [json, setJson] = useState<string>("");
    const [vaa, setVaa] = useState<Vaa>();
    const [format, setFormat] = useState<VaaRawFormat>(VaaRawFormat.BASE64);
    useEffect(() => {
        console.log(vaaParam)
        if (vaaParam) {
            setValue(vaaParam);
        }
    }, [vaaParam])
    useEffect(() => {
        if (value) {
            if (isHex(value)) {
                setHex(value);
                setBase64(Buffer.from(value, "hex").toString("base64"));
                setFormat(VaaRawFormat.HEX);
            } else if (isBase64(value)) {
                setHex(Buffer.from(value, "base64").toString("hex"));
                setBase64(value);
                setFormat(VaaRawFormat.BASE64);
            }
            try {
                const buf = toBuffer(decodeURIComponent(value));
                const parsed = parseVaa(buf);
                setVaa(parsed);
                setJson(JSON.stringify({
                    version: parsed.version,
                    guardinaSetIndex: parsed.guardianSetIndex,
                    guardianSignatures: parsed.guardianSignatures.map(({ index, signature}) => ({
                        index, signature: signature.toString("hex")
                    })),
                    timestamp: parsed.timestamp,
                    nonce: parsed.nonce,
                    emitterChain: parsed.emitterChain,
                    emitterAddress: '0x' + parsed.emitterAddress.toString("hex").replace(/^0+/, ''),
                    sequence: parsed.sequence.toString(),
                    consistencyLevel: parsed.consistencyLevel,
                    /*
                    `  payloadType: ${transferTypeToString(tokenTransfer.payloadType)},`,
    `  amount: ${tokenTransfer.amount.toString()},`,
    `  tokenChain: ${idToStr(tokenTransfer.tokenChain)},`,
    `  tokenAddress: ${tokenTransfer.tokenAddress.toString("hex")},`,
    `  toChain: ${idToStr(tokenTransfer.toChain)},`,
    `  toAddress: ${tokenTransfer.to.toString("hex")},`,
    ...(tokenTransfer.payloadType === TokenBridgePayload.Transfer
      ? [`  fee: ${tokenTransfer.fee?.toString()},`]
      : tokenTransfer.payloadType === TokenBridgePayload.TransferWithPayload
      ? [
          `  fromAddress: ${tokenTransfer.fromAddress?.toString("hex")},`,
          `  tokenTransferPayload: ${tokenTransfer.tokenTransferPayload.toString(
            "hex"
          )}`,
        ]
      : [])
                    */
                }, null, 2));
            } catch (err) {
                console.log(err),
                setFormat(VaaRawFormat.UNKNOWN);
            }
        }
    }, [value]);
    return {
        vaa,
        hex,
        base64,
        json,
        format,
        setValue
    };
}
