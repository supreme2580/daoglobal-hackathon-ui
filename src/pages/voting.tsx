import { daoAddressOrEns } from "@constants/daoConfig";
import { useFetchProposals } from "@daobox/use-aragon";
import { type NextPage } from "next";
import Head from "next/head";
type ReplacerFunction = (key: string, value: unknown) => unknown;

const bigintToStringReplacer: ReplacerFunction = (key, value) => {
  if (typeof value === "bigint") {
    return value.toString();
  } else {
    return value;
  }
};

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
      {data?.map((proposal, index: React.Key) => (
        <pre key={index}>
          {JSON.stringify(proposal, bigintToStringReplacer, 2)}
        </pre>
      ))}
    </>
  );
};

export default Voting;
