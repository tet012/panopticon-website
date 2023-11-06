import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit"; // Ensure you have RainbowKit installed
import { AnimContDyna, fadeInSmooth } from "../animations";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";
import { abi } from "../../web3/dutch-auction/abi";

import { useGetUserData } from "../../web3/dutch-auction/use-get-user-data";
import { useGetClaimableTokens } from "../../web3/dutch-auction/use-get-claimable-token";

import useGetMerkleProof from "../../web3/merkle-tree/use-get-merkle-proof";

const emptyMerkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

export function MintBtn() {
  const [tokenCount, setTokenCount] = useState<number>(1);
  const { price, priceInWei, loading, error } = useCurrentPrice();
  const { address, isConnected } = useAccount();

  const { proof } = useGetMerkleProof(address);
  const userData = useGetUserData(address);

  const totalPrice = price ? (parseFloat(price) * tokenCount).toFixed(2) : "0";
  const value = priceInWei
    ? (BigInt(priceInWei.toString()) * BigInt(tokenCount)).toString()
    : "0";

  const prepareContractWrite = usePrepareContractWrite({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "bid",
    args: [tokenCount, proof],
    value: BigInt(value),
  });

  const { data, write } = useContractWrite(prepareContractWrite.config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  if (!isConnected) {
    return <ConnectButton showBalance={false} />;
  }

  return (
    <motion.div
      variants={AnimContDyna}
      initial="hidden"
      animate="show"
      className="flex w-full h-auto p-4 overflow-hidden bg-gradient-to-r from-green-400 to-teal-500 animate-gradient-xy rounded-2xl"
    >
      <motion.button
        variants={fadeInSmooth}
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
        onClick={() => setTokenCount((prevCount) => Math.max(1, prevCount - 1))}
        disabled={!isConnected || isLoading}
      >
        -
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="flex-1 p-4 text-center mint_button bg-neutral-900 whiteShadow drop-shadow-md text-neutral-100"
        disabled={isLoading}
        onClick={() => {
          if (write) {
            write();
          }
        }}
      >
        {isLoading
          ? "Minting..."
          : isConnected
          ? isSuccess
            ? "Mint with rebate"
            : `Mint ${tokenCount} tokens for ${totalPrice} ETH`
          : "Login to Mint"}
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100"
        onClick={() => setTokenCount((prevCount) => prevCount + 1)}
        disabled={!isConnected || isLoading}
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
