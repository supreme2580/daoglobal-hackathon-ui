import { ProposalsView } from "@components/proposals";
import { type NextPage } from "next";
import Head from "next/head";

const Proposals: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Proposals UI</title>
        <meta name="description" content="DAOBox DAO Proposals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProposalsView />
    </>
  );
};

export default Proposals;
