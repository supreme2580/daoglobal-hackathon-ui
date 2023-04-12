import { type AppType } from "next/dist/shared/lib/utils";

import { WagmiConfig, goerli } from "wagmi";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiClient, chains } from "../lib/wagmiClient";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppShell } from "../components/layout/AppShell";
import { useEffect, useState } from "react";

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
        {
          mounted && <AppShell>
          <Component {...pageProps} />
        </AppShell>
        }
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
