import { useContractRead } from "wagmi";
import { BigNumber } from "@ethersproject/bignumber";

import { opConfig, BN, parseProposalDetails } from "../op-helpers";
import { ProposalDetails } from "types";

export const useOpProposal = (id: number | bigint | BigNumber) => {
  let proposal: ProposalDetails | undefined;
  const { data, isSuccess, isError, isLoading, error, status } = useContractRead({
    ...opConfig,
    functionName: "getProposal",
    args: [BigNumber.from(id)],
    enabled: !!id,
  });

  if (data) proposal = parseProposalDetails(data, Number(id));
  console.log("proposal", proposal);
  return { proposal, isSuccess, isError, isLoading, error, status };
};
