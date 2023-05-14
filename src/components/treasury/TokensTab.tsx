import { ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { daoAddressOrEns } from "@constants/daoConfig";
import { useEffect, useState } from "react";
import { TokensType } from "types/typings";
import Image from "next/image";

export default function TokensTab() {
  const [tokens, setTokens] = useState<TokensType[]>();
  const [totalValue, setTotalValue] = useState<number>();

  useEffect(() => {
    const url = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;
    let value: number[] = [];
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      headers: {
        "Content-Type": "application/json",
      },
      params: [`${daoAddressOrEns}`, "erc20"],
      id: 42,
    });

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        const balances = response["data"]["result"];
        const tokensList: TokensType[] = [];
        let i = 0;
        balances["tokenBalances"].filter((token: any) => {
          let balance = token["tokenBalance"];
          if (balance !== "0") {
            i++;
            const metadataParams = JSON.stringify({
              jsonrpc: "2.0",
              method: "alchemy_getTokenMetadata",
              params: [`${token["contractAddress"]}`],
              id: 42,
            });

            const metadataConfig = {
              method: "post",
              url: url,
              headers: {
                "Content-Type": "application/json",
              },
              data: metadataParams,
            };

            axios(metadataConfig)
              .then((metadata: any) => {
                balance = balance / Math.pow(10, metadata.data.result["decimals"]);
                balance = balance.toFixed(4);
                axios
                  .get(`/api/coin-details?symbol=${metadata.data.result["symbol"]}`)
                  .then((res) => {
                    return res;
                  })
                  .then((res) => {
                    const data = {
                      balance: balance,
                      logo: metadata.data.result["logo"],
                      name: metadata.data.result["name"],
                      symbol: metadata.data.result["symbol"],
                      price:
                        res.data.data[metadata.data.result["symbol"]].quote.USD?.price.toFixed(2),
                      value: (
                        balance * res.data.data[metadata.data.result["symbol"]].quote.USD?.price
                      )
                        .toFixed(2)
                        .toString(),
                      percent_change_24hrs: (
                        balance *
                        res.data.data[metadata.data.result["symbol"]].quote.USD?.percent_change_24h
                      )
                        .toFixed(2)
                        .toString(),
                    };
                    tokensList.push(data);
                    if (Number(data.value) > 0.00) {
                      value.push(Number(data.value));
                    }
                    if (tokensList.length == i) {
                      setTokens(tokensList);
                      setTotalValue(
                        value.reduce((a, b) => {
                          return a + b;
                        })
                      );
                    }
                    console.log(tokens);
                    return res.data.data[metadata.data.result["symbol"]];
                  })
                  .catch((error) => {
                    console.log("error: ", error);
                  });
              })
              .catch((error) => console.log("error", error));
          }
        });
      })
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <div>
      <ul role="list" className="card divide-y divide-gray-200 p-8 shadow-xl">
        {tokens
          ?.sort((a, b) => {
            return Number(b.value) - Number(a.value);
          })
          ?.map((item, index) => (
            <div key={index} className="px-4 py-4 sm:px-0">
              {/* Your content */}
              <div className="flex w-full justify-center space-x-1.5">
                <div>
                  <div className="relative h-12 w-12">
                    <Image src={item.logo} layout="fill" alt="logo" className="rounded-full" />
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="space-x-1.5 font-semibold">
                      <span>{item.name}</span>
                      <span>
                        <div className="badge-gray-200 badge">
                          {totalValue != undefined && totalValue != 0.00 && Number(item.value) > 0.0
                            ? ((Number(item.value) / totalValue) * 100).toFixed(2)
                            : "0.00"}
                          %
                        </div>
                      </span>
                    </p>
                    <p className="flex space-x-1.5 text-sm">
                      <span>
                        {item.balance} {item.symbol}{" "}
                      </span>
                      <span className="flex h-full flex-col items-center justify-center">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-200" />
                      </span>
                      <span>{item.price}</span>
                    </p>
                  </div>
                  <div className="flex w-fit space-x-3">
                    <div className="flex h-full w-fit space-x-2">
                      <div className="flex w-10 flex-col items-start">
                        <p className="text-start font-semibold">${item.value}</p>
                        <p className="flex w-full space-x-1.5 text-sm">
                          <span className="text-start">
                            {Number(item.percent_change_24hrs) >= 0.00 ? "+" : "-"}
                            {Number(
                              Number(item.balance) - (Number(item.price) * Number(item.balance))
                            ).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex h-full items-center justify-center">
                      <span className="w-full">
                        <div
                          className={`badge ${
                            Number(item.percent_change_24hrs) >= 0.00
                              ? "badge-success"
                              : "badge-error"
                          } badge-success text-start text-base-100`}
                        >
                          {Number(item.percent_change_24hrs) >= 0.00 ? "+" : ""}
                          {item.percent_change_24hrs}
                        </div>
                      </span>
                      <button>
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
