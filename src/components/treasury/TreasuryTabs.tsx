import { useLocalStorage } from "usehooks-ts";

export default function TreasuryTabs() {
  const [tab, setTab] = useLocalStorage("tab", "tokens");
  return (
    <div className="flex space-x-2.5">
      <button
        className={`font-semibold decoration-4 hover:underline hover:decoration-daoboxg hover:underline-offset-8 
                ${
                  tab == "tokens" || ""
                    ? "underline decoration-daoboxg decoration-4 underline-offset-8"
                    : ""
                }`}
        onClick={() => setTab("tokens")}
      >
        Tokens
      </button>
      <button
        className={`font-semibold decoration-4 hover:underline hover:decoration-daoboxg hover:underline-offset-8 
                ${
                  tab == "transactions"
                    ? "underline decoration-daoboxg decoration-4 underline-offset-8"
                    : ""
                }`}
        onClick={() => setTab("transactions")}
      >
        Transactions
      </button>
    </div>
  );
}
