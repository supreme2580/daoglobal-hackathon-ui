import { ethers } from "ethers";

import OptimisticProposalsABI from "abi/OptimisticProposalsABI";

import { ProposalDetails, DisputeStatus, OPProposalStatus, Action } from "types/op";
import { opVotingAddress } from "@constants/daoConfig";

export const BN = ethers.BigNumber.from;

export const opConfig = {
  address: opVotingAddress,
  abi: OptimisticProposalsABI,
};

export const parseProposalDetails = (data: any, proposalId: number) => {
  if (data) {
    const proposal: ProposalDetails = {
      proposalId,
      disputeStatus: data[0],
      status: data[1],
      executionFromTime: data[2],
      pausedAtTime: data[3],
      disputeId: data[4],
      proposer: data[5],
      proposerCollateral: data[6],
      proposerPaidFees: data[7],
      challenger: data[8],
      challengerPaidFees: data[9],
      allowFailureMap: data[10],
      metadata: data[11],
      actions: data[12],
    };
    return proposal;
  }
  return undefined;
};
