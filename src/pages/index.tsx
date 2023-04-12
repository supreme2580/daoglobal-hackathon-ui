import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Hackathon UI</title>
        <meta name="description" content="Hacking Away Is Always Awesome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center to-[#15162c]">
        <h1>DAOGlobal Hackathon UI</h1>
      </main>
    </>
  );
};

export default Home;
