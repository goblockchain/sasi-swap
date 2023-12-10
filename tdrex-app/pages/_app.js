import "../styles/globals.css";

import merge from "lodash.merge";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { Providers } from "../provider";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const xrp_ledger = {
  id: 1440002,
  name: "XRPL EVM Sidechain",
  network: "evm-sidechain",
  nativeCurrency: {
    decimals: 18,
    name: "XRP",
    symbol: "XRP",
  },
  rpcUrls: {
    public: { http: ["https://rpc-evm-sidechain.xrpl.org/"] },
    default: { http: ["https://rpc-evm-sidechain.xrpl.org/"] },
  },
  blockExplorers: {
    etherscan: {
      name: "EVM Sidechain Block Explorer",
      url: "https://evm-sidechain.xrpl.org/",
    },
    default: {
      name: "EVM Sidechain Block Explore",
      url: "https://evm-sidechain.xrpl.org/",
    },
  },
  contracts: {
    multicall3: {
      address: "0xB2F3994FD5B2CCf1Dc63FC05E01B06d376170F3f",
      blockCreated: 11_907_934,
    },
  },
};

const { chains, provider } = configureChains(
  [xrp_ledger],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: "https://rpc-evm-sidechain.xrpl.org/",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "SaSi Swap",
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
