import { Address, erc20ABI } from "wagmi";
import { ethers } from "ethers";
import { DaoAction } from "@daobox/use-aragon";

interface TransferEncoderProps {
  to: Address;
  amount: number;
  token: Address;
}

export const transferEncoder = (data: TransferEncoderProps[]) => {
  const iface = new ethers.utils.Interface(erc20ABI);

  const encodedActions: DaoAction[] = data.map((item) => {
    // If the token is ETH, we need to send it to the 0x0 address
    if (item.to === `0x${"0".repeat(40)}`) {
      return {
        to: item.to,
        value: BigInt(item.amount),
        data: Uint8Array.from([]),
      };
    }

    const encodedData = iface.encodeFunctionData("transfer", [
      item.to,
      BigInt(item.amount),
    ]);

    const uint8ArrayData = ethers.utils.arrayify(encodedData);

    return {
      to: item.token,
      value: BigInt(0),
      data: uint8ArrayData,
    };
  });

  return encodedActions;
};
