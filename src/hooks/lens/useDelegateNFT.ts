import { toast } from "react-toastify";
import { Address, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { settingsFollowNFT } from "./settings";

interface Transaction {
  hash: string;
}

export const useDelegateNFT = (to: Address | undefined) => {
  const addRecentTransaction = useAddRecentTransaction();

  const { config } = usePrepareContractWrite({
    ...settingsFollowNFT,
    functionName: "delegate",
    args: [to!],
    enabled: !!to,
  });

  const {
    data,
    write,
    status: submitStatus,
  } = useContractWrite({
    ...config,

    onSuccess: (tx: Transaction) => {
      toast("Delegating Tokens");
      addRecentTransaction({
        hash: tx.hash,
        description: "Delegate Tokens",
      });
    },
  });

  const { status: transactionStatus } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast.success("Follow NFT Minted");
    },
  });

  return {
    write,
    submitStatus,
    transactionStatus,
  };
};
