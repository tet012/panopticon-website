import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { formatEther } from "viem";
import { AnimContDyna, fadeInSmooth } from "../animations";
import { useCurrentPrice } from "../../web3/dutch-auction/use-get-current-price";
import { abi } from "../../web3/dutch-auction/abi";

const merkleProof: `0x${string}`[] = [
  "0x0000000000000000000000000000000000000000000000000000000000000000",
];

export function MintBtn() {
  const [tokenCount, setTokenCount] = useState<number>(1);
  const [errorMint, setErrorMint] = useState<string>("");
  const { price, priceInWei, loading, error } = useCurrentPrice();

  const totalPrice = price ? (parseFloat(price) * tokenCount).toFixed(2) : "0"; // Calculate the total price
  const totalPriceInWei = (parseFloat(totalPrice) * 1e18).toString(); // Convert ether to wei

  const value = priceInWei
    ? (BigInt(priceInWei.toString()) * BigInt(tokenCount)).toString()
    : "0";

  const valueInETH = formatEther(BigInt(value));

  const prepareContractWrite = usePrepareContractWrite({
    address: process.env
      .NEXT_PUBLIC_DUTCH_AUCTION_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "bid",
    args: [tokenCount, merkleProof],
    value: BigInt(value),
  });

  const { data, write } = useContractWrite(prepareContractWrite.config);

  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    console.log(prepareContractWrite.error);
    if (prepareContractWrite.error && prepareContractWrite.isError) {
      setErrorMint("Execution reverted");
    }
  }, [prepareContractWrite.error, prepareContractWrite.isError]);

  console.log(valueInETH);

  return (
    <motion.div
      variants={AnimContDyna}
      initial="hidden"
      animate="show"
      className="flex w-full h-auto p-4 overflow-hidden bg-gradient-to-r from-green-400 to-teal-500 animate-gradient-xy rounded-2xl"
    >
      {error && <div>Error fetching price: {error.message}</div>}
      <motion.button
        variants={fadeInSmooth}
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
        onClick={() => setTokenCount((prevCount) => Math.max(1, prevCount - 1))}
      >
        -
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="flex-1 p-4 text-center mint_button bg-neutral-900 whiteShadow drop-shadow-md text-neutral-100"
        onClick={() => write?.()}
      >
        {isLoading
          ? "Minting..."
          : `Mint ${tokenCount} tokens for ${totalPrice} ETH`}
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100"
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
