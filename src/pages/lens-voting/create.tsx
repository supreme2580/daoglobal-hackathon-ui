import { CreateProposalsView } from "@components/proposals";
import { type NextPage } from "next";
import Head from "next/head";

const CreateProposals: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Voting UI</title>
        <meta name="description" content="DAOBox DAO Voting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateProposalsView />
    </>
  );
};

export default CreateProposals;
