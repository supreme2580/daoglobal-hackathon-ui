import TokenIcon from "@components/icons/token";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useFetchDaoBalances } from "@daobox/use-aragon";
import axios from "axios";
import { daoAddressOrEns } from "@constants/daoConfig";
import { useEffect, useState } from "react";
import { TokensType } from "types/typings";

export default function TokensTab() {

    const [tokens, setTokens] = useState<TokensType[]>()

    useEffect(() => {
      const url = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      const data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "alchemy_getTokenBalances",
        "headers": {
          "Content-Type": "application/json"
        },
        "params": [
          `${daoAddressOrEns}`,
          "erc20",
        ],
        "id": 42
      });
      
      const config = {
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config).then(response => {
        const balances = response['data']['result']
        const tokensList: TokensType[] = []
        let i = 0
        balances['tokenBalances'].filter((token: any) => {
          let balance = token['tokenBalance']
          if (balance !== '0') {
            i++
              const metadataParams = JSON.stringify({
              "jsonrpc": "2.0",
              "method": "alchemy_getTokenMetadata",
              "params": [
                  `${token['contractAddress']}`
              ],
              "id": 42
            });
          
            const metadataConfig = {
              method: 'post',
              url: url,
              headers: {
                'Content-Type': 'application/json'
              },
              data : metadataParams
            };

            axios(metadataConfig).then((metadata: any) => {
              balance = balance/Math.pow(10, metadata.data.result['decimals']);
              balance = balance.toFixed(4);
              const data = {
                balance: balance,
                logo: metadata.data.result['logo'],
                name: metadata.data.result['name'],
                symbol: metadata.data.result['symbol']
              }
              tokensList.push(data)
              console.log(i, tokensList)
              if (tokensList.length == i) {
                setTokens(tokensList)
              }
            }).catch(error => console.log('error', error))
          }
        })
      }).catch(error => console.log("error: ", error))      
    }, [])


    return (
      <div>
        <ul role="list" className="card divide-y divide-gray-200 p-8 shadow-xl">
          {tokens?.map((item, index) => (
            <div key={index} className="px-4 py-4 sm:px-0">
              {/* Your content */}
              <div className="flex w-full justify-center space-x-1.5">
                <div>
                  <TokenIcon />
                </div>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="space-x-1.5 font-semibold">
                      <span>{item.symbol}</span>
                      <span>
                        <div className="badge-gray-200 badge">100%</div>
                      </span>
                    </p>
                    <p className="flex space-x-1.5 text-sm">
                      <span>{item.balance} {item.symbol} </span>
                      <span className="flex h-full flex-col items-center justify-center">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-200" />
                      </span>
                      <span> $1.00</span>
                    </p>
                  </div>
                  <div className="flex w-fit space-x-1.5">
                    <div className="flex h-full w-fit space-x-2">
                      <div>
                        <p className="font-semibold">$100,200.00</p>
                        <p className="flex space-x-1.5 text-sm">
                          <span>+107.71</span>
                          <span>
                            <div className="badge-success badge text-base-100">+0.11%</div>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex h-full flex-col justify-center">
                      <button>
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {JSON.stringify(item, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
            </div>
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
