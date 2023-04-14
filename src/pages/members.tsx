import { type NextPage } from "next";
import Head from "next/head";
import MembersCardCount from "@components/MembersCardCount";
import InputSearch from "@components/InputSearch";
import MemberCardList from "@components/MemberCardList";

const Members: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Hackathon UI</title>
        <meta name="description" content="Hacking Away Is Always Awesome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full w-full justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <MembersCardCount />
          <InputSearch />
          <MemberCardList />
        </div>
      </main>
    </>
  );
};

export default Members;
