import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useContractRead,
} from 'wagmi';
import { abi2 } from '../contract-abi-2'
import {
    fadeInSmooth,
    AnimContDyna,
    fadeInLinear,
  } from "./animations";
  import utils from 'viem';



  export function MintBtn() {
    const [tokenCount, setTokenCount] = useState(1); // The number of tokens to mint
    const [currentPrice, setCurrentPrice] = useState(''); // The current price per token
  
    const contractRead = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_2 as `0x${string}`,
      abi: abi2,
      functionName: 'getCurrentPriceInWei',
      enabled: true,
    });
  
    useEffect(() => {
      if (contractRead.data) {
        const priceInWeiString = BigInt(contractRead.data.toString()).toString().padStart(19, '0');
        const priceWithDecimal = 
          priceInWeiString.slice(0, -18) + "." + priceInWeiString.slice(-18, -16);
        setCurrentPrice(priceWithDecimal);
      }
    }, [contractRead.data]);
  
    const totalPrice = (parseFloat(currentPrice) * tokenCount).toString(); // Calculate the total price
    const totalPriceInWei = (parseFloat(totalPrice) * 1e18).toString(); // Convert ether to wei

    const { config } = usePrepareSendTransaction({
      to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_2 as `0x${string}`, // The address of the contract
      value: totalPriceInWei,
    });
    const { data, sendTransaction } = useSendTransaction(config);
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  
    return (
      <motion.div
        variants={AnimContDyna}
        initial="hidden"
        animate="show"
        className="w-full h-auto bg-gradient-to-r animate-shiny 
        bg-gradient-to-r from-green-400 to-teal-500 animate-gradient-xy rounded-2xl overflow-hidden flex p-4"
      >
        <motion.button
          variants={fadeInSmooth}
          disabled={isLoading || !sendTransaction || tokenCount <= 0}
          className="mint_button p-4 bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
          onClick={() => setTokenCount((prevCount) => Math.max(1, prevCount - 1))}
        >
          -
        </motion.button>
        <motion.button
          variants={fadeInSmooth}
          disabled={isLoading || !sendTransaction}
          className="mint_button flex-1 p-4 bg-neutral-900 whiteShadow drop-shadow-md text-center text-neutral-100"
          onClick={() => sendTransaction?.()}
        >
          {isLoading ? 'Minting...' : `Mint ${tokenCount} tokens for ${totalPrice} ETH`}
        </motion.button>
        <motion.button
          variants={fadeInSmooth}
          disabled={isLoading || !sendTransaction || tokenCount <= 0}
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
