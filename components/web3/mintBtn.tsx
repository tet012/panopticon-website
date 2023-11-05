import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { AnimContDyna, fadeInSmooth } from "../animations";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";

export function MintBtn() {
  const [tokenCount, setTokenCount] = useState(1);
  const { price, loading, error } = useCurrentPrice();

  const totalPrice = price ? (parseFloat(price) * tokenCount).toFixed(2) : "0"; // Calculate the total price
  const totalPriceInWei = (parseFloat(totalPrice) * 1e18).toString(); // Convert ether to wei

  const { config } = usePrepareSendTransaction({
    to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_2 as `0x${string}`,
    value: totalPriceInWei,
  });

  const { data, sendTransaction } = useSendTransaction(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <motion.div
      variants={AnimContDyna}
      initial="hidden"
      animate="show"
      className="w-full h-auto bg-gradient-to-r from-green-400 to-teal-500 animate-gradient-xy rounded-2xl overflow-hidden flex p-4"
    >
      {error && <div>Error fetching price: {error.message}</div>}
      <motion.button
        variants={fadeInSmooth}
        className="mint_button p-4 bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
        onClick={() => setTokenCount((prevCount) => Math.max(1, prevCount - 1))}
      >
        -
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="mint_button flex-1 p-4 bg-neutral-900 whiteShadow drop-shadow-md text-center text-neutral-100"
        onClick={() => sendTransaction?.()}
      >
        {isLoading
          ? "Minting..."
          : `Mint ${tokenCount} tokens for ${totalPrice} ETH`}
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="mint_button p-4 bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100"
        onClick={() => setTokenCount((prevCount) => prevCount + 1)}
      >
        +
      </motion.button>
      {isSuccess && (
        <div>
          Successfully minted {tokenCount} tokens
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MintBtn;
