import { type NextPage } from "next";
import Head from "next/head";

const Feed: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Feed UI</title>
        <meta name="description" content="DAOBox DAO Feed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center to-[#15162c]">
        <h1>DAOGlobal Feed UI</h1>
      </main>
    </>
  );
};

export default Feed;
