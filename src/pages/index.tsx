import { type NextPage } from "next";
import Head from "next/head";
import { useFetchDao } from "@daobox/use-aragon";
import { daoAddressOrEns } from "@constants/daoConfig";

const Home: NextPage = () => {
  const { status } = useFetchDao({ daoAddressOrEns });

  return (
    <>
      <Head>
        <title>DAOGlobal Hackathon UI</title>
        <meta name="description" content="Hacking Away Is Always Awesome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Status: {status}</h3>
    </>
  );
};

export default Home;
