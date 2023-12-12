import "../styles/global.css";
import Head from "next/head";

import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import NavBar from "../components/organisms/NavBar";
import Footer from "../components/organisms/Footer";

const infuraId = process.env.INFURA_ID || "01ce58772c21421d833971a8ccf7f111";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: infuraId }), publicProvider()],
);

const projectId = "f99a5c07d12ddbe3b9010b0f0e8a0a49";

const { wallets } = getDefaultWallets({
  appName: "Panopticon",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Panopticon",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        coolMode
        appInfo={demoAppInfo}
        showRecentTransactions={true}
        chains={chains}
      >
        <Head>
          <link rel="icon" href="img/favicon.ico" sizes="any" />
        </Head>
        <div className="p-4 bg-neutral-50 max-md:p-2">
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
