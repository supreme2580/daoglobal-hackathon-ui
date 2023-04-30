import { ethers } from "ethers";

export const BN = (value: string | number | bigint): ethers.BigNumber => {
  return ethers.BigNumber.from(value);
};
