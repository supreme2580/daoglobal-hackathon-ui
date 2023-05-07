import { OptimisticProposalsView } from "@components/op";
import { ProposalsView } from "@components/proposals";
import { type NextPage } from "next";
import Head from "next/head";

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
