import { type AppType } from "next/dist/shared/lib/utils";
import { AragonProvider } from "@daobox/use-aragon";
import { ToastContainer } from "react-toastify";
import { WagmiConfig, goerli } from "wagmi";
import "react-toastify/dist/ReactToastify.min.css";

import "@styles/globals.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@rainbow-me/rainbowkit/styles.css";
import { client as wagmiClient, chains } from "../lib/wagmiClient";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { AppShell } from "../components/layout/AppShell";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);
  const mode = useReadLocalStorage("theme");
  function currentMode() {
    if (mode === "darkmode") {
      return darkTheme();
    } else if (mode === "lightmode") {
      return lightTheme();
    } else {
      return darkTheme();
    }
  }
  useEffect(() => {
    setMounted(true);
    currentMode();
  }, [currentMode()]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        showRecentTransactions={true}
        initialChain={goerli}
        modalSize="compact"
        theme={currentMode()}
      >
        <AragonProvider>
          {mounted && (
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          )}
          <ToastContainer position="bottom-right" />
        </AragonProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
