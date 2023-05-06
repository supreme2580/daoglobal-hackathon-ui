import { BigNumber, BigNumberish, BytesLike, ethers } from "ethers";
import { Address, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BN, opConfig } from "../op-helpers";

import { useOpCollateral } from "../read";
import { Action } from "types/op";
import { uploadToIPFS } from "@lib/ipfs";
import { useState } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

interface NewOpProposalParams {
  metadata: OpMetadata;
  actions: Action[];
  allowFailureMap?: BigNumberish;
  funds?: BigNumberish;
}

interface OpMetadata {
  title: string;
  description: string;
  summary?: string;
}

export const useNewOpProposal = ({
  metadata,
  actions,
  allowFailureMap = BN(0),
  funds = BN("1000000000000000000"),
}: NewOpProposalParams) => {
  const addRecentTransaction = useAddRecentTransaction();

  const { collateral } = useOpCollateral();
  const [utfMetadata, setUtfMetadata] = useState<any>(null);

  const isEnabled = () => {
    return !!(utfMetadata && actions && allowFailureMap && collateral);
  };

  const { config, status: prepareStatus } = usePrepareContractWrite({
    ...opConfig,
    functionName: "createProposal",
    args: [utfMetadata, actions, BN(allowFailureMap)],
    enabled: isEnabled(),
    overrides: {
      value: BN(funds), // BN("2000000000000000000"),
    },
  });

  const { data, status, write, error } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      toast("Creating Proposal");
      addRecentTransaction({
        hash: tx.hash,
        description: "Create Proposal",
      });
      console.log("Proposal created", tx);
    },
  });

  const { status: transactionStatus } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast("Proposal Created");
    },
  });

  const writeWithMetadata = async () => {
    try {
      if (metadata) {
        const cid = await uploadToIPFS(JSON.stringify(metadata, null, 2));
        const toUintArray = ethers.utils.toUtf8Bytes(cid);
        const toHex = ethers.utils.hexlify(toUintArray);
        setUtfMetadata(toHex);
      }

      write?.();
    } catch (error) {
      console.error("Error pinning metadata:", error);
    }
  };

  return { data, status, write: writeWithMetadata, error, prepareStatus, transactionStatus };
};
