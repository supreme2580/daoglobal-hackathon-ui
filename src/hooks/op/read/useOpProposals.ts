import { paginatedIndexesConfig, useContractInfiniteReads } from "wagmi";

import { useOpProposalsCount } from "./useOpProposalsCount";
import { opConfig, BN, parseProposalDetails } from "../op-helpers";
import { ProposalDetails, UseProposalProps } from "types/op";
import { BigNumber } from "ethers";
import { decode } from "@lib/ipfs";
import { useState, useEffect } from "react";

type ProposalPages = Array<Array<ProposalDetails | undefined>>;

export const useOpProposals = ({ perPage = 2 }: UseProposalProps = {}) => {
  const { count } = useOpProposalsCount();
  const index = count ? count : 0;

  const { data, error, status, hasNextPage, fetchNextPage } = useContractInfiniteReads({
    cacheKey: "proposals",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            ...opConfig,
            functionName: "getProposal",
            args: [BigNumber.from(index)] as const,
          },
        ];
      },
      { start: index, perPage, direction: "decrement" }
    ),
    enabled: !!index,
  });

  const proposals = useDecodedMetadata(data, index, perPage);

  return {
    proposals,
    error,
    status,
    hasNextPage,
    fetchNextPage,
  };
};

export const useDecodedMetadata = (data: any, index: number, perPage: number) => {
  const [proposalsWithMetadata, setProposalsWithMetadata] = useState<ProposalPages>([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (data) {
        const pagesWithMetadata = await Promise.all(
          data.pages.map(async (page: any, pageIndex: number) => {
            return await Promise.all(
              page.map(async (proposal: any, proposalIndex: number) => {
                const proposalId = index - perPage * pageIndex - proposalIndex;
                const parsedProposal = parseProposalDetails(proposal, proposalId);
                return await decodeProposalMetadata(parsedProposal);
              })
            );
          })
        );
        setProposalsWithMetadata(pagesWithMetadata);
      }
    };

    fetchMetadata();
  }, [data]);

  return proposalsWithMetadata;
};

async function decodeProposalMetadata(proposal: ProposalDetails | undefined) {
  if (!proposal) {
    return undefined;
  }

  const json = await decode(proposal.metadata);
  return { ...proposal, metadata: json };
}
