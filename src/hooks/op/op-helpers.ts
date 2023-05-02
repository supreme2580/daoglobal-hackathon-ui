import config from "../test-config";
import { Address } from "wagmi";
import OptimisticProposalsABI from "~/abi/OptimisticProposalsABI";
import { ethers } from "ethers";
import {
  ProposalDetails,
  DisputeStatus,
  Action,
  OPProposalStatus,
} from "~/types";

export const BN = ethers.BigNumber.from;
export const opConfig = {
  address: config.plugin as Address,
  abi: OptimisticProposalsABI,
};

export const parseProposalDetails = (data: any, proposalId: number) => {
  // console.log("data in parse", data, proposalId);
  // console.log("id in parse", proposalId);
  if (data) {
    const proposal: ProposalDetails = {
      proposalId,
      disputeStatus: data[0] as DisputeStatus,
      status: data[1] as OPProposalStatus,
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
      actions: data[12] as Action[],
    };
    return proposal;
  }
  return undefined;
};
