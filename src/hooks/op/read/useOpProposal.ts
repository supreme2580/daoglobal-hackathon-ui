import { useContractRead } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";

import { opConfig, BN, parseProposalDetails } from "../op-helpers";
import { ProposalDetails } from "types";
import { decode } from "@lib/ipfs";

export const useOpProposal = (id: number | bigint | BigNumber) => {
  const [decodedProposal, setDecodedProposal] = useState<ProposalDetails | undefined>();
  const { data, isSuccess, isError, isLoading, error, status } = useContractRead({
    ...opConfig,
    functionName: "getProposal",
    args: [BigNumber.from(id)],
    enabled: !!id,
  });

  useEffect(() => {
    const decodeMetadata = async (proposal: ProposalDetails | undefined) => {
      if (proposal) {
        const decoded = await decodeProposalMetadata(proposal);
        setDecodedProposal(decoded);
      } else {
        setDecodedProposal(undefined);
      }
    };

    if (data) {
      const proposal = parseProposalDetails(data, Number(id));
      decodeMetadata(proposal);
    }
  }, [data, id]);

  return { proposal: decodedProposal, isSuccess, isError, isLoading, error, status };
};

async function decodeProposalMetadata(proposal: ProposalDetails) {
  const json = await decode(proposal.metadata);
  return { ...proposal, metadata: json };
}
