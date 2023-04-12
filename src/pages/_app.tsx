import { type AppType } from "next/dist/shared/lib/utils";

import { WagmiConfig, goerli } from "wagmi";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiClient, chains } from "../lib/wagmiClient";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        showRecentTransactions={true}
        initialChain={goerli}
        modalSize="compact"
      >
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
