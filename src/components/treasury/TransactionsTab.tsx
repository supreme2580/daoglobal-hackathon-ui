import { ChevronRightIcon } from "@heroicons/react/24/outline";
import TransactionCard from "./TransactionCard";
import { useState } from "react";
import { daoAddressOrEns } from "@constants/daoConfig";
import { Alchemy, AssetTransfersCategory, Network, AssetTransfersResult, SortingOrder } from "alchemy-sdk";

export default function TransactionsTab() {
  const [data, setData] = useState<AssetTransfersResult[]>();

    const config = {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
      network: Network.MATIC_MAINNET,
    };
    const alchemy = new Alchemy(config);
    
    alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: "0xa3db2cb625bae87d12ad769c47791a04ba1e5b29",
      category: [
        AssetTransfersCategory.EXTERNAL, 
        AssetTransfersCategory.INTERNAL, 
        AssetTransfersCategory.ERC20, 
        AssetTransfersCategory.ERC721, 
        AssetTransfersCategory.ERC1155, 
        AssetTransfersCategory.SPECIALNFT
      ],
      order: SortingOrder.DESCENDING
    }).then(res => {
      return res
    }).then(res => {
      setData(res.transfers)
      console.log("history: ", res)
      return res
    }).catch(error => {
      console.log(error)
    });

  return (
    <div>
      <ul role="list" className="card divide-y divide-gray-200 p-8 shadow-xl">
        {data?.map((item, index) => (
          <li key={index} className="px-4 py-4 sm:px-0">
            {/* Your content */}
            <TransactionCard
              type={item.to == "0xa3db2cb625bae87d12ad769c47791a04ba1e5b29" ? "Deposit" : "Sent"}
              asset={item.asset || ""}
              hash={item.hash}
              value={item.value?.toFixed(4).toString() || "0"}
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
