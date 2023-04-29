import { type NextPage } from "next";
import Head from "next/head";
import MembersCardCount from "@components/members/MembersCardCount";
import InputSearch from "@components/members/InputSearch";
import MemberCardList from "@components/members/MemberCardList";
import { useDaoboxMembers } from "@hooks/lens/useDaoboxMembers";

const Members: NextPage = () => {
  const { data: members } = useDaoboxMembers();

  return (
    <>
      <Head>
        <title>DAOGlobal Hackathon UI</title>
        <meta name="description" content="Hacking Away Is Always Awesome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-base flex h-full w-full justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <MembersCardCount memberCount={members?.length} />
          <InputSearch />
          <MemberCardList members={members} />
        </div>
      </main>
    </>
  );
};

export default Members;
