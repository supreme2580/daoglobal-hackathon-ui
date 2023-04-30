import { settingsLensVoting } from "./settings";
import { useContractRead } from "wagmi";

export const useMinDuration = () => {
  const {
    data,
    error,
    status: minDurationStatus,
  } = useContractRead({
    ...settingsLensVoting,
    functionName: "minDuration",
  });

  const minDuration = data ? Number(data) : undefined;

  return {
    minDuration,
    error,
    minDurationStatus,
  };
};
