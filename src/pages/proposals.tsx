import { type NextPage } from "next";
import Head from "next/head";
import { ProposalsView } from "../views/proposals";

const Proposals: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Voting UI</title>
        <meta name="description" content="DAOBox DAO Voting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProposalsView />
    </>
  );
};

export default Proposals;
