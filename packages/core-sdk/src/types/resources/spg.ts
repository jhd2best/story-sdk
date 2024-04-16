import { Address, Hex } from "viem";

import { TxOptions } from "../options";

export type SPGCreateIpCollectionRequest = {
  collectionType: number;
  collectionSettings: {
    name: string;
    symbol: string;
    maxSupply: bigint;
    contractMetadata: Hex;
  };
  mintSettings: {
    start: bigint;
    end: bigint;
  };
  txOptions?: TxOptions;
};

export type SPGCreateIpCollectionResponse = {
  txHash?: string;
};

export type SPGMintAndRegisterIpWithSigRequest = {
  policyId: bigint;
  tokenContract: Address;
  tokenMetadata: Hex;
  ipMetadata: {
    name: string;
    hash: Hex;
    url: string;
    customMetadata: {
      key: string;
      value: string;
    }[];
  };
  signature: {
    signer: Address;
    deadline: bigint;
    signature: Hex;
  };
  txOptions?: TxOptions;
};

export type SPGMintAndRegisterIpWithSigResponse = {
  txHash?: string;
};
