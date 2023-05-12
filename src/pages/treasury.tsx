import TokensTab from "@components/treasury/TokensTab";
import TransactionsTab from "@components/treasury/TransactionsTab";
import TreasuryTabs from "@components/treasury/TreasuryTabs";
import { type NextPage } from "next";
import Head from "next/head";
import { useReadLocalStorage } from "usehooks-ts";

const Treasury: NextPage = () => {
  const tab = useReadLocalStorage("tab")
  return (
    <>
      <Head>
        <title>DAOGlobal Treasury UI</title>
        <meta name="description" content="DAOBox DAO Treasury" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>DAOGlobal Treasury UI</h1>
      <main className="bg-base flex h-full w-full justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <TreasuryTabs />
          {tab == "tokens" || null ? <TokensTab /> : <TransactionsTab />}
        </div>
      </main>
    </>
  );
};

export default Treasury;