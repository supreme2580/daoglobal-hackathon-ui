import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createClient, configureChains } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

export const { chains, provider } = configureChains(
  [goerli, polygonMumbai],
  [
    infuraProvider({ apiKey: `TO-ADD`, priority: 0 }),
    publicProvider({ priority: 1 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DAOGlobal UI",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
