import { daoAddressOrEns } from "@constants/daoConfig";
import {
  TokenVotingProposalListItem,
  useFetchProposals,
} from "@daobox/use-aragon";
import { type NextPage } from "next";
import Head from "next/head";

const Voting: NextPage = () => {
  const { data } = useFetchProposals({ daoAddressOrEns });
  return (
    <>
      <Head>
        <title>DAOGlobal Voting UI</title>
        <meta name="description" content="DAOBox DAO Voting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>DAOGlobal Voting UI</h1>
      {data?.map((proposal: TokenVotingProposalListItem, index: React.Key) => (
        <pre key={index}>
          {JSON.stringify(
            proposal,
            (_, v) => (typeof v === "bigint" ? v.toString() : v),
            2
          )}
        </pre>
      ))}
    </>
  );
};

export default Voting;
