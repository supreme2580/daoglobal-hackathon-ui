import DepositIcon from "@components/icons/deposit";
import TransactionModal from "./TransactionModal";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { TransactionCardType } from "types/typings";
import Moment from "react-moment";
import moment from "moment"
import { ethers } from "ethers";
import { TransactionResponse } from "alchemy-sdk";

export default function TransactionCard({ type, asset, hash, value }: TransactionCardType) {
  const ref = useRef<HTMLLabelElement>(null);
  const [tx, setTx] = useState<TransactionResponse>()
  const etherscanProvider = new ethers.providers.EtherscanProvider({
    "name": "matic",
    "chainId": 137
  });
  etherscanProvider.getTransaction(hash).then(res => {
    return res
  }).then(res => {
    setTx(res)
  }).catch(error => console.log(error));

  return (
    <div className="flex w-full justify-center space-x-1.5">
      <div>
        <DepositIcon />
      </div>
      <div className="flex w-full justify-between">
        <div>
          <p className="font-semibold">{type}</p>
          {/* <Moment fromNow>{moment.unix(timestamp)}</Moment> */}
        </div>
        <div className="flex w-fit space-x-1.5">
          <div className="flex h-full w-fit space-x-2">
            <div>
              <p className="font-semibold">{value} {asset}</p>
              <p className="text-sm">$89937.07</p>
            </div>
          </div>
          <div className="flex h-full flex-col justify-center">
            <TransactionModal />
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <label htmlFor="my-modal-6" className="hidden" ref={ref}>
              <ChevronRightIcon className="h-6 w-6" />
            </label>
            <button onClick={() => ref.current?.click()}>
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
