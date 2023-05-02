import { Address, useContractRead } from "wagmi";
import { opConfig } from "../op-helpers";

export const useCanCreateOpProposal = (address?: Address) => {
  const {
    data: isMember,
    isSuccess,
    isError,
    isLoading,
    error,
    status,
  } = useContractRead({
    ...opConfig,
    functionName: "isMember",
    args: [address!],
    enabled: !!address,
  });

  return { isMember, isSuccess, isError, isLoading, error, status };
};
