import { ChevronRightIcon } from "@heroicons/react/24/outline";
import TransactionCard from "./TransactionCard";
import { useEffect, useState } from "react";
import { daoAddressOrEns } from "@constants/daoConfig";
import axios from "axios";

export default function TransactionsTab() {
  const [data, setData] = useState<any[]>();
  const [maticPrice, setMaticPrice] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const API_ENDPOINT = `https://api.polygonscan.com/api?module=account&action=txlist&address=${daoAddressOrEns}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;
    try {
      axios.get(API_ENDPOINT).then(res => {
          return res
      }).then(res => {
          setData(res.data.result)
          setLoading(false)
          return res.data.result
      }).catch(() => {
        setLoading(false)
        setError(true)
      })     
    } catch (error) {
      console.log(error)
    }
    try {
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd&apiKey=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`).then(res => {
        return res
      }).then(res => {
        setMaticPrice(res.data['matic-network'].usd)
      }); 
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (loading) {
    return <div>Fetching balances...</div>
  }
  else {
    if (error) {
      return <div>Error fetching balances</div>
    }
    else {
      return (
        <div>
          <ul role="list" className="card divide-y divide-gray-200 p-8 shadow-xl">
            {data?.map((item: any, index: any) => (
              <li key={index} className="px-4 py-4 sm:px-0">
                <TransactionCard
                  type={item.to == daoAddressOrEns.toLocaleLowerCase() ? "Deposit" : "Sent"}
                  timestamp={item.timeStamp}
                  value={Number(Number(item.value)/(10**18))?.toFixed(4).toString()}
                  price={Number(maticPrice) || 0}
                  hash={item.hash}
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
  }
}
