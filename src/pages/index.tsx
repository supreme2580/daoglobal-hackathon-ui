import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Members UI</title>
        <meta name="description" content="DAOBox DAO Members" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl text-daoboxg">DAOGlobal Members UI</h1>
    </>
  );
};

export default Home;
