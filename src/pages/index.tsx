import { type NextPage } from "next";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SwitchTheme } from "@/components/SwitchTheme";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DAOGlobal Hackathon UI</title>
        <meta name="description" content="Hacking Away Is Always Awesome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center to-[#15162c]">
        <ConnectButton />
        <SwitchTheme />
      </main>
    </>
  );
};

export default Home;
