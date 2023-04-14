import { type NextPage } from "next";
import Head from "next/head";
import { CreateProposalsView } from "views";

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
