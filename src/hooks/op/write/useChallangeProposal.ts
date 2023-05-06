import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BN, opConfig } from "../op-helpers";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

export const useChallengeProposal = (proposalId: number) => {
  const addRecentTransaction = useAddRecentTransaction();

  const { config, status: prepareStatus } = usePrepareContractWrite({
    ...opConfig,
    functionName: "challengeProposal",
    args: [BN(proposalId)],
    overrides: {
      value: BN(420),
    },
  });

  const { data, status, write, error } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      toast("Challenging Proposal");
      addRecentTransaction({
        hash: tx.hash,
        description: "Challenge Proposal",
      });
      console.log("Proposal Challenged", tx);
    },
  });

  const { status: transactionStatus } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast("Proposal Challenged");
    },
  });

  return { data, status, write, error, prepareStatus, transactionStatus };
};
