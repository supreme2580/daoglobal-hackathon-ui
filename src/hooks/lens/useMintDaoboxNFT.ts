import { toast } from "react-toastify";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { DaoBoxProfileId } from "@constants/index";
import { settingsLensHub } from "./settings";

interface Transaction {
  hash: string;
}

export const useMintDaoboxNFT = () => {
  const addRecentTransaction = useAddRecentTransaction();
  const { config } = usePrepareContractWrite({
    ...settingsLensHub,
    functionName: "follow",
    args: [[DaoBoxProfileId], ["0x00"]],
  });

  const {
    data,
    write,
    status: sendingStatus,
  } = useContractWrite({
    ...config,
    onSuccess: (tx: Transaction) => {
      toast("Minting Follow NFT");
      addRecentTransaction({
        hash: tx.hash,
        description: "Minting Follow NFT",
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
    sendingStatus,
    transactionStatus,
  };
};
