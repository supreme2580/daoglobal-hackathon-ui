import { OptimisticProposalsView } from "@components/op";
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

      <OptimisticProposalsView />
    </>
  );
};

export default Proposals;
