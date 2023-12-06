import "../styles/globals.css";

import merge from "lodash.merge";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { Providers } from "../provider";

const { chains, provider } = configureChains(
  [chain.sepolia],
  [
    infuraProvider({
      apiKey: "0dda5fca764940a89e89bbf434874226",
      priority: 1,
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Tdrex",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const myTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#ooo",
    accentColorForeground: "#52525b",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
