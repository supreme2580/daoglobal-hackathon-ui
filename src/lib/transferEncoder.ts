import { type Address, erc20ABI } from "wagmi";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { type DaoAction } from "@daobox/use-aragon";
import { Action } from "types";

export interface TransferEncoderProps {
  to: string;
  amount: number | string | BigNumber;
  token: string;
}

export const transferEncoder = (data: TransferEncoderProps[]) => {
  const iface = new ethers.utils.Interface(erc20ABI);

  const encodedActions: Action[] = data.map((item) => {
    // If the token is ETH, we need to send it to the 0x0 address
    if (item.token === `0x${"0".repeat(40)}`) {
      return {
        to: item.to as Address,
        value: BigNumber.from(item.amount.toString() || 0),
        data: Uint8Array.from([]) as unknown as `0x${string}`,
      };
    }
    const encodedData = iface.encodeFunctionData("transfer", [
      item.to,
      BigNumber.from(item.amount.toString() || 0),
    ]);

    const uint8ArrayData = ethers.utils.arrayify(encodedData);

    return {
      to: item.token as Address,
      value: BigNumber.from(0),
      data: uint8ArrayData as unknown as `0x${string}`,
    };
  });

  return encodedActions;
};
