import { Address, useBlockNumber, useContractReads } from "wagmi";
import { BN } from "@lib/numbers";
import { settingsFollowNFT, settingsLensVoting } from "./settings";

export interface TokenAndPower {
  balance?: number;
  power?: number;
}

export const useCanCreateProposal = (account: Address | undefined) => {
  const { data: blockNumber } = useBlockNumber();
  let token: TokenAndPower = {};
  const { data, ...rest } = useContractReads({
    contracts: [
      { ...settingsLensVoting, functionName: "minProposerVotingPower" },
      {
        ...settingsFollowNFT,
        functionName: "getPowerByBlockNumber",
        args: [account!, BN(blockNumber ?? 0)],
      },
    ],
    enabled: !!(account && blockNumber),
  });

  const [balance, power] = data ?? [0, 0];

  if (data) {
    token = {
      balance: Number(balance),
      power: Number(power),
    };
  }
  return {
    token,
    ...rest,
  };
};
