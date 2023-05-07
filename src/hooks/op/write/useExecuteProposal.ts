import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BN, opConfig } from "../op-helpers";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

export const useExecuteProposal = (proposalId: number) => {
  const addRecentTransaction = useAddRecentTransaction();

  const { config, status: prepareStatus } = usePrepareContractWrite({
    ...opConfig,
    functionName: "executeProposal",
    args: [BN(proposalId)],
  });

  const { data, status, write, error } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      toast("Executing Proposal");
      addRecentTransaction({
        hash: tx.hash,
        description: "Execute Proposal",
      });
    },
  });

  const { status: transactionStatus } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast("Proposal Executed");
    },
  });

  return { data, status, write, error, prepareStatus, transactionStatus };
};
