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
import { generateEtherscanLinkForTx } from "../../utils/etherscan";

const emptyMerkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

export function MintBtn() {
  const [tokenCount, setTokenCount] = useState<number>(1);
  const { price, priceInWei, loading, error } = useCurrentPrice();
  const { address, isConnected } = useAccount();

  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const userData = useGetUserData(effectiveAddress);

  const { proof } = useGetMerkleProof(effectiveAddress);

  const totalPrice = price ? (parseFloat(price) * tokenCount).toFixed(3) : "0";
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
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || "1")
  });

  const mintTransaction = useContractWrite(prepareContractWrite.config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: mintTransaction?.data?.hash });

  if (!isConnected) {
    return <ConnectButton showBalance={false} />;
  }

  return (
    <motion.div
      variants={AnimContDyna}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2 w-full h-auto p-2 overflow-hidden bg-gradient-to-r from-green-400 to-teal-500 animate-gradient-xy rounded-2xl"
    >
      <div className="flex w-full">
        <motion.button
          variants={fadeInSmooth}
          className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
          onClick={() =>
            setTokenCount((prevCount) => Math.max(1, prevCount - 1))
          }
          disabled={!isConnected || isLoading}
        >
          -
        </motion.button>
        <motion.button
          variants={fadeInSmooth}
          className="ww-full grow flex p-4 text-center justify-center mint_button bg-neutral-900 whiteShadow drop-shadow-md text-neutral-100"
          disabled={isLoading || !!prepareContractWrite?.error}
          onClick={() => {
            if (mintTransaction?.write) {
              mintTransaction.write();
            } else {
              console.log(mintTransaction);
            }
          }}
        >
          {isLoading
            ? "Minting..."
            : isConnected
            ? isSuccess
              ? `Mint ${tokenCount} tokens for ${totalPrice} ETH`
              : `Mint ${tokenCount} tokens for ${totalPrice} ETH`
            : "Login to Mint"}
        </motion.button>
        <motion.button
          variants={fadeInSmooth}
          className="ww-full p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100 "
          onClick={() => setTokenCount((prevCount) => prevCount + 1)}
          disabled={!isConnected || isLoading}
        >
          +
        </motion.button>
      </div>

      {isSuccess && (
        <div className="bg-neutral-100 p-4 flex  flex-col gap-4 rounded-xl">
          Successfully minted {tokenCount} tokens
          <div className="flex flex-col gap-2">
            <a
              className="font-semibold p-2 w-full rounded-lg bg-neutral-200"
              href={`https://opensea.io/assets/ethereum/${NEXT_PUBLIC_PANOPTICON_CONTRACT_ADDRESS}/${mintTransaction?.data?.hash}`}
              target="_blank" rel="noreferrer"
            >
              View on Opensea
            </a>
            <a
              className="font-semibold p-2 w-full rounded-lg bg-neutral-200"
              href={generateEtherscanLinkForTx(mintTransaction?.data?.hash)}
              target="_blank" rel="noreferrer"
            >
              View on Etherscan
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MintBtn;
