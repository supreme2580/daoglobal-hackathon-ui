import { useContractRead } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";

import { opConfig, BN, parseProposalDetails } from "../op-helpers";
import { ProposalDetails } from "types/op";

export const useDisputedProposal = (id: number | bigint | BigNumber) => {
  let proposal: ProposalDetails | undefined;
  const { data, error, status } = useContractRead({
    ...opConfig,
    functionName: "disputedProposals",
    args: [BN(id)],
    enabled: !!id,
  });

  if (data) proposal = parseProposalDetails(data, Number(id));
  return { proposal, error, status };
};
