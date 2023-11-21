import React, { useEffect, useState } from "react";
import useGetClaimableTokens from "../../../web3/dutch-auction/use-get-claimable-token";
import useCallClaimTokens from "../../../web3/dutch-auction/use-call-claim-tokens";
import useGetMerkleProof from "../../../web3/merkle-tree/use-get-merkle-proof";
import { useAccount } from "wagmi";
import { AnimContDyna, fadeInSmooth } from "../../animations";
import { motion } from "framer-motion";

const ClaimTokensButton = () => {
  const { address } = useAccount();
  const effectiveAddress =
    address || "0x0000000000000000000000000000000000000000";
  const { proof } = useGetMerkleProof(effectiveAddress);
  const {
    claimableTokens,
    isErrorGetClaimableTokens,
    errorGetClaimableTokens,
  } = useGetClaimableTokens(effectiveAddress);

  const [amountToClaim, setAmountToClaim] = useState(0);

  const { writeClaimTokens, hashCallClaimTokens, errorMessageClaimTokens } =
    useCallClaimTokens(amountToClaim, proof);

  useEffect(() => {
    if (isErrorGetClaimableTokens) {
      console.error(errorGetClaimableTokens);
    }
    setAmountToClaim(claimableTokens);
  }, [isErrorGetClaimableTokens, errorGetClaimableTokens, claimableTokens]);

  const increment = () => {
    setAmountToClaim((prevAmount) =>
      prevAmount < claimableTokens ? prevAmount + 1 : prevAmount
    );
  };

  const decrement = () => {
    setAmountToClaim((prevAmount) =>
      prevAmount > 0 ? prevAmount - 1 : prevAmount
    );
  };

  const handleClick = async () => {
    try {
      await writeClaimTokens();
    } catch (error) {
      console.error("Error when claiming tokens:", error);
    }
  };

  return (
    <motion.div
      variants={AnimContDyna}
      initial="hidden"
      animate="show"
      className="flex w-full h-auto p-2 overflow-hidden bg-gradient-to-r from-blue-400 to-teal-500 animate-gradient-xy rounded-2xl"
    >
      <motion.button
        variants={fadeInSmooth}
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
        onClick={decrement}
        disabled={amountToClaim <= 0}
      >
        -
      </motion.button>

      <motion.button
        variants={fadeInSmooth}
        className="flex-1 p-4 text-center mint_button bg-neutral-900 whiteShadow drop-shadow-md text-neutral-100"
        onClick={handleClick}
        disabled={amountToClaim === 0}
      >
        Claim {amountToClaim} Tokens
      </motion.button>
      <motion.button
        variants={fadeInSmooth}
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100"
        onClick={increment}
        disabled={amountToClaim >= claimableTokens}
      >
        +
      </motion.button>
      {hashCallClaimTokens && (
        <div className="z-10 bg-red-200 flex m-4 rounded justify-center fixed inset-x-0 bottom-0 wrap-break-spaces p-4">
          <p className="wrap-pre-line truncate text-sm font-xs max-w-xl">
            Transaction Hash: {hashCallClaimTokens}
          </p>
        </div>
      )}
      {errorMessageClaimTokens && (
        <div className="z-10 bg-red-200 flex m-4 rounded justify-center fixed inset-x-0 bottom-24 wrap-break-spaces p-4">
          <p className="wrap-pre-line truncate text-sm font-xs max-w-xl">
            Error: {errorMessageClaimTokens}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ClaimTokensButton;
