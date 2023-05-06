import { useContractRead } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";

import { opConfig, BN, parseProposalDetails } from "../op-helpers";
import { ProposalDetails } from "types/op";
import { useOpProposal } from "./useOpProposal";

export const useDisputedProposal = (id: number | bigint | BigNumber) => {
  // let proposal: ProposalDetails | undefined;
  const { data, error, status } = useContractRead({
    ...opConfig,
    functionName: "disputedProposals",
    args: [BigNumber.from(id)],
    enabled: !!id,
  });

  const { proposal } = useOpProposal(data!);
  return { proposal, error, status };
};
