import { GuardianSignature } from "./GuardianSignature";

export interface Vaa {
    version: number;
    guardianSetIndex: number;
    guardianSignatures: GuardianSignature[];
    timestamp: number;
    nonce: number;
    emitterChain: number;
    emitterAddress: Buffer;
    sequence: bigint;
    consistencyLevel: number;
    payload: Buffer;
  }