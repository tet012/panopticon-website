import React from "react";
import { motion } from "framer-motion";
import {
  fadeInSmooth,
} from "../animations";
import JumboTxt from "../JumboTxt";
import CurrentPrice from "./CurrentPrice";
import MintButton from "./MintButton";
import Minted from "./Minted";
import ClaimTokensButton from "./ClaimTokensButton";
import ClaimRebateButton from "./ClaimRebateButton";
import DutchAuctionTimer from "./DutchAuctionTimer";
import TotalSupply from "./TotalSupply";
import { useNetwork, useSwitchNetwork } from 'wagmi';

const RequireCorrectNetwork: React.FC = ({ children }: any) => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  if(!chain || !chain.id) {
    return null;
  }

  if(chain.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
    return (
      <motion.p
        variants={fadeInSmooth}
        className="border p-4 rounded-xl border-neutral-300 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
        style={{ backgroundColor: 'red', color: '#fff' }}
      >
        <button
          onClick={() => switchNetwork?.(Number(process.env.NEXT_PUBLIC_CHAIN_ID))}
        >
          Switch network to Ethereum to mint
          {isLoading && ' (switching)'}
        </button>
      </motion.p>
    );
  }
  return children;
};

const MintingUI: React.FC = () => {
  return (
    <>
      <motion.div
        variants={fadeInSmooth}
        className="flex flex-col p-4 w-2/4 max-md:w-full gap-2"
      >
        <JumboTxt></JumboTxt>
        <DutchAuctionTimer />
        <motion.div
          variants={fadeInSmooth}
          className="w-full flex justify-around rounded-xl border border-neutral-300 rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
        >
            <p className="w-full">Current Price</p>
            <div className="flex gap-2">
            <CurrentPrice />
            </div>
        </motion.div>
        <motion.div
          variants={fadeInSmooth}
          className="w-full flex justify-between rounded-xl border border-neutral-300 rounded-lg p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
        >
          <p className="whitespace-nowrap">Total Minted</p>
          <div className="flex gap-2">
          <Minted />
          <p>/</p>
          <TotalSupply />
          </div>
        </motion.div>

        <motion.p
          className="grow flex flex-col space-between border-neutral-300 justify-between border rounded-xl p-4 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
          variants={fadeInSmooth}
        >
          Started in 2022, Panopticon is Teto&apos;s genesis long form
          collection, a digital artist with over a decade of experience
          as an art director for the music industry and a web developer.
        </motion.p>
        <motion.p
          variants={fadeInSmooth}
          className="border p-4 rounded-xl border-neutral-300 hover:border-neutral-300 hover:bg-neutral-100 hover:shadow "
        >
          In partnership with FingerprintsDAO
        </motion.p>
        
        <RequireCorrectNetwork>
          <MintButton />
          <ClaimTokensButton />
          <ClaimRebateButton />
        </RequireCorrectNetwork>
      </motion.div>
    </>
  );
};

export default MintingUI;
