import { type NextPage } from "next";
import Head from "next/head";
import { useFetchDao } from "@daobox/use-aragon";
import { daoAddressOrEns } from "@/constants";
import MembersCardCount from "@/components/MembersCardCount";

const Home: NextPage = () => {
  // const { data, status } = useFetchDao({ daoAddressOrEns, });

  return (
    <>
      <Head>
        <title>DAOGlobal Hackathon UI</title>
        <meta name="description" content="Hacking Away Is Always Awesome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full flex justify-center">
        <div className="max-w-7xl w-full">
          <MembersCardCount />
        </div>
      </main>
    </>
  );
};

export default Home;
