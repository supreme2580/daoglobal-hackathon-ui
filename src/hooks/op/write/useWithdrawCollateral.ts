import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { BN, opConfig } from "../op-helpers";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";
import { BigNumberish } from "ethers";

export const useWithdrawCollateral = (amount: BigNumberish) => {
  const addRecentTransaction = useAddRecentTransaction();

  const { config, status: prepareStatus } = usePrepareContractWrite({
    ...opConfig,
    functionName: "withdrawCollateral",
    args: [BN(amount ?? 0)],
  });

  const { data, status, write, error } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      toast("Withdrawing Collateral");
      addRecentTransaction({
        hash: tx.hash,
        description: "Withdraw Collateral",
      });
    },
  });

  const { status: transactionStatus } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast("Collateral Withdrawn");
    },
  });

  return { data, status, write, error, prepareStatus, transactionStatus };
};
