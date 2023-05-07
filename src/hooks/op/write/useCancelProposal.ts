import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BN, opConfig } from "../op-helpers";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

export const useCancelProposal = (proposalId: number) => {
  const addRecentTransaction = useAddRecentTransaction();

  const { config, status: prepareStatus } = usePrepareContractWrite({
    ...opConfig,
    functionName: "cancelProposal",
    args: [BN(proposalId)],
  });

  const { data, status, write, error } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      toast("Canceling Proposal");
      addRecentTransaction({
        hash: tx.hash,
        description: "Cancel Proposal",
      });
    },
  });

  const { status: transactionStatus } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast("Proposal Cancelled");
    },
  });

  return { data, status, write, error, prepareStatus, transactionStatus };
};
