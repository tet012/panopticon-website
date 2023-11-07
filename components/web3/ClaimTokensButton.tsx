import React, { useEffect, useState } from "react";
import useGetClaimableTokens from "../../web3/dutch-auction/use-get-claimable-token";
import useCallClaimTokens from "../../web3/dutch-auction/use-call-claim-tokens";
import useGetMerkleProof from "../../web3/merkle-tree/use-get-merkle-proof";
import { useAccount } from "wagmi";

const ClaimTokensButton = () => {
  const { address } = useAccount();
  const { proof } = useGetMerkleProof(address);
  const {
    claimableTokens,
    isErrorGetClaimableTokens,
    errorGetClaimableTokens,
  } = useGetClaimableTokens(address);

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
    <div className="flex w-full h-auto p-2 overflow-hidden bg-gradient-to-r from-blue-400 to-teal-500 animate-gradient-xy rounded-2xl">
      <button
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-l-xl text-neutral-100"
        onClick={decrement}
        disabled={amountToClaim <= 0}
      >
        -
      </button>

      <button
        className="flex-1 p-4 text-center mint_button bg-neutral-900 whiteShadow drop-shadow-md text-neutral-100"
        onClick={handleClick}
        disabled={amountToClaim === 0}
      >
        Claim {amountToClaim} Tokens
      </button>
      <button
        className="p-4 mint_button bg-neutral-800 whiteShadow drop-shadow-lg rounded-r-xl text-neutral-100"
        onClick={increment}
        disabled={amountToClaim >= claimableTokens}
      >
        +
      </button>
      {hashCallClaimTokens && (
        <div className="bg-red-200 flex m-4 rounded justify-center fixed inset-x-0 bottom-0 wrap-break-spaces p-4">
          <p className="wrap-pre-line truncate text-sm font-xs max-w-xl">
            Transaction Hash: {hashCallClaimTokens}
          </p>
        </div>
      )}
      {errorMessageClaimTokens && (
        <div className="bg-red-200 flex m-4 rounded justify-center fixed inset-x-0 bottom-0 wrap-break-spaces p-4">
          <p className="wrap-pre-line truncate text-sm font-xs max-w-xl">
            Error: {errorMessageClaimTokens}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClaimTokensButton;
