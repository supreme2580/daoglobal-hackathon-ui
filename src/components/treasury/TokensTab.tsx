import TokenIcon from "@components/icons/token";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { AssetBalanceSortBy, useFetchDaoBalances } from "@daobox/use-aragon";

// import daoAddressOrEns from "@constants/daoConfig";

export default function TokenTab() {
    const cities = [
        {
            city: "Athens",
            rating: "2 open PR",
        },
        {
            city: "Luzern",
            rating: "1 open PR",
        },
        {
            city: "Zürich",
            rating: "0 open PR",
        },
        {
            city: "Vienna",
            rating: "1 open PR",
        },
        {
            city: "Ermatingen",
            rating: "0 open PR",
        },
        {
            city: "Lisbon",
            rating: "0 open PR",
        },
    ];

    const { data, isLoading, isError } = useFetchDaoBalances({
      daoAddressOrEns: "0xe2e445489b0356D3087efF7e79DB7Ff3f16c4fEA",
    });
    console.log({data});

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error!!!</div>;

    return (
      <div>
        {data?.map((asset, index) => (
          <div key={index}>
            {JSON.stringify(asset, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}
          </div>
        ))}
        <ul role="list" className="card divide-y divide-gray-200 p-8 shadow-xl">
          {cities.map((item, index) => (
            <li key={index} className="px-4 py-4 sm:px-0">
              {/* Your content */}
              <div className="flex w-full justify-center space-x-1.5">
                <div>
                  <TokenIcon />
                </div>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="space-x-1.5 font-semibold">
                      <span>USD Coin</span>
                      <span>
                        <div className="badge-gray-200 badge">100%</div>
                      </span>
                    </p>
                    <p className="flex space-x-1.5 text-sm">
                      <span>100k usdc </span>
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
