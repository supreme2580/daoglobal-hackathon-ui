import { useBalanceAndPower } from "@hooks/lens/useBalanceAndPower";
import { useDelegateNFT } from "@hooks/lens/useDelegateNFT";
import { useMintDaoboxNFT } from "@hooks/lens/useMintDaoboxNFT";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { token } = useBalanceAndPower("0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a");
  const { write: mint } = useMintDaoboxNFT();
  const { write: delegate } = useDelegateNFT("0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a");

  return (
    <>
      <Head>
        <title>DAOGlobal Members UI</title>
        <meta name="description" content="DAOBox DAO Members" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl text-daoboxg">DAOGlobal Dashboard UI</h1>
      <div className="stats bg-primary text-primary-content">
        <div className="stat">
          <div className="stat-title">Token Balance</div>
          <div className="stat-value">{token.balance ? token.balance : 0}</div>
          <div className="stat-actions">
            <button className="btn-success btn-sm btn" onClick={() => mint?.()}>
              Mint Token
            </button>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Voting Power</div>
          <div className="stat-value">{token.power ? token.power : 0}</div>
          <div className="stat-actions">
            <button className="btn-secondary btn-sm btn" onClick={() => delegate?.()}>
              Activate Voting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
