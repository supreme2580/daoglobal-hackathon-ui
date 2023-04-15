import { daoAddressOrEns } from "@constants/daoConfig";
import { useFetchProposals } from "@daobox/use-aragon";
import { type NextPage } from "next";
import Head from "next/head";

const Voting: NextPage = () => {
  useFetchProposals({ daoAddressOrEns });
  return (
    <>
      <Head>
        <title>DAOGlobal Voting UI</title>
        <meta name="description" content="DAOBox DAO Voting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>DAOGlobal Voting UI</h1>
    </>
  );
};

export default Voting;
