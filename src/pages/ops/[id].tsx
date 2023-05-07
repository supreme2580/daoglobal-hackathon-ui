import { ProposalsByIDView } from "@components/op";
import Head from "next/head";
import { useRouter } from "next/router";

const OPProposalsByID = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>DAOGlobal Voting UI</title>
        <meta name="description" content="DAOBox DAO Voting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProposalsByIDView pid={id?.toString()} />
    </>
  );
};

export default OPProposalsByID;
