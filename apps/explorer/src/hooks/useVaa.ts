import { useState, useEffect } from "react";
import { Buffer } from 'buffer';
import type { Vaa, GuardianSignature } from "../model";
import { useParams } from "react-router-dom";

export enum VaaRawFormat {
    HEX = "hex",
    BASE64 = "base64",
    UNKNOWN = "unknown",
}

export type SignedVaa = Uint8Array | Buffer;

function isBase64(str: string) {
    try {
        const buffer = Buffer.from(str, 'base64');
        return buffer.toString('base64') === str;
    } catch (_ignored) {
        return false;
    }
}

function isHex(vaa: string) {
  return /^(0[xX])?[A-Fa-f0-9]+$/.test(vaa)
}

function isPrefixedHex(vaa: string) {
  return isHex(vaa) && vaa.toLowerCase().startsWith("0x");
}

function toBuffer(vaa: string) {
  if (isPrefixedHex(vaa)) {
    return Buffer.from(vaa.slice(2), "hex");
  } else if (isHex(vaa)) {
    return Buffer.from(vaa, "hex");
  } else {
    return Buffer.from(vaa, "base64");
  }
}

function parseVaa(vaa: SignedVaa): Vaa {
  const signedVaa = Buffer.isBuffer(vaa) ? vaa : Buffer.from(vaa as Uint8Array);
  const sigStart = 6;
  const numSigners = signedVaa[5];
  const sigLength = 66;

  const guardianSignatures: GuardianSignature[] = [];
  for (let i = 0; i < numSigners; ++i) {
    const start = sigStart + i * sigLength;
    guardianSignatures.push({
      index: signedVaa[start],
      signature: signedVaa.subarray(start + 1, start + 66),
    });
  }

  const body = signedVaa.subarray(sigStart + sigLength * numSigners);

  return {
    version: signedVaa[0],
    guardianSetIndex: signedVaa.readUInt32BE(1),
    guardianSignatures,
    timestamp: body.readUInt32BE(0),
    nonce: body.readUInt32BE(4),
    emitterChain: body.readUInt16BE(8),
    emitterAddress: body.subarray(10, 42),
    sequence: body.readBigUInt64BE(42),
    consistencyLevel: body[50],
    payload: body.subarray(51),
  };
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
