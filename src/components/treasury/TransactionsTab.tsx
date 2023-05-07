import { ChevronRightIcon } from "@heroicons/react/24/outline";
import TransactionCard from "./TransactionCard";
import { useState } from "react";
import { ethers } from "ethers";
import { daoAddressOrEns } from "@constants/daoConfig";
import { TransactionResponse } from "alchemy-sdk";

export default function TransactionsTab() {
  const [data, setData] = useState<TransactionResponse[]>();

  const etherscanProvider = new ethers.providers.EtherscanProvider();

  etherscanProvider
    .getHistory(daoAddressOrEns)
    .then((res) => {
      return res;
    })
    .then((history) => {
      console.log(history.slice(0, 10));
      setData(history.slice(0, 10));
      return history;
    })
    .catch((error) => console.log(error));

  return (
    <div>
      <ul role="list" className="card divide-y divide-gray-200 p-8 shadow-xl">
        {data?.map((item, index) => (
          <li key={index} className="px-4 py-4 sm:px-0">
            {/* Your content */}
            <TransactionCard
              type={item.to == daoAddressOrEns ? "Deposit" : "Sent"}
              timestamp={Number(item.timestamp)}
              value={item.value.toString()}
            />
          </li>
        ))}
        <button className="remove-text-transform btn-neutral btn-xs btn-md btn mt-4 max-w-fit text-white sm:w-auto">
          <div className="flex items-center">
            <span>See all tokens</span>
            <span>
              <ChevronRightIcon className="h-6 w-6" />
            </span>
          </div>
        </button>
      </ul>
    </div>
  );
}
