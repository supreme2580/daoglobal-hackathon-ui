import { BigNumber, BigNumberish, ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BN, opConfig } from "../op-helpers";

import { useOpCollateral } from "../read";
import { Action } from "types/op";

interface NewOpProposalParams {
  metadata: any;
  actions: Action[];
  allowFailureMap: BigNumberish;
  funds: BigNumberish;
}

export const useNewOpProposal = ({
  metadata,
  actions,
  allowFailureMap = BN(0),
  funds,
}: NewOpProposalParams) => {
  const { collateral } = useOpCollateral();

  const isEnabled = () => {
    return !!(metadata && actions && allowFailureMap && collateral);
  };

  const { config, status: prepareStatus } = usePrepareContractWrite({
    ...opConfig,
    functionName: "createProposal",
    args: ["0x00", actions, BN(allowFailureMap)],
    enabled: isEnabled(),
    overrides: {
      value: BN(funds), // BN("2000000000000000000"),
    },
  });

  const { data, status, write, error } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      console.log("Proposal created", tx);
    },
  });

  return { data, status, write, error, prepareStatus };
};
