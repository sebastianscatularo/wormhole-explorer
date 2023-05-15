import { is } from "superstruct";
import type { Vaa, GuardianSignature } from "../model";
import { Buffer } from "buffer";

export type SignedVaa = Uint8Array | Buffer;

/*
 const isHex = /^(0[xX])?[A-Fa-f0-9]+$/.test(vaaString);
      const hasPrefix = isHex && vaaString.toLowerCase().startsWith("0x");
      const buf = Buffer.from(
        hasPrefix ? vaaString.slice(2) : vaaString,
        isHex ? "hex" : "base64"
      );
      const vaa = parseVaa(buf);
*/

export function isHex(vaa: string) {
  return /^(0[xX])?[A-Fa-f0-9]+$/.test(vaa)
}

export function isPrefixedHex(vaa: string) {
  return isHex(vaa) && vaa.toLowerCase().startsWith("0x");
}

export function toBuffer(vaa: string) {
  if (isPrefixedHex(vaa)) {
    return Buffer.from(vaa.slice(2), "hex");
  } else if (isHex(vaa)) {
    return Buffer.from(vaa, "hex");
  } else {
    return Buffer.from(vaa, "base64");
  }
}

export function parseVaa(vaa: SignedVaa): Vaa {
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