import { type AppType } from "next/dist/shared/lib/utils";

import { WagmiConfig } from "wagmi";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiClient, chains } from "../lib/wagmiClient";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  )
};

export default MyApp;
