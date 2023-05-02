import { paginatedIndexesConfig, useContractInfiniteReads } from "wagmi";

import { useOpProposalsCount } from "./useOpProposalsCount";
import { opConfig, BN, parseProposalDetails } from "../op-helpers";
import { ProposalDetails, UseProposalProps } from "types/op";

type ProposalPages = Array<Array<ProposalDetails | undefined>>;

export const useOpProposals = ({ perPage = 2 }: UseProposalProps = {}) => {
  const { count } = useOpProposalsCount();
  const index = count ? count : 0;

  let proposals: ProposalPages = [];

  const { data, error, status, hasNextPage, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "proposals",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            ...opConfig,
            functionName: "getProposal",
            args: [BN(index)] as const,
          },
        ];
      },
      { start: index, perPage, direction: "decrement" }
    ),
    enabled: !!index,
  });

  if (data) {
    // console.log("data", data);
    proposals = data.pages.map((page, pageIndex) => {
      return page.map((proposal, proposalIndex) => {
        const proposalId = index - perPage * pageIndex - proposalIndex;
        // console.log("proposalId", proposalId);
        return parseProposalDetails(proposal, proposalId);
      });
    });
    // console.log("proposals", proposals);
  }
  return {
    proposals,
    error,
    status,
    hasNextPage,
    fetchNextPage,
  };
};
