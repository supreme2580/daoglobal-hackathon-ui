import { type AppType } from "next/dist/shared/lib/utils";

import { WagmiConfig, goerli } from "wagmi";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiClient, chains } from "../lib/wagmiClient";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { SideBar } from "../components/layout/SideBar";
import { useEffect, useState } from "react";
import { AragonProvider } from "@daobox/use-aragon";
import { RecoilRoot } from "recoil"

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        showRecentTransactions={true}
        initialChain={goerli}
        modalSize="compact"
      >
        <RecoilRoot>
          <SideBar>
            <AragonProvider>
              {mounted && <Component {...pageProps} />}
            </AragonProvider>
          </SideBar>
        </RecoilRoot>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
